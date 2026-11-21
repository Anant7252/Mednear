import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../api/auth';
import { RegisterPayload, UserProfile } from '../types/auth';
import { getAccessToken, saveTokens, clearTokens } from '../utils/storage';

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = await getAccessToken();
        if (token) {
          const profile = await authApi.getProfile();
          setUser(profile);
        }
      } catch (error) {
        await clearTokens();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    const data = await authApi.login(email, password);
    await saveTokens(data.access_token, data.refresh_token);
    setUser(data.user);
  };

  const register = async (payload: RegisterPayload) => {
    await authApi.register(payload);
    await login(payload.email, payload.password);
  };

  const logout = async () => {
    await clearTokens();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
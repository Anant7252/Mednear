import { apiClient } from './client';
import { AuthResponse, RegisterPayload, UserProfile } from '../types/auth';

export const authApi = {
  register: async (payload: RegisterPayload): Promise<UserProfile> => {
    const response = await apiClient.post<UserProfile>('/auth/register', payload);
    return response.data;
  },
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    const response = await apiClient.post<AuthResponse>('/auth/login', formData.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  },

  getProfile: async (): Promise<UserProfile> => {
    const response = await apiClient.get<UserProfile>('/auth/me');
    return response.data;
  },
};

export type UserRole = 'customer' | 'shop_owner' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  phone: string | null;
  role: UserRole;
  created_at: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  phone?: string | null;
  role?: UserRole;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user: UserProfile;
}

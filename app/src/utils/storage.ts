import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const ACCESS_TOKEN_KEY = 'mednear_access_token';
const REFRESH_TOKEN_KEY = 'mednear_refresh_token';

const isWeb = Platform.OS === 'web';

export async function saveTokens(access_token: string, refresh_token: string): Promise<void> {
  if (isWeb) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(ACCESS_TOKEN_KEY, access_token);
      localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token);
    }
    return;
  }
  await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, access_token);
  await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refresh_token);
}

export async function getAccessToken(): Promise<string | null> {
  if (isWeb) {
    return typeof localStorage !== 'undefined' ? localStorage.getItem(ACCESS_TOKEN_KEY) : null;
  }
  return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
}

export async function getRefreshToken(): Promise<string | null> {
  if (isWeb) {
    return typeof localStorage !== 'undefined' ? localStorage.getItem(REFRESH_TOKEN_KEY) : null;
  }
  return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
}

export async function clearTokens(): Promise<void> {
  if (isWeb) {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    }
    return;
  }
  await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
  await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
}

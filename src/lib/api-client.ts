import axios, { type AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';
import { env } from '@/lib/env';

const isBrowser = typeof window !== 'undefined';

function getAuthToken(): string | null {
  if (!isBrowser) {
    return null;
  }
  try {
    return localStorage.getItem('auth_token');
  } catch {
    return null;
  }
}

function setAuthToken(token: string | null): void {
  if (!isBrowser) {
    return;
  }
  if (token) {
    localStorage.setItem('auth_token', token);
  } else {
    localStorage.removeItem('auth_token');
  }
}

function createApiClient(): AxiosInstance {
  const client = axios.create({
    baseURL: env.NEXT_PUBLIC_API_URL,
    timeout: 30_000,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getAuthToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error),
  );

  client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshToken = localStorage.getItem('refresh_token');
          if (refreshToken) {
            const response = await axios.post(
              `${env.NEXT_PUBLIC_API_URL}/auth/refresh`,
              { refreshToken },
              { withCredentials: true },
            );

            const { accessToken, refreshToken: newRefreshToken } = response.data;
            setAuthToken(accessToken);
            localStorage.setItem('refresh_token', newRefreshToken);

            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            }
            return client(originalRequest);
          }
        } catch {
          setAuthToken(null);
          localStorage.removeItem('refresh_token');
          if (isBrowser) {
            window.location.href = '/login';
          }
        }
      }

      return Promise.reject(error);
    },
  );

  return client;
}

export const apiClient = createApiClient();

export function setAuthTokens(accessToken: string, refreshToken: string): void {
  setAuthToken(accessToken);
  localStorage.setItem('refresh_token', refreshToken);
}

export function clearAuthTokens(): void {
  setAuthToken(null);
  localStorage.removeItem('refresh_token');
}

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}

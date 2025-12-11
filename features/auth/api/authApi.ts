import { apiWrapper } from '@/shared/api/client';
import type {
  LoginRequest,
  LoginResponse,
  RefreshTokenResponse,
} from '../types/auth.types';

export const authApi = {
  login: async (data: LoginRequest) => {
    const response = await apiWrapper.post<LoginResponse>('/auth/signIn', data);
    return response;
  },

  refreshToken: async (refreshToken: string) => {
    const response = await apiWrapper.post<RefreshTokenResponse>(
      '/auth/refresh-token',
      { refreshToken }
    );
    return response;
  },
};

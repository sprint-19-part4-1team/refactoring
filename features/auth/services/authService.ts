import { tokenStorage } from '@/shared/lib/storage/tokenStorage';
import { AppError } from '@/common/errors/AppError';

// 비즈니스 로직 담당
export const authService = {
  // 토큰 검증 (도메인 규칙)
  isTokenValid: (token: string | null): boolean => {
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  },

  // 인증 상태 체크
  isAuthenticated: (): boolean => {
    const token = tokenStorage.getAccessToken();
    return authService.isTokenValid(token);
  },

  // 인증 필수 체크
  requireAuth: (): void => {
    if (!authService.isAuthenticated()) {
      throw AppError.unauthorized();
    }
  },

  // 토큰 저장 (access + refresh)
  saveTokens: (accessToken: string, refreshToken: string): void => {
    tokenStorage.setAccessToken(accessToken);
    tokenStorage.setRefreshToken(refreshToken);
  },

  // 로그아웃 (토큰 삭제)
  clearAuth: (): void => {
    tokenStorage.clearAll();
  },
};

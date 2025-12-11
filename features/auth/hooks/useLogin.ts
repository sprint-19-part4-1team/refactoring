'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '../api/authApi';
import { authService } from '../services/authService';
import { useAuthStore } from '../store/authStore';
import type { LoginRequest } from '../types/auth.types';

export const useLogin = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: LoginRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authApi.login(data);

      // 1. 토큰 저장 (access + refresh)
      authService.saveTokens(response.accessToken, response.refreshToken);

      // 2. 사용자 정보 Zustand에 저장
      setUser(response.user);

      // 3. 로그인 성공 후 메인 페이지로 이동
      router.push('/');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : '로그인에 실패했습니다';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};

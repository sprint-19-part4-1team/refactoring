'use client';

import { useAuth } from '@/features/auth/hooks/useAuth';
import { useAuthStore } from '@/features/auth/store/authStore';
import { authService } from '@/features/auth/services/authService';
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();
  const { isLoading } = useAuth();
  const user = useAuthStore((state) => state.user);
  const clearUser = useAuthStore((state) => state.clearUser);

  const handleLogout = () => {
    // 1. 클라이언트 측 토큰 삭제
    authService.clearAuth();

    // 2. Zustand 사용자 정보 삭제
    clearUser();

    // 3. 로그인 페이지로 이동
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-gray-600">인증 확인 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-lg border bg-white p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">메인 페이지</h1>
              {user && (
                <p className="mt-2 text-lg text-gray-600">
                  닉네임 :&nbsp;
                  <span className="font-semibold text-blue-600">
                    {user.name}
                  </span>
                </p>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none">
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

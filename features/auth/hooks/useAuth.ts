'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../services/authService';

export const useAuth = (redirectTo: string = '/login') => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated();
      setIsAuthenticated(authenticated);

      if (!authenticated) {
        router.push(redirectTo);
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [router, redirectTo]);

  return { isAuthenticated, isLoading };
};

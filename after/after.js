'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAccessToken } from 'src/infra/auth.ts';
import { fetchUser } from 'src/infra/userApi.ts';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // 1. Infrastructure (localStorage)
    const token = getAccessToken();

    // 2. Domain Logic (토큰 검증)
    if (!token || isTokenExpired(token)) {
      router.push('/login');
      return;
    }
    // 3. Infrastructure (fetch)
    fetchUser(token).then((data) => setUser(data));
  }, []);

  return <div>{user?.name}</div>;
}

// 인프라 묶음
// - localStorage에서 'accessToken' 값을 읽어온다              => getAccessToken()
// - Authorization 헤더를 붙여 /api/user 로 HTTP 요청을 보낸다   => fetchUser()
// - 응답을 JSON으로 파싱한다

// 도메인 묶음
// - 이 페이지는 유효한 토큰이 있는 사용자만 접근할 수 있다
// - 토큰이 없거나 만료되면 로그인 페이지로 보내야 한다(라는 규칙)

// 훅 / Application 묶음
// - 컴포넌트가 마운트되면:
//   1) 토큰을 읽고
//   2) 도메인 규칙으로 검증하고
//   3) 통과 시 유저 정보를 요청하고
//   4) 결과를 user 상태에 저장하는 전체 흐름

export function getAccessToken() {
  const token = localStorage.getItem('accessToken');
  return token;
}

export function fetchUser(token) {
  return fetch('/api/user', {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => res.json());
}

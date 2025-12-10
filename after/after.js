'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    runProfileFlow();
  }, []);

  return <div>{user?.name}</div>;
}

// 토큰 체크하는 함수
export function checkToken(token) {
  if (!token || isTokenExpired(token)) {
    router.push('/login');
    return;
  }
}

// 로컬스토리지에서 토큰 가져오는 함수
export function getAccessToken() {
  const token = localStorage.getItem('accessToken');
  return token;
}

// api 요청으로 유저 정보 가져와서 json으로 파싱하는 함수
export function fetchUser(token) {
  return fetch('/api/user', {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => res.json());
}

// 전체적인 흐름을 나타내는 함수
export function runProfileFlow() {
  const token = getAccessToken();
  checkToken(token);
  fetchUser(token).then((data) => setUser(data));
}

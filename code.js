// ❌ 안티패턴: 모든 계층이 뒤섞임
"use client";

function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 1. Infrastructure (localStorage)
    const token = localStorage.getItem('accessToken');

    // 2. Domain Logic (토큰 검증)
    if (!token || isTokenExpired(token)) {
      router.push('/login');
      return;
    }
 // 3. Infrastructure (fetch)
    fetch('/api/user', {
      headers: { Authorization: `Bearer ${token}` }
    })
    // 4. Presentation Logic
    .then(res => res.json())
    .then(data => setUser(data));
  }, []);

  return <div>{user?.name}</div>;
}


// ♻️ Refactor

// 기존에는 ProfilePage 안에서 토큰 확인 + fetch + 리다이렉트를 모두 처리하고있음

// services/storage.ts
// 저장소 역할만 담당
// 토큰을 어디서 읽는지만 담당

// 추후에 뭔가 변화가 생긴다면 모든 페이지에서 수정하는 것이 아닌 이곳에서만 수정하면
// 한번에 해결됨
export const storage = {
  getToken: () => localStorage.getItem('accessToken'),
};

// services/api.ts
// 서버와 통신만을 책임짐
// 백엔드와 통신만을 담당

// Pages, Hooks, Components 어디서든 API 로직 재사용 가능
// 에러 핸들링 일원화 가능
// 추후에 axios 같은 라이브러리로 변경시 여기에서만 바꿔주면 됨
export const api = {
  getUser: async (token: string) => {
    const res = await fetch('/api/user', {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
  }
};

// hooks/useUser.ts
// 유저 정보를 react-query로 관리
// 토큰을 기반으로 유저 정보 가져오는 로직만 담당

// 이제 페이지에서 fetch 관리 안 해도됨
import { useQuery } from '@tanstack/react-query';

export function useUser() {
  const token = storage.getToken();
  
  return useQuery({
    queryKey: ['user', token],
    queryFn: () => api.getUser(token!),
    enabled: !!token && !isTokenExpired(token),
  });
}

// components/ProtectedRoute.tsx
// 공통 라우트 보호 처리
// 토큰 체크 후 보호 라우트 처리만 담당

// 모든 페이지에 같은 로그인 체크 로직을 넣을 필요가 없음
// 재사용 가능
export function ProtectedRoute({ children }) {
  const router = useRouter();
  const token = storage.getToken();
  
  useEffect(() => {
    if (!token || isTokenExpired(token)) {
      router.push('/login');
    }
  }, [token]);
  
  if (!token) return null;
  return children;
}

// ProfilePage.tsx
// 페이지 본연의 역할만 담당
// 렌더만 담당

// 읽기 쉬워짐, 유지보수 쉬워짐, 테스트가 쉬워짐
// 난잡하게 로직이 섞여져있던 형태가 사라짐
"use client";
export function ProfilePage() {
  const { data: user } = useUser();
  
  return (
    <ProtectedRoute>
      <div>{user?.name}</div>
    </ProtectedRoute>
  );
}

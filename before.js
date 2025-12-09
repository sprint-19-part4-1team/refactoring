// ❌ 안티패턴: 모든 계층이 뒤섞임
'use client';

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
      headers: { Authorization: `Bearer ${token}` },
    })
      // 4. Presentation Logic
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  return <div>{user?.name}</div>;
}

// 로컬스토리지에서 토큰 가져오는 함수
export function getAccessToken() {
  const token = localStorage.getItem('accessToken');
  return token;
}

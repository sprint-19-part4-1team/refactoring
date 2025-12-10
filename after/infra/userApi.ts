// api 요청으로 유저 정보 가져와서 json으로 파싱하는 함수
export function fetchUser(token) {
  return fetch('/api/user', {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => res.json());
}

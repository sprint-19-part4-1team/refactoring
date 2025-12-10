// api 요청으로 유저 정보 가져와서 json으로 파싱하는 함수
import { AccessToken } from '../domain/token/types';

export function fetchUser(token: AccessToken) {
  return fetch('/api/user', {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => res.json());
}

// 로컬스토리지에서 토큰 가져오는 함수
import { AccessToken } from '../domain/token/types';

export function getAccessToken(): AccessToken | null {
  const token = localStorage.getItem('accessToken');
  return token;
}

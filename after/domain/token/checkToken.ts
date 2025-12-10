// 토큰이 존재하는지, 유효기간이 지났는지 체크하는 함수
import { isTokenExpired } from './isTokenExpired';
import { AccessToken } from './types';

export function isTokenInvalid(token: AccessToken | null): boolean {
  if (token === null) return true;
  return isTokenExpired(token);
}

// 토큰이 존재하는지, 유효기간이 지났는지 체크하는 함수
import { isTokenExpired } from './isTokenExpired';

export function isTokenInvalid(token) {
  return !token || isTokenExpired(token);
}

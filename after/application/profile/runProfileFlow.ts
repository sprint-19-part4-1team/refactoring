// 전체적인 흐름을 나타내는 함수
import { getAccessToken } from '../../infra/getAccessToken';
import { isTokenInvalid } from '../../domain/token/checkToken';
import { fetchUser } from '../../infra/userApi';
import { User } from '../../domain/user/types';
import { AccessToken } from '../../domain/token/types';

interface RunProfileFlowParams {
  router: { push: (path: string) => void };
  setUser: (user: User) => void;
}

export function runProfileFlow({ router, setUser }: RunProfileFlowParams) {
  const token = getAccessToken();

  if (token === null) {
    router.push('/login');
    return;
  }

  const isInvalid = isTokenInvalid(token);
  if (isInvalid) {
    router.push('/login');
    return;
  }

  fetchUser(token).then((data) => setUser(data));
}

const ACCESS_TOKEN_KEY = "accessToken";

/*
  next.js는 서버(SSR)에서도 실행될 수 있어서
  브라우저 전용 객체를 사용할 때 오류 방지를 위해서 방어 코드를 추가해야함
  if (typeof window === "undefined") return null; > 브라우저 아님 실행 X
 */
export const getAccessToken = () => {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  return token;
};

export const setAccessToken = (accessToken: string) => {
  if (typeof window === "undefined") return null;
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
};

export const removeAccessToken = () => {
  if (typeof window === "undefined") return null;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};

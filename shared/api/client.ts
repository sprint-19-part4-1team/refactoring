import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { toast } from 'react-toastify';
import { tokenStorage } from '@/shared/lib/storage/tokenStorage';

// API 베이스 URL 환경 변수
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// 개발 환경에서 환경 변수 누락 체크
if (process.env.NODE_ENV === 'development' && !BASE_URL) {
  console.error(
    '⚠️ API base URL이 정의되지 않았습니다. .env 파일을 확인해주세요.'
  );
  toast.error('⚠️ API base URL이 정의되지 않았습니다.');
}

/**
 * Axios 인스턴스
 * - 기본 URL 및 공통 설정 적용
 * - 3초 타임아웃 설정
 */
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 요청 인터셉터
 * - 모든 요청 전에 실행
 * - 저장된 토큰을 자동으로 헤더에 추가
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenStorage.getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * 응답 인터셉터
 * - 모든 응답 후 실행
 * - 성공 시: response.data만 반환하여 코드 간소화
 * - 실패 시: 에러 타입별 toast 표시 및 처리
 */
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    let errorMessage = '';

    if (error.code === 'ECONNABORTED') {
      errorMessage = '요청 시간이 초과되었습니다. 다시 시도해 주세요.';
    } else if (error.request && !error.response) {
      errorMessage =
        '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해 주세요.';
    } else if (error.response?.status && error.response.status >= 500) {
      errorMessage = '서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.';
    } else if (error.response?.status === 401) {
      errorMessage = '로그인이 필요합니다.';
    }

    if (errorMessage) toast.error(errorMessage);

    return Promise.reject(error);
  }
);

/**
 * 타입 안전 API 래퍼 함수
 */
export const apiWrapper = {
  get: <T = unknown>(
    url: string,
    config: AxiosRequestConfig = {}
  ): Promise<T> => api.get<T>(url, config) as Promise<T>,

  post: <T = unknown>(
    url: string,
    data?: unknown,
    config: AxiosRequestConfig = {}
  ): Promise<T> => api.post<T>(url, data, config) as Promise<T>,

  put: <T = unknown>(
    url: string,
    data?: unknown,
    config: AxiosRequestConfig = {}
  ): Promise<T> => api.put<T>(url, data, config) as Promise<T>,

  patch: <T = unknown>(
    url: string,
    data?: unknown,
    config: AxiosRequestConfig = {}
  ): Promise<T> => api.patch<T>(url, data, config) as Promise<T>,

  delete: <T = unknown>(
    url: string,
    config: AxiosRequestConfig = {}
  ): Promise<T> => api.delete<T>(url, config) as Promise<T>,
};

export default api;

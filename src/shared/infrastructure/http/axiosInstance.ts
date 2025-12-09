import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

// 이것도 분리해야하나....????
api.interceptors.request.use((config) => {
  // TODO: 토큰 불러오는 로직 필요 (일단 로컬스토리지에서 관리)
  const token = "토큰 로직 필요";
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

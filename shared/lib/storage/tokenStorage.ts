import { storage } from './index';
import { STORAGE_KEYS } from '@/common/constants/storage';

export const tokenStorage = {
  getAccessToken: () => storage.get<string>(STORAGE_KEYS.ACCESS_TOKEN),

  setAccessToken: (token: string) =>
    storage.set(STORAGE_KEYS.ACCESS_TOKEN, token),

  removeAccessToken: () => storage.remove(STORAGE_KEYS.ACCESS_TOKEN),

  getRefreshToken: () => storage.get<string>(STORAGE_KEYS.REFRESH_TOKEN),

  setRefreshToken: (token: string) =>
    storage.set(STORAGE_KEYS.REFRESH_TOKEN, token),

  removeRefreshToken: () => storage.remove(STORAGE_KEYS.REFRESH_TOKEN),

  clearAll: () => {
    tokenStorage.removeAccessToken();
    tokenStorage.removeRefreshToken();
  },
};

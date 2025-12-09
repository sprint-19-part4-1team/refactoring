/**
 * application layer에서는 useState를 쓰면 안됨 -> hook 절대 포함 X
 * application layer는 React에 대해 알지 못해야 함.....
 */

import { getUserData } from "@/features/user/infrastructure/user.api";

export const getUserProfile = async () => {
  return await getUserData();
};

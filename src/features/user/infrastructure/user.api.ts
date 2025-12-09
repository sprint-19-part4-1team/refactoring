import { UserDto } from "@/features/user/infrastructure/user.dto";
import api from "@/shared/infrastructure/http/axiosInstance";

export const getUserData = async (): Promise<UserDto> => {
  const res = await api.get("/users/me");
  return res.data;
};

import { getUserProfile } from "@/features/user/application/getUserProfile";
import { UserDto } from "@/features/user/infrastructure/user.dto";
import { useEffect, useState } from "react";

const useUserProfile = () => {
  const [user, setUser] = useState<UserDto | null>(null);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserProfile();
        setUser(data);
      } catch (err) {
        setError(err);
      }
    };
    fetchUser();
  }, []);

  return { user, error };
};

export default useUserProfile;

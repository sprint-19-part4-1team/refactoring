"use client";

import styles from "./page.module.css";
import useUserProfile from "@/features/user/ui/useUserProfile";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user, error } = useUserProfile();
  const router = useRouter();

  useEffect(() => {
    if (error) {
      router.replace("/not-found");
    }
  }, [error, router]);

  if (!user) {
    return <div className={styles.container}>로딩중..</div>;
  }

  return <div className={styles.container}>닉네임: {user.nickname}</div>;
}

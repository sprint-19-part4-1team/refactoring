'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { runProfileFlow } from './application/profile/runProfileFlow';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    runProfileFlow({ router, setUser });
  }, []);

  return <div>{user?.name}</div>;
}

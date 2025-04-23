'use client';

import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/auth/store';

export const useStartNote = () => {
  const { user } = useUserStore();
  const router = useRouter();

  const handleStartNote = () => {
    if (user) {
      router.push('/note');
    } else {
      router.push('/auth/login');
    }
  };

  return handleStartNote;
};

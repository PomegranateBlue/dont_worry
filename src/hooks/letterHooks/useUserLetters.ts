'use client';

import { useUserStore } from '@/store/auth/store';
import { useQuery } from '@tanstack/react-query';
import { fetchUserLetters } from '@/app/utils/supabase/db';
export const useUserLetters = () => {
  const { user } = useUserStore();

  return useQuery({
    queryKey: ['futureLetters', user],
    queryFn: () => fetchUserLetters(user),
    enabled: !!user
  });
};

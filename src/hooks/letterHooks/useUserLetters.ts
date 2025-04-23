'use client';

import { useUserStore } from '@/store/auth/store';
import { useQuery } from '@tanstack/react-query';
import { fetchUserLetters } from '@/app/utils/supabase/db';

export const useUserLetters = (selectedFilter: string | null) => {
  const { user } = useUserStore();

  return useQuery({
    queryKey: ['futureLetters', user, selectedFilter],
    queryFn: () => fetchUserLetters(user, selectedFilter),
    enabled: !!user
  });
};

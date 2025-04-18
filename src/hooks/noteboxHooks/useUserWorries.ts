'use client';
import { useUserStore } from '@/store/auth/store';
import { useQuery } from '@tanstack/react-query';
import { fetchUserWorries } from '@/app/utils/supabase/db';

// 사용자 걱정 보관함
export const useUserWorries = () => {
  const { user } = useUserStore();

  return useQuery({
    queryKey: ['userworries', user],
    queryFn: () => fetchUserWorries(user),
    enabled: !!user
  });
};

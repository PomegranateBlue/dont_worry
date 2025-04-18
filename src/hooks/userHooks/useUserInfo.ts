'use client';

import { fetchUser, fetchUserInfo } from '@/app/utils/supabase/db';
import { useUserStore } from '@/store/auth/store';
import { useQuery } from '@tanstack/react-query';

//로그인 유저 ID
export const useUserData = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => fetchUser(),
    staleTime: 1000 * 60 * 5
  });
};

//사용자 정보
export const useUserInfo = () => {
  const { user } = useUserStore();
  return useQuery({
    queryKey: ['userinfo', user],
    queryFn: () => fetchUserInfo(user),
    enabled: !!user
  });
};

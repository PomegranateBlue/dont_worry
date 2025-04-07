'use client';

import {
  fetchUser,
  fetchUserInfo,
  fetchUserLetters,
  updateUserInfo,
  UserUpdate
} from '@/app/utils/supabase/db';
import { useUserStore } from '@/store/store';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// 미래 편지
export const useUserLetters = () => {
  const { user } = useUserStore();

  return useQuery({
    queryKey: ['futureLetters', user],
    queryFn: () => fetchUserLetters(user),
    enabled: !!user
  });
};

// 사용자 정보
export const useUserInfo = () => {
  const { user } = useUserStore();
  console.log('텐스텍쿼리useUserInfo에서 사용자 ID:', user);

  return useQuery({
    queryKey: ['userinfo', user],
    queryFn: () => fetchUserInfo(user),
    enabled: !!user
  });
};

// 사용자 정보 업데이트
export const useUpdateUserInfo = () => {
  const { user } = useUserStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updates: Partial<UserUpdate>) => updateUserInfo(user, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userinfo', user] });
    }
  });
};

export const useUserData = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => fetchUser(),
    staleTime: 1000 * 60 * 5
  });
};

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
  const { userId } = useUserStore();

  return useQuery({
    queryKey: ['futureLetters', userId],
    queryFn: () => fetchUserLetters(userId),
    enabled: !!userId
  });
};

// 사용자 정보
export const useUserInfo = () => {
  const { userId } = useUserStore();
  console.log('텐스텍쿼리useUserInfo에서 사용자 ID:', userId);

  return useQuery({
    queryKey: ['userinfo', userId],
    queryFn: () => fetchUserInfo(userId),
    enabled: !!userId
  });
};

// 사용자 정보 업데이트
export const useUpdateUserInfo = () => {
  const { userId } = useUserStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updates: Partial<UserUpdate>) =>
      updateUserInfo(userId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userinfo', userId] });
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

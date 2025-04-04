'use client';

import {
  fetchUserInfo,
  fetchUserLetters,
  updateUserInfo,
  UserUpdate
} from '@/app/utils/supabase/db';
import { useUserStore } from '@/store/store';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// 미래 편지
export const useUserLetters = () => {
  const user = useUserStore((state) => state.user);

  return useQuery({
    queryKey: ['futureLetters', user],
    queryFn: () => fetchUserLetters(user),
    enabled: !!user
  });
};

// 사용자 정보
export const useUserInfo = () => {
  const user = useUserStore((state) => state.user);

  return useQuery({
    queryKey: ['userinfo', user],
    queryFn: () => fetchUserInfo(user),
    enabled: !!user
  });
};

// 사용자 정보 업데이트
export const useUpdateUserInfo = () => {
  const user = useUserStore((state) => state.user);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updates: Partial<UserUpdate>) => updateUserInfo(user, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userinfo', user] });
    }
  });
};

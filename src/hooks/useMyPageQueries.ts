'use client';

import {
  fetchUser,
  fetchUserInfo,
  fetchUserLetters,
  fetchUserWorries,
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

//로그인 유저 ID
export const useUserData = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => fetchUser(),
    staleTime: 1000 * 60 * 5
  });
};

// 사용자 걱정 보관함
export const useUserWorries = () => {
  const { user } = useUserStore();

  return useQuery({
    queryKey: ['userworries', user],
    queryFn: () => fetchUserWorries(user),
    enabled: !!user
  });
};

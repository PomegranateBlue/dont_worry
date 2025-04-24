'use client';

import { useUserStore } from '@/store/auth/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteLetters } from '@/app/utils/supabase/db';

export const useDeleteLetters = () => {
  const queryClient = useQueryClient();
  const { user } = useUserStore();
  return useMutation({
    mutationFn: (letterIds: string[]) => {
      if (!user) {
        throw new Error('사용자가 로그인되지 않았습니다.');
      }
      return deleteLetters(user, letterIds);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['futureLetters'] });
    },
    onError: (error) => {
      console.error('삭제 오류:', error);
    }
  });
};

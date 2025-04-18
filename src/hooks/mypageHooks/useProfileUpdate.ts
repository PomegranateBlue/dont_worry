'use client';

import { useUserStore } from '@/store/auth/store';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { updateUserInfo, UserUpdate } from '@/app/utils/supabase/db';

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

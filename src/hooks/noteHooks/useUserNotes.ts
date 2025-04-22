import { useUserStore } from '@/store/auth/store';
import { useQuery } from '@tanstack/react-query';
import { fetchUserWorries } from '@/app/utils/supabase/db';

export const useUserNotes = () => {
  const { user } = useUserStore();

  return useQuery({
    queryKey: ['userworries', user],
    queryFn: () => fetchUserWorries(user),
    enabled: !!user
  });
};

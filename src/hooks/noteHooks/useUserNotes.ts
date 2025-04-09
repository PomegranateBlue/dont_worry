// import { useEffect, useState } from 'react';
// import { supabase } from '@/app/utils/supabase/supabase';
// import { useUserData } from '../useMyPageQueries';
import { useUserStore } from '@/store/store';
import { useQuery } from '@tanstack/react-query';
import { fetchUserWorries } from '@/app/utils/supabase/db';
//
export const useUserNotes = () => {
  const { user } = useUserStore();

  return useQuery({
    queryKey: ['userworries', user],
    queryFn: () => fetchUserWorries(user),
    enabled: !!user
  });
};

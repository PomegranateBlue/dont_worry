import Header from '@/components/header';

import React, { PropsWithChildren } from 'react';
import { createClient } from '../utils/supabase/server';
import { redirect } from 'next/navigation';

const MainLayout = async ({ children }: PropsWithChildren) => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  // console.log('유저데이터', data.user);
  if (error || !data?.user) {
    redirect('/auth/login');
  }
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;

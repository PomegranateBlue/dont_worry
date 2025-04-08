'use client';
import browserClient from '@/app/utils/supabase/client';
import React from 'react';
import { useRouter } from 'next/navigation';
const LogOutButton = () => {
  const router = useRouter();
  const signOut = async () => {
    const { error } = await browserClient.auth.signOut();
    router.refresh();
    console.log(error);
    alert('로그아웃');
  };
  return (
    <button onClick={signOut} className="underline md:no-underline">
      로그아웃
    </button>
  );
};
export default LogOutButton;

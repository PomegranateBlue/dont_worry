'use client';
import browserClient from '@/app/utils/supabase/client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/auth/store';
const LogOutButton = () => {
  const { setUser } = useUserStore();
  const router = useRouter();
  const signOut = async () => {
    const { error } = await browserClient.auth.signOut();
    console.log(error);
    setUser(null);
    localStorage.removeItem('auth-storage');
    router.push('/');
    alert('로그아웃');
    router.refresh();
  };
  return (
    <button onClick={signOut} className="underline md:no-underline">
      로그아웃
    </button>
  );
};
export default LogOutButton;

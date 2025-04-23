'use client';
import browserClient from '@/app/utils/supabase/client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/auth/store';
import Text from '../common/Text';
import Toastify from 'toastify-js';
const LogOutButton = () => {
  const { setUser } = useUserStore();
  const router = useRouter();
  const signOut = async () => {
    const { error } = await browserClient.auth.signOut();
    if (error) {
      router.push('/error');
    }
    setUser(null);
    localStorage.removeItem('auth-storage');
    router.push('/');
    Toastify({
      text: `🙏 안녕히가세요 🙏`,
      duration: 100,
      gravity: 'top',
      position: 'right',
      stopOnFocus: true,
      className: 'bg-white'
    }).showToast();
    router.refresh();
  };
  return (
    //className="underline md:no-underline"
    <button onClick={signOut}>
      <Text variant={'body3'} className="text-label-alternative underline">
        로그아웃
      </Text>
    </button>
  );
};
export default LogOutButton;

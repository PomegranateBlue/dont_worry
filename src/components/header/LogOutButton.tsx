'use client';
import browserClient from '@/app/utils/supabase/client';
import React from 'react';

const LogOutButton = () => {
  const signOut = async () => {
    const { error } = await browserClient.auth.signOut();
    console.log(error);
    alert('로그아웃');
  };
  return <button onClick={signOut}>로그아웃</button>;
};

export default LogOutButton;

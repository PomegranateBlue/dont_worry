'use client';
import { createClient } from '@/app/utils/supabase/client';
import Image from 'next/image';
import React from 'react';

interface SocialLoginProps {
  provider: 'kakao' | 'google';
}
const socialLoginImg = {
  kakao: {
    src: '/images/login-kakao.svg',
    alt: '카카오 로그인'
  },
  google: {
    src: '/images/login-google.svg',
    alt: 'Google 로그인'
  }
};

export const SocialLogin = ({ provider }: SocialLoginProps) => {
  const socialLoginBtn = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        // redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback` //배포시
        redirectTo: `http://localhost:3000/auth/callback` //로컬
      }
    });
  };

  return (
    <button onClick={socialLoginBtn}>
      <Image
        src={socialLoginImg[provider].src}
        width={56}
        height={56}
        alt={socialLoginImg[provider].alt}
        priority
      />
    </button>
  );
};

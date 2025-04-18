'use client';

import { supabase } from '@/app/utils/supabase/supabase';

import Image from 'next/image';

const KakaoLogin = () => {
  async function signInWithKakao() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback'
      }
    });
    // console.log('data', data);
    // console.log('error', error);
  }

  return (
    <button onClick={signInWithKakao}>
      <Image
        src="/images/login-kakao.svg"
        width={56}
        height={56}
        alt="카카오 로그인"
        priority
      />
    </button>
  );
};

export default KakaoLogin;

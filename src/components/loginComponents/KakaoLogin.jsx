'use client';

import { supabase } from '@/app/utils/supabase/supabase';

import Image from 'next/image';

const KakaoLogin = () => {
  async function signInWithKakao() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `http://localhost:3000/auth/callback` // 이렇게 자동으로 현재 주소 맞춰주면 편함
        // queryParams: {
        //   response_type: 'code' // 이거 중요!!
        // }
      }
    });
    console.log('카카오로그인데이터', data);
    if (error) {
      console.log(error);
    }
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

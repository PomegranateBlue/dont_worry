'use client';

import { createClient } from '@/app/utils/supabase/client';
import Image from 'next/image';

const KakaoLogin = () => {
  const signInWithKakao = async () => {
    const supabase = createClient();

    await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `http://localhost:3000/auth/callback`
      }
    });
  };
  return (
    <>
      <button onClick={signInWithKakao}>
        <Image
          src="/images/login-kakao.svg"
          width={56}
          height={56}
          alt="카카오 로그인"
          priority
        />
      </button>
    </>
  );
};

export default KakaoLogin;

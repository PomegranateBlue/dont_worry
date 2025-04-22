'use client';

import { supabase } from '@/app/utils/supabase/supabase';
import Image from 'next/image';

const GoogleLogin = () => {
  async function signinWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `http://localhost:3000/auth/callback`
      }
    });
    // console.log('구글로그인데이터', data);
    if (error) {
      console.log(error);
    }
  }
  return (
    <button onClick={signinWithGoogle}>
      <Image
        src="/images/login-google.svg"
        width={56}
        height={56}
        alt="login-google"
        priority
      />
    </button>
  );
};

export default GoogleLogin;

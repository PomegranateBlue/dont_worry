'use client';

import { createClient } from '@/app/utils/supabase/client';
import Image from 'next/image';

const GoogleLogin = () => {
  const signinWithGoogle = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
      }
    });
  };
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

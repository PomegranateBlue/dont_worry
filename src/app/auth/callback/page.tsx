'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/app/utils/supabase/client';
import { useUserStore } from '@/store/store';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const handleOAuthLogin = async () => {
      const code = searchParams.get('code');
      if (code) {
        // 이로직 안타는듯?
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          console.error('세션 교환 실패:', error);
          router.push('/auth/auth-code-error');
          return;
        }
      }

      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (user) {
        console.log('카카오유저', user);
        setUser(user.id);
        router.push('/');
      } else {
        console.error('유저 없음!');
        router.push('/auth/auth-code-error');
      }
    };

    handleOAuthLogin();
  }, [router, searchParams, setUser]);

  return <p>로그인 중입니다...</p>;
}

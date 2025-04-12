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
        // ✅ 세션 먼저 교환해야 유저 정보를 가져올 수 있음!
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          console.error('세션 교환 실패:', error);
          router.push('/auth/auth-code-error');
          return;
        }
      }

      // ✅ 세션이 있다면 이제 유저 정보를 가져올 수 있음!
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (user) {
        console.log('카카오유저', user);
        setUser(user.id); // 필요 시 user 전체를 저장해도 됨
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

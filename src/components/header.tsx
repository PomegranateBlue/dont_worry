'use client';
import Link from 'next/link';
import LogOutButton from './loginComponents/LogOutButton';
import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/app/utils/supabase/supabase';
// import browserClient from '@/app/utils/supabase/client';

export default function Header() {
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      // if (session) {
      //   setSession(session);
      // }
      setSession(session);
      console.log('session', session);

      console.log('_event', _event);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);
  console.log('session: ', session);

  return (
    <header className="flex flex-row flex-wrap bg-slate-200 p-4 justify-between">
      <Link href="/">서비스 소개</Link>
      <Link href="/note">걱정 작성</Link>
      <Link href="/">걱정 보관함</Link>
      <Link href="/ranking">통계 페이지</Link>
      <Link href="/letter">편지쓰기</Link>
      <Link href="/mypage">마이페이지</Link>
      <Link href="/auth/login">로그인</Link>
      <Link href="/auth/signup">회원가입</Link>
      <LogOutButton />
    </header>
  );
}

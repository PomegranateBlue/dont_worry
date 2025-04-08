import Link from 'next/link';
import LogOutButton from './loginComponents/LogOutButton';
import { getIsLogin } from '@/app/utils/supabase/server';
import MobileHeader from './mobileComponents/MobileHeader';

export default async function Header() {
  const isLogin = await getIsLogin();

  return (
    <>
      <header className="hidden md:flex flex-row flex-wrap bg-white p-4 justify-between border-b border-b-[#ccc]">
        <Link href="/">서비스 소개</Link>

        {isLogin ? (
          <>
            <Link href="/note">걱정 작성</Link>
            <Link href="/">걱정 보관함</Link>
            <Link href="/ranking">통계 페이지</Link>
            <Link href="/letter">편지쓰기</Link>
            <Link href="/mypage">마이페이지</Link>
            <LogOutButton />
          </>
        ) : (
          <div className="space-x-4">
            <Link href="/auth/login">로그인</Link>
            <Link href="/auth/signup">회원가입</Link>
          </div>
        )}
      </header>
      <MobileHeader isLogin={isLogin} />
    </>
  );
}

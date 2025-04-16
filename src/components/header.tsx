import Link from 'next/link';
import { getIsLogin } from '@/app/utils/supabase/server';
import MobileHeader from './mobileComponents/MobileHeader';
import LoginProfile from './loginComponents/LoginProfile';
import Image from 'next/image';
import { IsLoginMenu } from './loginComponents/IsLoginMenu';
import { IsNotLoginMenu } from './loginComponents/IsNotLoginMenu';

export default async function Header() {
  const isLogin = await getIsLogin();

  return (
    <header className="w-full bg-white border-b border-b-[#EDEDED]">
      <nav className="hidden md:flex flex-row flex-wrap justify-between w-full p-4">
        <Link href="/" className="relative">
          <Image
            src="/images/header-logo.svg"
            alt="header-logo"
            width={217}
            height={28}
          />
        </Link>
        {isLogin ? <IsLoginMenu /> : <IsNotLoginMenu />}
        {/* <div className="flex items-center gap-11">
          <Link href="/note">걱정 작성</Link>
          <Link href="/notebox">걱정 보관함</Link>
          <Link href="/ranking">통계</Link>
          <Link href="/letter">미래편지 작성</Link>
        </div> */}
        {isLogin ? <LoginProfile /> : <Link href="/auth/login">로그인</Link>}
      </nav>
      <MobileHeader isLogin={isLogin} />
    </header>
  );
}

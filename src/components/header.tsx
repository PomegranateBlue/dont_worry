import Link from 'next/link';
import { getIsLogin } from '@/app/utils/supabase/server';
// import MobileHeader from './mobileComponents/MobileHeader';
import LoginProfile from './loginComponents/LoginProfile';
import Image from 'next/image';
import { IsLoginMenu } from './loginComponents/IsLoginMenu';
import { IsNotLoginMenu } from './loginComponents/IsNotLoginMenu';
import MobileHeader from './mobileComponents/MobileHeader';

export default async function Header() {
  const isLogin = await getIsLogin();
  console.log('로그인여부', isLogin);

  return (
    <header className="w-full bg-white border-b border-b-[#EDEDED]">
      <nav className="hidden md:flex flex-row flex-wrap items-center justify-between w-full p-4">
        <Link href="/" className="relative">
          <Image
            src="/images/header-logo.svg"
            alt="header-logo"
            width={217}
            height={28}
          />
        </Link>
        {isLogin ? <IsLoginMenu /> : <IsNotLoginMenu />}
        {isLogin ? <LoginProfile /> : <Link href="/auth/login">로그인</Link>}
      </nav>
      <MobileHeader isLogin={isLogin} />
    </header>
  );
}

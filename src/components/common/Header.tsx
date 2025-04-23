'use client';
import Link from 'next/link';
import Image from 'next/image';
import { IsLoginMenu } from '../loginComponents/IsLoginMenu';
import { IsNotLoginMenu } from '../loginComponents/IsNotLoginMenu';
import LoginProfile from '../loginComponents/LoginProfile';
import MobileHeader from '../mobileComponents/MobileHeader';
import { useUserStore } from '@/store/auth/store';

export default function Header() {
  const { user } = useUserStore();
  const isLogin = !!user;

  return (
    <header className="w-full bg-white border-b border-b-[#EDEDED]">
      <nav className="hidden headerMd:flex flex-row flex-wrap items-center justify-between w-full p-4">
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

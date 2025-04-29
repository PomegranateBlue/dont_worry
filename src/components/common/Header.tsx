'use client';
import Link from 'next/link';
import Image from 'next/image';
import { IsLoginMenu } from '../loginComponents/IsLoginMenu';
import { IsNotLoginMenu } from '../loginComponents/IsNotLoginMenu';
import LoginProfile from '../loginComponents/LoginProfile';
import MobileHeader from '../mobileComponents/MobileHeader';
import { useUserStore } from '@/store/auth/store';
import { PATHS } from '@/constants/common/paths';
import Text from './Text';

export default function Header() {
  const { user } = useUserStore();
  const isLogin = !!user;

  return (
    <header className=" bg-white border-b border-b-[#EDEDED] fixed top-0 left-0 right-0 z-[100] h-14 lg:h-20">
      <nav className="max-w-screen-xl mx-auto px-10 hidden lg:flex flex-row flex-wrap items-center justify-between w-full h-full">
        <Link href={PATHS.HOME} className="relative">
          <Image
            src="/images/header-logo.webp"
            alt="header-logo"
            width={217}
            height={28}
          />
        </Link>
        {isLogin ? <IsLoginMenu /> : <IsNotLoginMenu />}
        {isLogin ? (
          <LoginProfile />
        ) : (
          <Link href={PATHS.LOGIN}>
            <Text variant="heading5" color="label-neutral">
              로그인
            </Text>
          </Link>
        )}
      </nav>
      <MobileHeader isLogin={isLogin} />
    </header>
  );
}

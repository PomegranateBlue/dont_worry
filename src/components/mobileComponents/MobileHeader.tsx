'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import LogOutButton from '../loginComponents/LogOutButton';
import { motion, AnimatePresence } from 'framer-motion';
import { AlignJustify, X } from 'lucide-react';
import Text from '../common/Text';
import Image from 'next/image';
import { useUserInfo } from '@/hooks/userHooks/useUserInfo';
import { IsNotLoginMenu } from '../loginComponents/IsNotLoginMenu';
import { IsLoginMenu } from '../loginComponents/IsLoginMenu';

interface MobileHeaderProps {
  isLogin: boolean;
}

export default function MobileHeader({ isLogin }: MobileHeaderProps) {
  const { data: userData } = useUserInfo();

  // console.log(userData);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // 스크롤 막기
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isMenuOpen]);

  // 링크 클릭 시 메뉴 닫기
  const handleNavClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('a') || target.closest('button')) {
      toggleMenu();
    }
  };

  return (
    <div className="md:hidden h-[50px] relative px-4 flex items-center justify-between bg-white z-50">
      <button
        className="md:hidden focus:outline-none z-50"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X /> : <AlignJustify />}
      </button>
      {isLogin && !isMenuOpen && (
        <Link
          href="/mypage"
          className="w-[30px] h-[30px] bg-slate-400 rounded-full overflow-hidden"
        >
          <Image
            src={userData?.profile_img || '/images/profile-default-image.svg'}
            alt="프로필 이미지"
            width={60}
            height={60}
            unoptimized
          />
        </Link>
      )}

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            onClick={handleNavClick}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[50px] left-0 w-full h-[calc(100vh-50px)] bg-white z-40 overflow-y-auto"
          >
            <div className="h-full relative">
              <div className="border-b border-[#D9D9D9] p-6">
                <Link
                  href={isLogin ? '/mypage' : '/auth/login'}
                  className="flex items-center"
                >
                  <div className="w-[60px] h-[60px] bg-slate-400 rounded-full mr-4 overflow-hidden">
                    {isLogin && (
                      <Image
                        src={
                          userData?.profile_img ||
                          '/images/profile-default-image.svg'
                        }
                        alt="프로필 이미지"
                        width={60}
                        height={60}
                      />
                    )}
                  </div>

                  <Text variant="body2" color="label-normal">
                    {isLogin
                      ? `${userData?.nickname} 님`
                      : '로그인 후 이용할 수 있어요'}
                  </Text>
                  <Image
                    src="/images/ico-right.svg"
                    alt="ico-right"
                    width={24}
                    height={24}
                  />
                </Link>
              </div>
              <div className="p-6 flex flex-col gap-1">
                <Link href="/" className="py-4">
                  <Text variant="title2" color="label-neutral">
                    서비스 소개
                  </Text>
                </Link>
                {isLogin ? <IsLoginMenu /> : <IsNotLoginMenu />}

                {isLogin && (
                  <div className="mt-10 text-sm text-gray-500 p-2">
                    <LogOutButton />
                  </div>
                )}
              </div>
              <Link href="/">
                <Image
                  src="/images/mobile-logo.svg"
                  alt="logo"
                  width={160}
                  height={32}
                  className="absolute bottom-10 left-6"
                />
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}

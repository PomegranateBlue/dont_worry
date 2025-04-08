'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import LogOutButton from '../loginComponents/LogOutButton';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
// import { useUserInfo } from '@/hooks/useMyPageQueries';

interface MobileHeaderProps {
  isLogin: boolean;
}

export default function MobileHeader({ isLogin }: MobileHeaderProps) {
  // const { data: userData, isLoading: userDataLoading } = useUserInfo();
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
        {isMenuOpen ? (
          <Image
            src="/images/ico-close.png"
            width={24}
            height={24}
            alt="close"
          />
        ) : (
          <Image src="/images/ico-ham.png" width={30} height={30} alt="menu" />
        )}
      </button>
      {isLogin && !isMenuOpen && (
        <div className="w-[30px] h-[30px] bg-slate-400 rounded-full" />
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
            {isLogin ? (
              <div className="h-full">
                <div className="border-b border-[#D9D9D9] p-6">
                  <Link href="/mypage" className="flex items-center gap-4">
                    <div className="w-[60px] h-[60px] bg-slate-400 rounded-full" />
                    <p className="">닉네임 님</p>
                  </Link>
                </div>
                <div className="p-6 flex flex-col gap-4 ">
                  <Link href="/">서비스 소개</Link>
                  <Link href="/note">걱정 작성</Link>
                  <Link href="/">걱정 보관함</Link>
                  <Link href="/ranking">통계</Link>
                  <Link href="/letter">편지쓰기</Link>
                  <div className="mt-5 text-sm text-gray-500 ">
                    <LogOutButton />
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 flex flex-col gap-4">
                <Link href="/">서비스 소개</Link>
                <Link href="/auth/login">로그인</Link>
                <Link href="/auth/signup">회원가입</Link>
              </div>
            )}
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}

import { PATHS } from '@/constants/common/paths';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ChatPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 왼쪽 상단 뒤로가기 아이콘 */}
      <header className="relative flex items-center justify-center h-16 border-b">
        <Link href={PATHS.MYPAGE} className="absolute left-4 p-2">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-xl font-semibold">서비스 준비 중입니다.</h1>
      </header>

      <div className="flex flex-col items-center flex-1 mt-4">
        <Image
          width={150}
          height={100}
          src="/images/sad.svg"
          alt="슬픔 이미지"
          priority
        />
      </div>
    </div>
  );
};

export default ChatPage;

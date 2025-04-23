import { PATHS } from '@/constants/common/paths';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const NoticePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 상단 바 */}
      <div className="relative flex items-center justify-center h-16 border-b">
        {/* 왼쪽 아이콘 */}
        <Link href={PATHS.MYPAGE} className="absolute left-4 p-2">
          <ChevronLeft />
        </Link>
        {/* 가운데 제목 */}
        <h1 className="text-xl font-semibold">공지사항</h1>
      </div>

      {/* 페이지 하단 여유 공간 */}
      <div className="flex-1" />
    </div>
  );
};

export default NoticePage;

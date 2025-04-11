import { termsOfServiceData } from '@/components/mypage/termsOfServiceData';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const TermsPage = () => {
  const { mainTerms } = termsOfServiceData;

  return (
    <div className="flex flex-col min-h-screen px-4">
      {/* 상단 바 */}
      <div className="relative flex items-center justify-center h-16 border-b">
        {/* 왼쪽 아이콘 */}
        <Link href="/mypage" className="absolute left-4 p-2">
          <ChevronLeft />
        </Link>
        {/* 가운데 제목 */}
        <h1 className="text-xl font-semibold">{mainTerms.title}</h1>
      </div>

      {/* 본문 내용 */}
      <div className="py-6">
        <p className="mb-4 text-sm text-gray-500">
          최종 업데이트: {mainTerms.lastUpdated}
        </p>
        {mainTerms.sections.map((section, index) => (
          <div key={index} className="mb-6">
            <h2 className="font-semibold text-base mb-2">{section.title}</h2>
            <p className="text-sm text-gray-700">{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TermsPage;

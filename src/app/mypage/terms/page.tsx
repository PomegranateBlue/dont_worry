import { termsOfServiceData } from '@/components/mypage/termsOfServiceData';
import { PATHS } from '@/constants/common/paths';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const TermsPage = () => {
  const { mainTerms } = termsOfServiceData;

  return (
    <main className="flex flex-col min-h-screen">
      <header className="relative flex items-center justify-center h-16 border-b">
        <Link href={PATHS.MYPAGE} className="absolute left-4 p-2">
          <ChevronLeft />
        </Link>
        <h1 className="text-xl font-semibold">{mainTerms.title}</h1>
      </header>

      <section className="py-6 px-5">
        <p className="mb-4 text-sm text-gray-500">
          최종 업데이트: {mainTerms.lastUpdated}
        </p>
        {mainTerms.sections.map((section, index) => (
          <div key={index} className="mb-6">
            <h2 className="font-semibold text-base mb-2">{section.title}</h2>
            <p className="text-sm text-gray-700">{section.content}</p>
          </div>
        ))}
      </section>
    </main>
  );
};

export default TermsPage;

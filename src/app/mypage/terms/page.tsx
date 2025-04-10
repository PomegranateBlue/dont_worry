import { termsOfServiceData } from '@/components/mypage/termsOfServiceData';
import Link from 'next/link';
import React from 'react';

const TermsPage = () => {
  const { mainTerms } = termsOfServiceData;
  return (
    <div>
      <h1 className="text-xl m-4 text-center">{mainTerms.title}</h1>
      <Link href="/mypage" className="border rounded-md p-2 mt-4 mb-4">
        뒤로가기
      </Link>
      <p className='mt-4'>최종 업데이트: {mainTerms.lastUpdated}</p>
      {mainTerms.sections.map((section, index) => (
        <div key={index}>
          <h2>{section.title}</h2>
          <p>{section.content}</p>
        </div>
      ))}
    </div>
  );
};

export default TermsPage;

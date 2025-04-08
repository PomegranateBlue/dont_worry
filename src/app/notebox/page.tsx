// const NoteBox = () => {
//   return (
//     <div className="mx-auto flex justify-center">
//       <p className="text-2xl font-bold p-4">걱정 보관함</p>
//     </div>
//   );
// };

// export default NoteBox;
// components/NotePage.tsx
'use client';
import { useState } from 'react';
import FilterModal from '@/components/noteBoxComponents/FilterModal';
import FilterBar from '@/components/noteBoxComponents/FilterBar';
const NotePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full max-w-[375px] mx-auto min-h-screen bg-white flex flex-col">
      <h1 className="text-xl font-bold text-center">걱정 보관함</h1>
      <FilterBar />
      <main className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-gray-100 p-4 rounded-xl">
            <div className="text-sm font-semibold">
              불안해요{' '}
              <span className="ml-1 px-2 py-0.5 text-xs bg-black text-white rounded-full">
                학업
              </span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              2025년 04월 02일 (수)
            </div>
            <div className="mt-2 text-sm leading-relaxed">
              재테크 초보자를 위한 기본 가이드는 저축, 투자, 예산 관리의
              중요성을 다룹니다...
            </div>
          </div>
        ))}
      </main>

      {isModalOpen && <FilterModal isOpen onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default NotePage;

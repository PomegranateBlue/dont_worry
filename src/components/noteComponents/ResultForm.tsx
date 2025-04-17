'use client';

import { useNoteStore } from '@/store/note/noteStore';
import { ThumbsDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ResultSaveButton from './ResultSaveButton';
const ResultForm = () => {
  const router = useRouter();
  const { message, result } = useNoteStore();
  const goNoteBox = () => {
    router.push('/notebox');
  };

  return (
    <div className="flex flex-col min-h-screen  ">
      <p className="flex h-[56px] items-center justify-center w-full bg-backgroundSet-normal text-[20px] font-semibold px-[6px]">
        상담 결과
      </p>

      <div className="p-5">
        <div className="flex flex-col gap-4 flex-1">
          <div className="flex flex-col items-end">
            <div className="bg-white  px-4 py-2 w-[280px] text-[14px]  font-medium [border-radius:16px_16px_0px_16px]">
              {message}
            </div>
          </div>

          <div className="flex flex-col items-start">
            <div className="bg-backgroundSet-normal  px-4 py-2 w-[280px] text-[14px] font-medium [border-radius:16px_16px_16px_0px] ">
              {result || '...같이 고민하는 중'}
            </div>
          </div>
        </div>

        {/*저장 버튼 */}
        <div className="text-center mt-8 text-[12px] text-label-alternative">
          이 답장이 마음에 드셨나요?
          <div className="flex justify-center gap-6 mt-2">
            <ResultSaveButton />
            <ThumbsDown className="w-5 h-5 text-gray-500" />
          </div>
        </div>
      </div>

      <div className="px-5 py-2">
        <button
          onClick={goNoteBox}
          className="w-[335px] h-[48px] text-[#FFFFFF] bg-[#8573C9]  text-[18px] font-semibold rounded-md px-5"
        >
          보관함으로 가기
        </button>
      </div>
    </div>
  );
};

export default ResultForm;

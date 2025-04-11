'use client';

import { useNoteStore } from '@/store/noteStore';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ResultSaveButton from './ResultSaveButton';
const ResultForm = () => {
  const router = useRouter();
  const { message, result } = useNoteStore();
  // console.log(result);

  const goNoteBox = () => {
    router.push('/notebox');
  };

  return (
    <div className="flex flex-col min-h-screen  ">
      <h1 className="text-center text-lg font-semibold w-full bg-[#FFFFFF]">
        감정 작성
      </h1>

      <div className="flex flex-col gap-4 flex-1">
        <div className="flex flex-col items-end">
          <div className="bg-white rounded-xl px-4 py-2 max-w-[75%] text-md shadow-lg font-semibold">
            {message}
          </div>
        </div>

        <div className="flex flex-col items-start">
          <div className="bg-white rounded-xl px-4 py-2 max-w-[75%] text-md font-semibold shadow-lg">
            {result || '...같이 고민하는 중'}
          </div>
        </div>

        <div className="text-center mt-8 text-sm text-gray-500">
          이 답장이 마음에 드셨나요?
          <div className="flex justify-center gap-6 mt-2">
            <ResultSaveButton />
            <ThumbsDown className="w-5 h-5 text-gray-500" />
          </div>
        </div>
      </div>

      <button
        onClick={goNoteBox}
        className="mt-6 w-full py-3 bg-[#8573C9] text-white text-sm font-semibold rounded-xl"
      >
        보관함으로 가기
      </button>
    </div>
  );
};

export default ResultForm;

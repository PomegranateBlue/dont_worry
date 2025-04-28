'use client';

import { useNoteStore } from '@/store/note/noteStore';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { useRouter } from 'next/navigation';

import Text from '../common/Text';
const ResultForm = () => {
  const router = useRouter();
  const { message, result } = useNoteStore();
  const goNoteBox = () => {
    router.push('/notebox');
  };

  return (
    <section className="flex flex-col min-h-screen">
      <header className="flex px-[6px]">
        <Text
          variant="title1"
          color="label-normal"
          className="flex h-[56px] items-center justify-center w-full bg-backgroundSet-normal px-[6px]"
        >
          걱정 작성
        </Text>
      </header>

      {/* 메시지 영역 */}
      <section className="flex flex-col gap-5 p-5 flex-1 xl:px-[40px] xl:py-[24px]">
        {/* 사용자 메시지 */}
        <article className="flex justify-end">
          <div className="bg-white px-4 py-2 w-fit max-w-[80%]  rounded-[16px_16px_0px_16px] drop-shadow-md">
            <Text variant="body3" color="label-normal">
              {message || '사용자 메시지'}
            </Text>
          </div>
        </article>

        {/* GPT 응답 메시지 */}
        <section className="flex justify-start">
          <div className="bg-backgroundSet-normal px-4 py-2 w-fit max-w-[80%] rounded-[16px_16px_16px_0px] drop-shadow-md">
            <Text variant="body3" color="label-normal">
              {result || '...같이 고민하는 중'}
            </Text>
          </div>
        </section>

        <section className="flex flex-col items-center justify-center text-center pt-5 gap-[4px] ">
          <Text variant="label1" color="label-alternative">
            이 답장이 마음에 드셨나요?
          </Text>
          <div className="flex justify-center gap-6 mt-2">
            <div className="w-4 h-4 ">
              <ThumbsUp className="w-4 h-4 text-gray-500" />
            </div>
            <div>
              <ThumbsDown className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </section>
      </section>

      {/* 보관함 가기 버튼 */}
      <section className="px-5 py-2">
        <button
          onClick={goNoteBox}
          className="w-full h-[48px] text-[#FFFFFF] bg-[#8573C9] text-[18px] font-semibold rounded-md"
        >
          보관함으로 가기
        </button>
      </section>
    </section>
  );
};

export default ResultForm;

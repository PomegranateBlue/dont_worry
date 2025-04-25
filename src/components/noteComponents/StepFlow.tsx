'use client';

import { useState, useRef } from 'react';
import { ChevronLeft } from 'lucide-react';
import EmotionCategoryForm from './EmotionCategoryForm';
import TopicCategoryForm from './TopicCategoryForm';
import MessageForm from './MessageForm';
import ResultForm from './ResultForm';
import Text from '../common/Text';
import { useNoteStore } from '@/store/note/noteStore';
import { useGPTSubmit } from '@/hooks/noteHooks/useGPTSubmit';
import { useNoteSave } from '@/hooks/noteHooks/useNoteSave';
import { useUserStore } from '@/store/auth/store';

import dynamic from 'next/dynamic';
{
  /*lottie 라이브러리를 위한 ssr 렌더링 방지 */
}
const MessageLoading = dynamic(() => import('./MessageLoading'), {
  ssr: false
});

enum StepProps {
  CATEGORY = 'category',
  MESSAGE = 'message',
  RESULT = 'result'
}

const StepFlow = () => {
  const [step, setStep] = useState<StepProps>(StepProps.CATEGORY);
  const {
    selectedTopics,
    selectedEmotions,
    toggleTopic,
    message,
    setResult,
    reset
  } = useNoteStore();

  const emotionRef = useRef<HTMLDivElement | null>(null);
  const { mutateAsync: submitGPT, isPending } = useGPTSubmit();
  const { mutateAsync: saveNote } = useNoteSave();
  const { user } = useUserStore();

  const handleCategorySelect = (topic: string) => {
    toggleTopic(topic);

    // 다음 렌더링에서 상태가 반영된 후 확인해야 하므로 약간 지연
    setTimeout(() => {
      const { selectedTopics } = useNoteStore.getState(); // 최신 상태 직접 가져옴

      if (selectedTopics.length === 3) {
        emotionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50); // 50ms 정도면 충분 (너무 길면 UX 저하됨)
  };

  const handleSubmit = async () => {
    if (!user) {
      setStep(StepProps.RESULT);
      return;
    }

    try {
      const gptInput = {
        topics: selectedTopics,
        emotions: selectedEmotions,
        message
      };

      const res = await submitGPT(gptInput);
      setResult(res.content);

      const saveInput = {
        message,
        result: res.content,
        topics: selectedTopics,
        emotions: selectedEmotions,
        userId: user
      };

      await saveNote(saveInput);
      setStep(StepProps.RESULT);
      reset();
    } catch (err) {
      console.error('에러 발생:', err);
      alert((err as Error).message);
      setStep(StepProps.RESULT);
    }
  };

  return (
    <div className="flex w-full justify-center mx-auto max-w-[1200px]">
      <div className="w-full  max-w-[648px]">
        {step === StepProps.CATEGORY && (
          <div>
            <Text
              variant="title1"
              variant2="heading1"
              color="label-normal"
              className="flex h-[56px] items-center justify-center w-full bg-backgroundSet-normal px-[6px] xl:px-[40px]"
            >
              걱정 작성
            </Text>
            <TopicCategoryForm onSelectCategory={handleCategorySelect} />
            <div ref={emotionRef}>
              <EmotionCategoryForm />
            </div>
            <div className="flex justify-center w-full px-5 py-2  ">
              <button
                className="max-w-[648px] flex items-center justify-center  w-full h-[48px]  bg-primary-4 rounded-[8px] px-5 py-4"
                onClick={() => setStep(StepProps.MESSAGE)}
              >
                <Text variant="title2" className="text-backgroundSet-normal">
                  다음으로
                </Text>
              </button>
            </div>
          </div>
        )}
        {step === StepProps.MESSAGE && (
          <div className="flex flex-col min-h-screen overflow-hidden">
            <div className="relative h-[56px] w-full px-[6px]">
              <button className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                <ChevronLeft
                  onClick={() => {
                    setStep(StepProps.CATEGORY);
                  }}
                />
              </button>
              <div className="absolute inset-0 flex justify-center items-center">
                <Text variant="title1" variant2="heading1">감정 작성</Text>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center px-[12px] py-[16px] xl:py-[40px]">
              <MessageForm />
            </div>

            <div className="h-[128px]" />

            <div className="flex px-5 py-2 w-full">
              <button
                onClick={handleSubmit}
                className="flex items-center justify-center px-5 py-4 w-full h-[48px] bg-primary-4 rounded-[8px] mt-auto"
              >
                <Text variant="title2" className="text-backgroundSet-normal">
                  제출하기
                </Text>
              </button>
            </div>
          </div>
        )}
        {step === StepProps.RESULT && (
          <div>
            <ResultForm />
          </div>
        )}
        {isPending && <MessageLoading />}
      </div>
    </div>
  );
};

export default StepFlow;

'use client';

import { useState, useRef } from 'react';
import { ChevronLeft } from 'lucide-react';
import EmotionCategoryForm from './EmotionCategoryForm';
import TopicCategoryForm from './TopicCategoryForm';
import MessageForm from './MessageForm';
import ResultForm from './ResultForm';
import { fetchGPT } from '@/lib/api/gpt/gpt';
import { useNoteStore } from '@/store/note/noteStore';

enum StepProps {
  CATEGORY = 'category',
  MESSAGE = 'message',
  RESULT = 'result'
}

const StepFlow = () => {
  const [step, setStep] = useState<StepProps>(StepProps.CATEGORY);
  const { selectedTopic, selectedEmotions, toggleTopic, message, setResult } =
    useNoteStore();
  const emotionRef = useRef<HTMLDivElement | null>(null);

  const handleCategorySelect = (topic: string) => {
    toggleTopic(topic);
    setTimeout(() => {
      emotionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handelSubmit = async () => {
    try {
      const userInput = await fetchGPT({
        topic: selectedTopic,
        emotions: selectedEmotions,
        message
      });
      setResult(userInput);
      setStep(StepProps.RESULT);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {step === StepProps.CATEGORY && (
        <div>
          <p className="flex h-[56px] items-center justify-center w-full bg-backgroundSet-normal text-[20px] font-semibold px-[6px]">
            걱정 작성
          </p>
          <TopicCategoryForm onSelectCategory={handleCategorySelect} />
          <div ref={emotionRef}>
            <EmotionCategoryForm />
          </div>
          <div className="px-5 py-2 w-full">
            <button
              className="flex items-center justify-center mx-auto w-full h-[48px]  text-[#FFFFFF] bg-[#8573C9]  text-[18px] font-semibold rounded-md px-5"
              onClick={() => setStep(StepProps.MESSAGE)}
            >
              다음으로
            </button>
          </div>
        </div>
      )}

      {step === StepProps.MESSAGE && (
        <div className="flex flex-col min-h-screen  overflow-hidden">
          <div className="relative h-[56px] w-full px-[6px]">
            <button className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
              <ChevronLeft
                onClick={() => {
                  console.log('뒤로가기');
                  setStep(StepProps.CATEGORY);
                }}
              />
            </button>
            <div className="absolute inset-0 flex justify-center items-center">
              <p className="text-[20px] font-semibold">감정 작성</p>
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <p className="font-semibold text-[22px] px-5 py-2  ">
              오늘 나의 걱정을 작성해보세요
            </p>
            <MessageForm />
          </div>

          <div className="px-5 py-2 w-full">
            <button
              onClick={handelSubmit}
              className="w-full h-[48px] text-[#FFFFFF] bg-[#8573C9]  text-[18px] font-semibold rounded-md px-5"
            >
              제출하기
            </button>
          </div>
        </div>
      )}

      {step === StepProps.RESULT && (
        <div>
          <ResultForm />
        </div>
      )}
    </div>
  );
};

export default StepFlow;

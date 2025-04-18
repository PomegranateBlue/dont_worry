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

enum StepProps {
  CATEGORY = 'category',
  MESSAGE = 'message',
  RESULT = 'result'
}

const StepFlow = () => {
  const [step, setStep] = useState<StepProps>(StepProps.MESSAGE);
  const { selectedTopic, selectedEmotions, toggleTopic, message, setResult } =
    useNoteStore();
  const emotionRef = useRef<HTMLDivElement | null>(null);

  const handleCategorySelect = (topic: string) => {
    toggleTopic(topic);
    setTimeout(() => {
      emotionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const { mutate: submitGPT } = useGPTSubmit();
  const handleSubmit = () => {
    submitGPT(
      {
        topic: selectedTopic,
        emotions: selectedEmotions,
        message
      },
      {
        onSuccess: (res) => {
          setResult(res.content);
          setStep(StepProps.RESULT);
        },
        onError: (err) => {
          console.error('GPT 요청 실패:', err.message);
        }
      }
    );
  };

  return (
    <div>
      {step === StepProps.CATEGORY && (
        <div>
          <Text
            variant="title1"
            color="label-normal"
            className="flex h-[56px] items-center justify-center w-full bg-backgroundSet-normal px-[6px]"
          >
            걱정 작성
          </Text>
          <TopicCategoryForm onSelectCategory={handleCategorySelect} />
          <div ref={emotionRef}>
            <EmotionCategoryForm />
          </div>
          <div className="px-5 py-2 w-full">
            <button
              className="flex items-center justify-center mx-auto w-full h-[48px]  text-[#FFFFFF] bg-[#8573C9]   rounded-[8px] px-5 py-4"
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

          <div className=" flex flex-col justify-center items-center">
            <MessageForm />
          </div>

          <div className="px-5 py-2 w-full">
            <button
              onClick={handleSubmit}
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

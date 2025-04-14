'use client';

import { useState, useRef } from 'react';

import EmotionCategoryForm from './EmotionCategoryForm';
import TopicCategoryForm from './TopicCategoryForm';
import MessageForm from './MessageForm';
import ResultForm from './ResultForm';
import { fetchGPT } from '@/lib/api/gpt/gpt';
import { useNoteStore } from '@/store/note/noteStore';

enum StepProps {
  CATEGORY = 'category',
  EMOTION = 'emotion',
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
          <TopicCategoryForm onSelectCategory={handleCategorySelect} />
          <div ref={emotionRef}>
            <EmotionCategoryForm />
          </div>

          <button
            className="text-[#FFFFFF] bg-[#8573C9] w-full  font-semibold rounded-md py-2 mb-4"
            onClick={() => setStep(StepProps.MESSAGE)}
          >
            다음으로
          </button>
        </div>
      )}

      {step === StepProps.MESSAGE && (
        <div className="flex flex-col min-h-screen  overflow-hidden">
          <div className="flex-1 flex flex-col">
            <p className="font-semibold text-xl p-4 mr-auto">
              오늘 나의 걱정을 작성해보세요
            </p>
            <MessageForm />
          </div>

          <button
            onClick={handelSubmit}
            className="text-[#FFFFFF] bg-[#8573C9] w-full  font-semibold rounded-md py-2 mb-4"
          >
            제출하기
          </button>
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

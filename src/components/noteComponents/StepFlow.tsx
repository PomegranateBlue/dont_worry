'use client';

import { useState } from 'react';

import EmotionCategoryForm from './EmotionCategoryForm';
import TopicCategoryForm from './TopicCategoryForm';
import MessageForm from './MessageForm';
import ResultForm from './ResultForm';

import { fetchGPT } from '@/lib/api/gpt/gpt';
import { useNoteStore } from '@/store/noteStore';
import ResultSaveButton from './ResultSaveButton';

enum StepProps {
  CATEGORY = 'category',
  EMOTION = 'emotion',
  MESSAGE = 'message',
  RESULT = 'result'
}
const StepFlow = () => {
  const [step, setStep] = useState<StepProps>(StepProps.CATEGORY);
  const { selectedTopic, selectedEmotions, message, setResult } =
    useNoteStore();

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
          <TopicCategoryForm />
          <EmotionCategoryForm />
          <button onClick={() => setStep(StepProps.MESSAGE)}>다음으로</button>
        </div>
      )}

      {step === StepProps.MESSAGE && (
        <div>
          <MessageForm />
          <button onClick={handelSubmit}>제출하기</button>
        </div>
      )}

      {step === StepProps.RESULT && (
        <div>
          <ResultForm />
          <ResultSaveButton />
        </div>
      )}
    </div>
  );
};

export default StepFlow;

'use client';

import { useState } from 'react';

import EmotionCategoryForm from './EmotionCategoryForm';
import TopicCategoryForm from './TopicCategoryForm';
import MessageForm from './MessageForm';
import ResultForm from './ResultForm';

import { fetchGPT } from '@/lib/api/gpt/gpt';
import { useNoteStore } from '@/store/noteStore';

enum StepProps {
  topic = 'topic',
  emotion = 'emotion',
  message = 'message',
  result = 'result'
}
const StepFlow = () => {
  const [step, setStep] = useState<StepProps>(StepProps.topic);
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
      setStep(StepProps.result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {step === StepProps.topic && (
        <div>
          <TopicCategoryForm />
          <button onClick={() => setStep(StepProps.emotion)}>다음으로</button>
        </div>
      )}

      {step === StepProps.emotion && (
        <div>
          <EmotionCategoryForm />
          <button onClick={() => setStep(StepProps.message)}>다음으로</button>
        </div>
      )}

      {step === StepProps.message && (
        <div>
          <MessageForm />
          <button onClick={handelSubmit}>제출하기</button>
        </div>
      )}

      {step === StepProps.result && (
        <div>
          <ResultForm />
        </div>
      )}
    </div>
  );
};

export default StepFlow;

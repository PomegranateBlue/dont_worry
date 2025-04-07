'use client';

import { useState } from 'react';

import EmotionCategoryForm from './EmotionCategoryForm';
import TopicCategoryForm from './TopicCategoryForm';
import MessageForm from './MessageForm';
import ResultForm from './ResultForm';

import { fetchGPT } from '@/lib/api/gpt/gpt';
import { useNoteStore } from '@/store/noteStore';

import StepButton from './StepButton';
const StepFlow = () => {
  const [step, setStep] = useState<'topic' | 'emotion' | 'message' | 'result'>(
    'topic'
  );
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
      setStep('result');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {step === 'topic' && (
        <div>
          <TopicCategoryForm />
          <button onClick={() => setStep('emotion')}>다음으로</button>
        </div>
      )}

      {step === 'emotion' && (
        <div>
          <EmotionCategoryForm />
          <button onClick={() => setStep('message')}>다음으로</button>
        </div>
      )}

      {step === 'message' && (
        <div>
          <MessageForm />
          <button onClick={handelSubmit}>제출하기</button>
        </div>
      )}

      {step === 'result' && (
        <div>
          <ResultForm />
        </div>
      )}
    </div>
  );
};

export default StepFlow;

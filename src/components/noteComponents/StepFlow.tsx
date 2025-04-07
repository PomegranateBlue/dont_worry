'use client';

import { useState } from 'react';
import EmotionCategoryForm from './EmotionCategoryForm';
import TopicCategoryForm from './TopicCategoryForm';
import MessageForm from './MessageForm';
import ResultForm from './ResultForm';
const StepFlow = () => {
  const [step, setStep] = useState<'emotion' | 'topic' | 'message' | 'result'>(
    'emotion'
  );

  return (
    <div>
      {step === 'emotion' && (
        <div>
          <EmotionCategoryForm />
          <button onClick={() => setStep('topic')}>다음으로</button>
        </div>
      )}

      {step === 'topic' && (
        <div>
          <TopicCategoryForm />
          <button onClick={() => setStep('message')}>다음으로</button>
        </div>
      )}

      {step === 'message' && (
        <div>
          <MessageForm />
          <button onClick={() => setStep('result')}>제출하기</button>
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

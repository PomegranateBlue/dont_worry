'use client';

import { useMutation } from '@tanstack/react-query';
import { AIError } from '@/constants/error/aiErrorKeys';
export interface GPTProps {
  topics: string[];
  emotions: string[];
  message: string;
}

export interface GPTResponse {
  content: string;
}

export const useGPTSubmit = () => {
  return useMutation<GPTResponse, Error, GPTProps>({
    mutationFn: async ({ topics, emotions, message }) => {
      const res = await fetch('/utils/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `주제: ${topics.join(',')}, 감정: ${emotions.join(
            ', '
          )}, 메시지: ${message}`
        })
      });

      if (!res.ok) throw new AIError('GPT_GENERATION_FAIL');
      return res.json();
    }
  });
};
// 에러문구 : GPT로의 제출 실패, status:

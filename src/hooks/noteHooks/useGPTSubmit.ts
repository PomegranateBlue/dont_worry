'use client';

import { useMutation } from '@tanstack/react-query';

export interface GPTProps {
  topic: string | null;
  emotions: string[];
  message: string;
}

export interface GPTResponse {
  content: string;
}

export function useGPTSubmit() {
  return useMutation<GPTResponse, Error, GPTProps>({
    mutationFn: async ({ topic, emotions, message }) => {
      const res = await fetch('/utils/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `주제: ${topic}, 감정: ${emotions.join(
            ', '
          )}, 메시지: ${message}`
        })
      });

      if (!res.ok) throw new Error('GPT 요청 실패');
      return res.json();
    }
  });
}

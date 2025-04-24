'use client';

import { useMutation } from '@tanstack/react-query';

interface NoteSaveProps {
  message: string;
  result: string;
  topics: string[];
  emotions: string[];
  userId: string;
}

interface SaveResultProps {
  success: boolean;
  error?: string;
}

export const useNoteSave = () => {
  return useMutation<SaveResultProps, Error, NoteSaveProps>({
    mutationFn: async ({ message, result, topics, emotions, userId }) => {
      const res = await fetch('/utils/note', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          result: { content: result }, // 서버 구조에 맞게 감쌈
          topics,
          emotions,
          userId
        })
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || `노트 저장 실패 (status: ${res.status})`);
      }

      return { success: true };
    }
  });
};

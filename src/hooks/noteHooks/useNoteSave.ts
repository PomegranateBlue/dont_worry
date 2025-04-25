'use client';

import { useMutation } from '@tanstack/react-query';
import { NoteError } from '@/constants/error/noteError';
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

      // const data = await res.json().catch(() => ({}));
      //에러 처리 변경 로직이 변경될 수 있음

      if (!res.ok) {
        throw new NoteError('CANT_UPLOAD_USER_WORRIES');
      }

      return { success: true };
    }
  });
};

'use client';

import { useMutation } from '@tanstack/react-query';
import { NoteError } from '@/constants/error/noteError';

interface NoteDeleteProps {
  noteId: string;
}
interface DeleteResponseProps {
  success: boolean;
}

export const useNoteDelete = () => {
  return useMutation<DeleteResponseProps, Error, NoteDeleteProps>({
    mutationFn: async ({ noteId }) => {
      const res = await fetch('/utils/notebox/noteDelete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          noteIds: [noteId]
        })
      });

      if (!res.ok) {
        throw new NoteError('CANT_DELETE_USER_WORRIES');
      }
      return { success: true };
    }
  });
};

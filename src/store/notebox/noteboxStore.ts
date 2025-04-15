//걱정 보관함에서의 필터링을 위한 스토어 정의의

import { create } from 'zustand';
import { Tables } from '../../../database.types';

interface NoteboxProps {
  notes: Tables<'users_note'>[];
  setNotes: (notes: Tables<'users_note'>[]) => void;
}

export const useNoteListStore = create<NoteboxProps>((set) => ({
  notes: [],
  setNotes: (notes) => set({ notes })
}));


//사용자 입력 상태 관리를 위한 스토어 정의

import { create } from 'zustand';

interface NoteProps {
  selectedTopic: string | null; // 주제는 1개만
  selectedEmotions: string[]; // 감정은 최대 3개
  
  toggleTopic: (topic: string) => void;
  toggleEmotion: (emotion: string) => void;

  message: string;
  setMessage: (message: string) => void;

  result: string;
  setResult: (result: string) => void;
}

export const useNoteStore = create<NoteProps>((set) => ({
  selectedTopic: null,
  selectedEmotions: [],

  toggleTopic: (topic) =>
    set((state) => ({
      selectedTopic: state.selectedTopic === topic ? null : topic
    })),

  toggleEmotion: (emotion) =>
    set((state) => {
      const isEmotion = state.selectedEmotions.includes(emotion);

      if (isEmotion) {
        return {
          selectedEmotions: state.selectedEmotions.filter((e) => e !== emotion)
        };
      }

      if (state.selectedEmotions.length >= 3) {
        return state;
      }

      return {
        selectedEmotions: [...state.selectedEmotions, emotion]
      };
    }),

  message: '',
  setMessage: (message) => set({ message }),

  result: '',
  setResult: (result) => set({ result })
}));

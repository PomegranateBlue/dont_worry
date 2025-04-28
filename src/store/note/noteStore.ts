//사용자 입력 상태 관리를 위한 스토어 정의

import { create } from 'zustand';

interface NoteProps {
  selectedTopics: string[]; // 주제도 3개
  selectedEmotions: string[]; // 감정은 최대 3개

  toggleTopic: (topic: string) => void;
  toggleEmotion: (emotion: string) => void;

  message: string;
  setMessage: (message: string) => void;

  result: string;
  setResult: (result: string) => void;

  reset: () => void;
}

export const useNoteStore = create<NoteProps>((set) => ({
  selectedTopics: [],
  selectedEmotions: [],

  toggleTopic: (topic) =>
    set((state) => {
      const isSelected = state.selectedTopics.includes(topic);

      if (isSelected) {
        return {
          selectedTopics: state.selectedTopics.filter((e) => e !== topic)
        };
      }

      if (state.selectedTopics.length >= 3) {
        return state;
      }
      return {
        selectedTopics: [...state.selectedTopics, topic]
      };
    }),
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
  setResult: (result) => set({ result }),

  reset: () => {
    set({
      selectedTopics: [],
      selectedEmotions: []
    });
  }
}));

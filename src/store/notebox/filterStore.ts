import { create } from 'zustand';

type SortType = '최신순' | '과거순' | null;

interface NoteFilterProps {
  selectedSort: '최신순' | '과거순' | null;
  selectedTopics: string[];
  selectedEmotions: string[];

  setSort: (sort: SortType) => void;
  toggleTopic: (topic: string) => void;
  toggleEmotion: (emotion: string) => void;
  resetFilters: () => void;
}

export const useFilterOption = create<NoteFilterProps>((set) => ({
  selectedSort: '최신순',
  selectedTopics: [],
  selectedEmotions: [],

  setSort: (sort) => set({ selectedSort: sort }),

  toggleTopic: (topic) =>
    set((state) => ({
      selectedTopics: state.selectedTopics.includes(topic)
        ? state.selectedTopics.filter((item) => item !== topic)
        : [...state.selectedTopics, topic]
    })),

  toggleEmotion: (emotion) =>
    set((state) => ({
      selectedEmotions: state.selectedEmotions.includes(emotion)
        ? state.selectedEmotions.filter((item) => item !== emotion)
        : [...state.selectedEmotions, emotion]
    })),

  resetFilters: () =>
    set({ selectedSort: '최신순', selectedTopics: [], selectedEmotions: [] })
}));

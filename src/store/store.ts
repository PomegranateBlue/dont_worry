import { create } from 'zustand';

type UserState = {
  user: string | null;
  setUser: (user: string | null) => void;
};

interface RankingState {
  //통계페이지 타입
  formattedDate: string;
  currentDate: Date;
  year: number;
  month: number;
  week: number;

  initialize: (year: number, month: number, week: number) => void;
  goToPreviousWeek: () => void;
  goToNextWeek: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user })
}));

//통계페이지 스토어
const getWeekOfMonth = (date: Date) => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  return Math.ceil((date.getDate() + firstDay) / 7);
};

const updateFormattedDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const week = getWeekOfMonth(date);
  return `${year}년 ${month}월 ${week}째주`;
};

export const useRankingStore = create<RankingState>((set) => ({
  formattedDate: '',
  currentDate: new Date(),
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  week: getWeekOfMonth(new Date()),

  initialize: (year, month, week) => {
    const date = new Date();
    date.setFullYear(year);
    date.setMonth(month - 1);
    date.setDate((week - 1) * 7 + 1);

    set({
      year,
      month,
      week,
      currentDate: date,
      formattedDate: updateFormattedDate(date)
    });
  },
  goToPreviousWeek: () =>
    set((state) => {
      const newDate = new Date(state.currentDate);
      newDate.setDate(newDate.getDate() - 7);
      return {
        currentDate: newDate,
        formattedDate: updateFormattedDate(newDate),
        year: newDate.getFullYear(),
        month: newDate.getMonth() + 1,
        week: getWeekOfMonth(newDate)
      };
    }),

  goToNextWeek: () =>
    set((state) => {
      const newDate = new Date(state.currentDate);
      newDate.setDate(newDate.getDate() + 7);
      return {
        currentDate: newDate,
        formattedDate: updateFormattedDate(newDate),
        year: newDate.getFullYear(),
        month: newDate.getMonth() + 1,
        week: getWeekOfMonth(newDate)
      };
    })
}));

import { create } from 'zustand';
import dayjs from 'dayjs';

interface MonthlyRankingState {
  formattedDate: string;
  currentDate: dayjs.Dayjs;
  year: number;
  month: number;

  initialize: (year: number, month: number) => void;
}

const updateFormattedDate = (date: dayjs.Dayjs) => {
  const year = date.year();
  const month = date.month() + 1;
  return `${year}년 ${month}월`;
};

// 월 단위 통계페이지 스토어
export const useMRankingStore = create<MonthlyRankingState>((set) => {
  const currentDate = dayjs();

  return {
    formattedDate: updateFormattedDate(currentDate),
    currentDate: currentDate,
    year: currentDate.year(),
    month: currentDate.month() + 1,

    initialize: (year, month) => {
      // 해당 년월의 첫째날로 설정
      const targetDate = dayjs()
        .year(year)
        .month(month - 1)
        .date(1);

      set({
        year,
        month,
        currentDate: targetDate,
        formattedDate: updateFormattedDate(targetDate)
      });
    }
  };
});

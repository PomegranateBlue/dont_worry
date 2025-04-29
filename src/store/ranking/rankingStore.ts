import { create } from 'zustand';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';

// day.js에 필요한 플러그인 추가
dayjs.extend(weekday);
dayjs.extend(weekOfYear);

// mode 타입 정의
type RankingMode = 'month' | 'week';
type ChartMode = 'topic' | 'emotion';

interface RankingState {
  currentDate: dayjs.Dayjs;
  year: number;
  month: number;
  week: number;
  mode: RankingMode;
  chartMode: ChartMode;

  initialize: (year: number, month: number, week: number) => void;
  setMode: (mode: RankingMode) => void;
  setChartMode: (chartMode: ChartMode) => void;
}

// 해당 날짜가 몇 번째 주인지 계산하는 함수
const getWeekOfMonth = (date: dayjs.Dayjs) => {
  const firstDayOfMonth = date.startOf('month');
  const firstDayOfWeek = firstDayOfMonth.startOf('week');

  const offsetDays = firstDayOfMonth.diff(firstDayOfWeek, 'day');
  const dayOfMonth = date.date();

  return Math.ceil((dayOfMonth + offsetDays) / 7);
};

// 통계페이지 스토어
export const useRankingStore = create<RankingState>((set) => {
  const currentDate = dayjs();
  const initialMode: RankingMode = 'month';
  const initialChartMode: ChartMode = 'topic';

  return {
    currentDate,
    year: currentDate.year(),
    month: currentDate.month() + 1,
    week: getWeekOfMonth(currentDate),
    mode: initialMode,
    chartMode: initialChartMode,

    initialize: (year, month, week) => {
      const firstDayOfMonth = dayjs()
        .year(year)
        .month(month - 1)
        .date(1);
      const targetDate = firstDayOfMonth.add((week - 1) * 7, 'day');

      set(() => ({
        year,
        month,
        week,
        currentDate: targetDate
      }));
    },

    setMode: (mode) =>
      set(() => ({
        mode
      })),

    setChartMode: (chartMode: ChartMode) =>
      set(() => ({
        chartMode
      }))
  };
});

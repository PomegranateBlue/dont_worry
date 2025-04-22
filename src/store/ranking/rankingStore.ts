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
  //통계페이지 타입
  formattedDate: string;
  currentDate: dayjs.Dayjs;
  year: number;
  month: number;
  week: number;
  mode: RankingMode; // mode 상태 추가
  chartMode: ChartMode;

  initialize: (year: number, month: number, week: number) => void;
  goToPreviousWeek: () => void;
  goToNextWeek: () => void;
  setMode: (mode: RankingMode) => void; // mode 변경 함수 추가
  setChartMode: (chartMode: ChartMode) => void;
}

// 해당 날짜가 몇 번째 주인지 계산하는 함수
const getWeekOfMonth = (date: dayjs.Dayjs) => {
  const firstDayOfMonth = date.startOf('month');
  const firstDayOfWeek = firstDayOfMonth.startOf('week');

  // 첫째 주에 속하는 월의 일수
  const offsetDays = firstDayOfMonth.diff(firstDayOfWeek, 'day');

  // 현재 날짜가 월의 첫날로부터 몇 일이 지났는지 계산
  const dayOfMonth = date.date();

  // 주차 계산
  return Math.ceil((dayOfMonth + offsetDays) / 7);
};

// 포맷된 날짜 문자열 생성 함수
const updateFormattedDate = (date: dayjs.Dayjs, mode: RankingMode) => {
  const year = date.year();
  const month = date.month() + 1;

  if (mode === 'month') {
    return `${year}년 ${month}월`;
  } else {
    // mode === 'week'
    const week = getWeekOfMonth(date);
    return `${year}년 ${month}월 ${week}째주`;
  }
};

//통계페이지 스토어
export const useRankingStore = create<RankingState>((set) => {
  const currentDate = dayjs();
  const initialMode: RankingMode = 'month'; // 기본 모드 설정
  const initialChartMode: ChartMode = 'topic';

  return {
    formattedDate: updateFormattedDate(currentDate, initialMode),
    currentDate: currentDate,
    year: currentDate.year(),
    month: currentDate.month() + 1,
    week: getWeekOfMonth(currentDate),
    mode: initialMode, // 초기 mode 설정
    chartMode: initialChartMode,

    initialize: (year, month, week) => {
      // 해당 년월의 첫째날로 설정
      const firstDayOfMonth = dayjs()
        .year(year)
        .month(month - 1)
        .date(1);
      // 주차를 계산하여 해당 주의 날짜 설정
      const targetDate = firstDayOfMonth.add((week - 1) * 7, 'day');

      set((state) => ({
        year,
        month,
        week,
        currentDate: targetDate,
        formattedDate: updateFormattedDate(targetDate, state.mode)
      }));
    },

    setMode: (mode) =>
      set((state) => ({
        mode,
        formattedDate: updateFormattedDate(state.currentDate, mode)
      })),

    setChartMode: (chartMode: ChartMode) =>
      set(() => ({
        chartMode
      })),

    goToPreviousWeek: () =>
      set((state) => {
        const newDate = state.currentDate.subtract(7, 'day');
        return {
          currentDate: newDate,
          formattedDate: updateFormattedDate(newDate, state.mode),
          year: newDate.year(),
          month: newDate.month() + 1,
          week: getWeekOfMonth(newDate)
        };
      }),

    goToNextWeek: () =>
      set((state) => {
        const newDate = state.currentDate.add(7, 'day');
        return {
          currentDate: newDate,
          formattedDate: updateFormattedDate(newDate, state.mode),
          year: newDate.year(),
          month: newDate.month() + 1,
          week: getWeekOfMonth(newDate)
        };
      })
  };
});

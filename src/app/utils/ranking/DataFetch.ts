import { NO_ID } from '@/constants/ranking/Line';
import { supabase } from '../supabase/supabase';
import { UserNote } from '@/types/ranking/types';
import {
  ANALYZE_ERROR,
  DATA_FETHCING_ERROR,
  RankingError
} from '@/constants/error/rankingError';
import { getAllCategoryCounts } from './categoryCounter';

//주 단위 데이터를 패칭
export const fetchUserNotes = async (
  year: number,
  month: number,
  week: number,
  id: string | null
) => {
  if (!id) {
    throw new RankingError('NO_USER_INFO');
  }

  try {
    //주차를 시작일과 종료일로 계산 ex) 1년 1월 (주-1)*주 +1
    const startDate = new Date(year, month - 1, (week - 1) * 7 + 1); //그 주의 시작일
    const endDate = new Date(year, month - 1, (week - 1) * 7 + 7); //그 주의 마지막일

    const startDateStr = startDate.toISOString().split('T')[0];
    const endDateStr = endDate.toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('users_note')
      .select('topic_category, emotion_category')
      .gte('created_at', startDateStr) //시작일 부터
      .lte('created_at', endDateStr) //마지막일 까지의 데이터 수집
      .eq('user_id', id);

    if (error) {
      throw new RankingError('CANT_SELECT_USER_WORRIES');
    }

    return data as UserNote[];
  } catch (err) {
    console.error(DATA_FETHCING_ERROR, err);
    throw new RankingError('CANT_SELECT_USER_WORRIES');
  }
};

//월 단위의 데이터를 패칭
export const fetchMonthlyNotes = async (
  year: number,
  month: number,
  id: string | null
) => {
  if (!id) {
    throw new RankingError('NO_USER_INFO');
  }

  try {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const startDateStr = startDate.toISOString().split('T')[0];
    const endDateStr = endDate.toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('users_note')
      .select('topic_category, emotion_category')
      .gte('created_at', startDateStr)
      .lte('created_at', endDateStr)
      .eq('user_id', id);

    if (error) {
      throw new RankingError('CANT_SELECT_USER_WORRIES');
    }

    return data as UserNote[];
  } catch (err) {
    console.error(DATA_FETHCING_ERROR, err);
    throw new RankingError('CANT_SELECT_USER_WORRIES');
  }
};

//전월 대비 빈도수의 변화가 가장 많은 항목 계산
export const analyzeCategoryTrends = async (
  currentYear: number,
  currentMonth: number,
  id: string | null
) => {
  try {
    let prevMonth = currentMonth - 1; //이전 달
    let prevYear = currentYear;
    if (prevMonth === 0) {
      //이전 달이 0인 경우 즉, 연도가 바뀌게 되면 prevYear을 다시 처리
      prevMonth = 12;
      prevYear = currentYear - 1;
    }

    const currentMonthData = await fetchMonthlyNotes(
      //이번 달 유저 정보를 수집
      currentYear,
      currentMonth,
      id
    );
    //저번달 유저 정보를 수집
    const prevMonthData = await fetchMonthlyNotes(prevYear, prevMonth, id);

    //이번 달 카테고리 언급 횟수 수집 (새로운 함수 사용)
    const currentCounts = getAllCategoryCounts(currentMonthData);
    //저번 달 카테고리 언급 횟수 수집 (새로운 함수 사용)
    const prevCounts = getAllCategoryCounts(prevMonthData);

    const changes: Record<
      string,
      {
        change: number;
        percentage: number;
        current: number;
        previous: number;
      }
    > = {};

    const allCategories = new Set<string>([
      ...Object.keys(currentCounts),
      ...Object.keys(prevCounts)
    ]);

    //이번달 - 지난달 = 추이, 추이를 계산해서 가장 변화가 큰 항목을 찾아냄
    allCategories.forEach((category) => {
      const current = currentCounts[category] || 0;
      const previous = prevCounts[category] || 0;
      const change = current - previous;

      let percentage = 0;
      if (previous === 0) {
        percentage = current > 0 ? 100 : 0;
      } else {
        percentage = ((current - previous) / previous) * 100; //각각을 백불율로 계산
      }

      changes[category] = {
        change,
        percentage: Math.round(percentage * 10) / 10,
        current,
        previous
      };
    });

    //변화를 내림차순 정렬
    const sortedChanges = Object.entries(changes).sort(
      (a, b) => b[1].change - a[1].change
    );

    //첫번째 인덱스의 값이 가장 변화가 많은 항목
    const mostIncreased = sortedChanges[0];

    //첫번째 인덱스의 값이 가장 변화가 많은 항목
    const mostDecreased = sortedChanges[sortedChanges.length - 1];

    return {
      mostIncreased: {
        category: mostIncreased[0],
        data: mostIncreased[1]
      },
      mostDecreased: {
        category: mostDecreased[0],
        data: mostDecreased[1]
      },
      allChanges: changes, // 필요시 전체 변화 데이터도 반환
      prevMonthName: `${prevYear}년 ${prevMonth}월`,
      currentMonthName: `${currentYear}년 ${currentMonth}월`
    };
  } catch (err) {
    console.error(ANALYZE_ERROR, err);
    throw new RankingError('CANT_ANALYZE_WORRIES');
  }
};

//주단위
export const analyzeWeeklyCategoryTrends = async (
  currentYear: number,
  currentMonth: number,
  currentWeek: number,
  id: string | null
) => {
  try {
    if (!id) {
      throw new Error(NO_ID);
    }

    // 이전 주 계산
    const prevWeek = currentWeek - 1;
    let prevMonth = currentMonth;
    let prevYear = currentYear;

    // 이전 주가 0이면 이전 달의 마지막 주로 설정
    if (prevWeek === 0) {
      prevMonth = currentMonth - 1;

      // 이전 달이 0이면 이전 년도의 12월로 설정
      if (prevMonth === 0) {
        prevMonth = 12;
        prevYear = currentYear - 1;
      }
    }

    // 현재 주와 이전 주의 데이터 가져오기
    const currentWeekData = await fetchUserNotes(
      currentYear,
      currentMonth,
      currentWeek,
      id
    );
    const prevWeekData = await fetchUserNotes(
      prevYear,
      prevMonth,
      prevWeek,
      id
    );

    // 현재 주와 이전 주의 카테고리별 언급 횟수 집계 (새로운 함수 사용)
    const currentCounts = getAllCategoryCounts(currentWeekData);
    const prevCounts = getAllCategoryCounts(prevWeekData);

    // 모든 카테고리의 변화 계산
    const changes: Record<
      string,
      {
        change: number;
        percentage: number;
        current: number;
        previous: number;
      }
    > = {};

    const allCategories = new Set<string>([
      ...Object.keys(currentCounts),
      ...Object.keys(prevCounts)
    ]);

    allCategories.forEach((category) => {
      const current = currentCounts[category] || 0;
      const previous = prevCounts[category] || 0;
      const change = current - previous;

      let percentage = 0;
      if (previous === 0) {
        percentage = current > 0 ? 100 : 0;
      } else {
        percentage = ((current - previous) / previous) * 100;
      }

      changes[category] = {
        change,
        percentage: Math.round(percentage * 10) / 10,
        current,
        previous
      };
    });

    // 변화량에 따라 정렬
    const sortedChanges = Object.entries(changes).sort(
      (a, b) => b[1].change - a[1].change
    );

    // 데이터가 없는 경우 처리
    if (sortedChanges.length === 0) {
      return {
        mostIncreased: null,
        mostDecreased: null,
        allChanges: changes,
        prevWeekName: `${prevYear}년 ${prevMonth}월 ${prevWeek}주차`,
        currentWeekName: `${currentYear}년 ${currentMonth}월 ${currentWeek}주차`
      };
    }

    const mostIncreased = sortedChanges[0];
    const mostDecreased = sortedChanges[sortedChanges.length - 1];

    return {
      mostIncreased: {
        category: mostIncreased[0],
        data: mostIncreased[1]
      },
      mostDecreased: {
        category: mostDecreased[0],
        data: mostDecreased[1]
      },
      allChanges: changes,
      prevWeekName: `${prevYear}년 ${prevMonth}월 ${prevWeek}주차`,
      currentWeekName: `${currentYear}년 ${currentMonth}월 ${currentWeek}주차`
    };
  } catch (err) {
    console.error('분석 오류:', err);
    throw new RankingError('CANT_ANALYZE_WORRIES');
  }
};

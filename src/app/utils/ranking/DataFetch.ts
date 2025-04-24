import { NO_ID } from '@/constants/ranking/line';
import { supabase } from '../supabase/supabase';
import { UserNote } from '@/types/ranking/types';
import {
  ANALYZE_ERROR,
  DATA_FETHCING_ERROR
} from '@/constants/ranking/errorConstants';

//주 단위 데이터를 패칭
export const fetchUserNotes = async (
  year: number,
  month: number,
  week: number,
  id: string | null
) => {
  if (!id) {
    throw new Error(NO_ID);
  }

  try {
    const startDate = new Date(year, month - 1, (week - 1) * 7 + 1);
    const endDate = new Date(year, month - 1, (week - 1) * 7 + 7);

    const startDateStr = startDate.toISOString().split('T')[0];
    const endDateStr = endDate.toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('users_note')
      .select('topic_category, emotion_category') //todo: 필요한 칼럼 3개만 가져오기 (보안상 이슈가 있을 수 있음 딱 가져올려는것만 가져오는것이 성능상으로도 좋음)
      .gte('created_at', startDateStr)
      .lte('created_at', endDateStr)
      .eq('user_id', id);

    if (error) {
      throw error;
    }

    return data as UserNote[];
  } catch (err) {
    console.error(DATA_FETHCING_ERROR, err);
    throw new Error(DATA_FETHCING_ERROR);
  }
};

//월 단위의 데이터를 패칭
export const fetchMonthlyNotes = async (
  year: number,
  month: number,
  id: string | null
) => {
  if (!id) {
    throw new Error(NO_ID);
  }

  try {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const startDateStr = startDate.toISOString().split('T')[0];
    const endDateStr = endDate.toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('users_note')
      .select('topic_category, emotion_category') //todo: 필요한것만 가져오기
      .gte('created_at', startDateStr)
      .lte('created_at', endDateStr)
      .eq('user_id', id);

    if (error) {
      throw error;
    }

    return data as UserNote[];
  } catch (err) {
    console.error(DATA_FETHCING_ERROR, err);
    throw new Error(DATA_FETHCING_ERROR);
  }
};

const countAllCategoryMentions = (data: UserNote[]) => {
  const counts: Record<string, number> = {};

  data.forEach((note) => {
    // 주제 카테고리 처리
    const topicCategories =
      note.topic_category?.split(',').map((e) => e.trim()) || [];
    // 감정 카테고리 처리
    const emotionCategories =
      note.emotion_category?.split(',').map((e) => e.trim()) || [];

    // 모든 카테고리 합치기
    const allCategories = [...topicCategories, ...emotionCategories];

    allCategories.forEach((category) => {
      if (category) {
        counts[category] = (counts[category] || 0) + 1;
      }
    });
  });

  return counts;
};

export const analyzeCategoryTrends = async (
  currentYear: number,
  currentMonth: number,
  id: string | null
) => {
  try {
    let prevMonth = currentMonth - 1;
    let prevYear = currentYear;
    if (prevMonth === 0) {
      prevMonth = 12;
      prevYear = currentYear - 1;
    }

    const currentMonthData = await fetchMonthlyNotes(
      currentYear,
      currentMonth,
      id
    );
    const prevMonthData = await fetchMonthlyNotes(prevYear, prevMonth, id);

    const currentCounts = countAllCategoryMentions(currentMonthData);
    const prevCounts = countAllCategoryMentions(prevMonthData);

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

    const sortedChanges = Object.entries(changes).sort(
      (a, b) => b[1].change - a[1].change
    );

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
      allChanges: changes, // 필요시 전체 변화 데이터도 반환
      prevMonthName: `${prevYear}년 ${prevMonth}월`,
      currentMonthName: `${currentYear}년 ${currentMonth}월`
    };
  } catch (err) {
    console.error(ANALYZE_ERROR, err);
    throw new Error(ANALYZE_ERROR);
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

    // 카테고리별 언급 횟수 집계 함수
    const countAllCategoryMentions = (data: UserNote[]) => {
      const counts: Record<string, number> = {};

      data.forEach((note) => {
        // 주제 카테고리 처리
        const topicCategories =
          note.topic_category?.split(',').map((e) => e.trim()) || [];
        // 감정 카테고리 처리
        const emotionCategories =
          note.emotion_category?.split(',').map((e) => e.trim()) || [];

        // 모든 카테고리 합치기
        const allCategories = [...topicCategories, ...emotionCategories];

        allCategories.forEach((category) => {
          if (category) {
            counts[category] = (counts[category] || 0) + 1;
          }
        });
      });

      return counts;
    };

    // 현재 주와 이전 주의 카테고리별 언급 횟수 집계
    const currentCounts = countAllCategoryMentions(currentWeekData);
    const prevCounts = countAllCategoryMentions(prevWeekData);

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
      allChanges: changes, // 필요시 전체 변화 데이터도 반환
      prevWeekName: `${prevYear}년 ${prevMonth}월 ${prevWeek}주차`,
      currentWeekName: `${currentYear}년 ${currentMonth}월 ${currentWeek}주차`
    };
  } catch (err) {
    console.error('주간 분석 오류:', err);
    throw new Error('주간 카테고리 변화를 분석하는 중 오류가 발생했습니다.');
  }
};

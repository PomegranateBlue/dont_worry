import { supabase } from '../supabase/supabase';
import { UserNote } from '@/types/ranking/types';

//주 단위 데이터를 패칭
export const fetchUserNotes = async (
  year: number,
  month: number,
  week: number
) => {
  try {
    const startDate = new Date(year, month - 1, (week - 1) * 7 + 1);
    const endDate = new Date(year, month - 1, (week - 1) * 7 + 7);

    const startDateStr = startDate.toISOString().split('T')[0];
    const endDateStr = endDate.toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('users_note')
      .select('*')
      .gte('created_at', startDateStr)
      .lte('created_at', endDateStr);

    if (error) {
      throw error;
    }

    return data as UserNote[];
  } catch (err) {
    console.error('데이터 조회 오류:', err);
    throw new Error('데이터를 불러오는 중 오류가 발생했습니다.');
  }
};

//월 단위의 데이터를 패칭
export const fetchMonthlyNotes = async (year: number, month: number) => {
  try {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const startDateStr = startDate.toISOString().split('T')[0];
    const endDateStr = endDate.toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('users_note')
      .select('*')
      .gte('created_at', startDateStr)
      .lte('created_at', endDateStr);

    if (error) {
      throw error;
    }

    return data as UserNote[];
  } catch (err) {
    console.error('데이터 조회 오류:', err);
    throw new Error('데이터를 불러오는 중 오류가 발생했습니다.');
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
  currentMonth: number
) => {
  try {
    let prevMonth = currentMonth - 1;
    let prevYear = currentYear;
    if (prevMonth === 0) {
      prevMonth = 12;
      prevYear = currentYear - 1;
    }

    const currentMonthData = await fetchMonthlyNotes(currentYear, currentMonth);
    const prevMonthData = await fetchMonthlyNotes(prevYear, prevMonth);

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
    console.error('분석 오류:', err);
    throw new Error('카테고리 변화를 분석하는 중 오류가 발생했습니다.');
  }
};

// 사용 예시:
// useRankginStore에서 year, month를 가져와서 아래 함수에 삽입
// analyzeCategoryTrends(2025, 4).then(result => {
//   console.log(`${result.prevMonthName}에서 ${result.currentMonthName}까지의 변화:`);
//   console.log(`가장 많이 증가한 카테고리: "${result.mostIncreased.category}" (${result.mostIncreased.data.change}회 증가, ${result.mostIncreased.data.percentage}%)`);
//   console.log(`가장 많이 감소한 카테고리: "${result.mostDecreased.category}" (${result.mostDecreased.data.change}회 감소, ${result.mostDecreased.data.percentage}%)`);
// });

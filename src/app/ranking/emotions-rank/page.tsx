'use client';
import {
  countMentionedKeyword,
  makeTopTen
} from '@/app/utils/ranking/RankingFilter';
import { supabase } from '@/app/utils/supabase/supabase';
import EmotionChart from '@/components/ranking/EmotionsChart';
import { useRankingStore } from '@/store/store';
import { UserNote } from '@/types/ranking/types';

import React, { useEffect, useState } from 'react';

const EmotionsRankginPage = () => {
  const { year, month, week } = useRankingStore();
  const [topEmotions, setTopEmotions] = useState<
    { name: string; count: number }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // 해당 주의 시작일과 종료일 계산
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

        if (data && data.length > 0) {
          // `data`가 UserNote[] 타입임을 명시적으로 지정
          const userNotes = data as UserNote[];

          const keywordAnalysis = countMentionedKeyword(userNotes);
          console.log('키워드별 언급 횟수:', keywordAnalysis);

          const result = makeTopTen(userNotes);
          // `makeTopTen`의 반환 값이 `{ topTopics: { name: string; count: number }[] }` 형태여야 함
          setTopEmotions(result.topEmotions);
        } else {
          console.log(`${year}년 ${month}월 ${week}째주 데이터가 없습니다.`);
          setTopEmotions([]);
        }
      } catch (err) {
        console.error('데이터 조회 오류:', err);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [year, month, week]);

  if (isLoading) {
    return <div>데이터를 불러오는 중입니다...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <EmotionChart topEmotions={topEmotions} />
    </div>
  );
};

export default EmotionsRankginPage;

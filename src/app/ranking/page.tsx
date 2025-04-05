'use client';
import React, { useEffect, useState } from 'react';
import {
  makeTopTen,
  countMentionedKeyword
} from '../utils/ranking/RankingFilter';
import TopicChart from '@/components/ranking/TopicChart';
import { useRankingStore } from '@/store/store';
import { supabase } from '../utils/supabase/supabase';
import { UserNote } from '@/types/ranking/types';

const RankingPage = () => {
  const { year, month, week } = useRankingStore();
  const [topTopics, setTopTopics] = useState<{ name: string; count: number }[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

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
          const userNotes = data as UserNote[];

          const keywordAnalysis = countMentionedKeyword(userNotes);
          console.log('키워드별 언급 횟수:', keywordAnalysis);

          const result = makeTopTen(userNotes);

          setTopTopics(result.topTopics);
        } else {
          console.log(`${year}년 ${month}월 ${week}째주 데이터가 없습니다.`);
          setTopTopics([]);
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
      <TopicChart topTopics={topTopics} />
    </div>
  );
};

export default RankingPage;

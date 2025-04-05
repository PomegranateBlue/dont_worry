'use client';
import React, { useEffect, useState } from 'react';
import { makeTopTen } from '@/app/utils/ranking/RankingFilter';
import EmotionChart from '@/components/ranking/EmotionsChart';
import { useRankingStore } from '@/store/store';
import { fetchUserNotes } from '@/app/utils/ranking/DataFetch';

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

        const userNotes = await fetchUserNotes(year, month, week);

        if (userNotes.length > 0) {
          const result = makeTopTen(userNotes);
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

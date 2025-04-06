'use client';
import React, { useEffect, useState } from 'react';
import { makeTopTen } from '../utils/ranking/RankingFilter';
import TopicChart from '@/components/ranking/TopicChart';
import { useRankingStore } from '@/store/store';
import { fetchUserNotes } from '../utils/ranking/DataFetch';
import { Most } from '@/types/ranking/types';
import Report from '@/components/ranking/Report';

const RankingPage = () => {
  const { year, month, week } = useRankingStore();
  const [topTopics, setTopTopics] = useState<{ name: string; count: number }[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [most, setMost] = useState<Most | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const userNotes = await fetchUserNotes(year, month, week);

        if (userNotes.length > 0) {
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

    return () => {
      setMost(null);
    };
  }, [year, month, week]);

  useEffect(() => {
    if (topTopics.length === 0) return;

    const mentionedEmotionPercentege = () => {
      const sortedArr = topTopics.sort((a, b) => b.count - a.count);
      const totalMentions = sortedArr.reduce(
        (total, emotion) => total + emotion.count,
        0
      );
      const emotionsWithPercentage = sortedArr.map((emotion) => ({
        name: emotion.name,
        count: emotion.count,
        percentage: ((emotion.count / totalMentions) * 100).toFixed(2)
      }));

      if (emotionsWithPercentage.length > 0) {
        setMost(emotionsWithPercentage[0]);
      } else {
        setMost(null);
      }
    };

    //todo: 가장 많이 언급된 감정 백분율 뽑아내기

    mentionedEmotionPercentege();
  }, [topTopics]);

  if (isLoading) {
    return <div>데이터를 불러오는 중입니다...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <TopicChart topTopics={topTopics} />
      <Report most={most} />
    </div>
  );
};

export default RankingPage;

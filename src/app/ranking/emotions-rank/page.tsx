'use client';
import React, { useEffect, useState } from 'react';
import { makeTopTen } from '@/app/utils/ranking/RankingFilter';
import EmotionChart from '@/components/ranking/EmotionsChart';
import {
  fetchMonthlyNotes,
  fetchUserNotes
} from '@/app/utils/ranking/DataFetch';
import Report from '@/components/ranking/Report';
import { Most } from '@/types/ranking/types';
import { NO_DATA_CHART } from '@/constants/ranking/Line';
import { useRankingStore } from '@/store/ranking/rankingStore';
import { useUserStore } from '@/store/store';
import { useMRankingStore } from '@/store/ranking/useMRankingStore';

const EmotionsRankginPage = () => {
  const { year, month, week, mode } = useRankingStore();
  const { year: Myear, month: Mmonth } = useMRankingStore();
  const { user } = useUserStore();
  const [topEmotions, setTopEmotions] = useState<
    { name: string; count: number }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [most, setMost] = useState<Most | null>(null);

  useEffect(() => {
    if (mode === 'week') {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const userNotes = await fetchUserNotes(year, month, week, user);

          if (userNotes.length > 0) {
            const result = makeTopTen(userNotes);
            setTopEmotions(result.topEmotions);
          } else {
            console.log(`${year}년 ${month}월 ${week}째주 데이터가 없습니다.`); //todo: del
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
    } else {
      const fetchMonthData = async () => {
        try {
          setIsLoading(true);
          const userNotes = await fetchMonthlyNotes(Myear, Mmonth, user);
          if (userNotes.length > 0) {
            const result = makeTopTen(userNotes);
            setTopEmotions(result.topEmotions);
            console.log(result);
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

      fetchMonthData();
    }

    return () => {
      setMost(null);
    };
  }, [year, month, week, mode, Mmonth, Myear]);

  useEffect(() => {
    if (topEmotions.length === 0) return;

    const mentionedEmotionPercentege = () => {
      const sortedArr = topEmotions.sort((a, b) => b.count - a.count);
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

    mentionedEmotionPercentege();

    return () => {
      setMost(null);
    };
  }, [topEmotions]);

  if (isLoading) {
    return <div>데이터를 불러오는 중입니다...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (topEmotions.length === 0) {
    return <div>{NO_DATA_CHART}</div>;
  }

  return (
    <div>
      <EmotionChart topEmotions={topEmotions} />
      <Report most={most} />
    </div>
  );
};

export default EmotionsRankginPage;

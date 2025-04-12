'use client';

import React, { useEffect, useState } from 'react';
import { makeTopTen } from '../utils/ranking/RankingFilter';
import TopicChart from '@/components/ranking/TopicChart';

import { fetchMonthlyNotes, fetchUserNotes } from '../utils/ranking/DataFetch';
import { Most } from '@/types/ranking/types';
import Report from '@/components/ranking/Report';
import { NO_DATA_CHART } from '@/constants/ranking/Line';
import { useRankingStore } from '@/store/ranking/rankingStore';
import { useUserStore } from '@/store/store';
import { useMRankingStore } from '@/store/ranking/useMRankingStore';
import TopThreeCard from '@/components/ranking/TopThreeCard';
import Solution from '@/components/ranking/Solution';

const RankingPage = () => {
  const { year, month, week } = useRankingStore();
  const { year: Myear, month: Mmonth } = useMRankingStore();
  const { user } = useUserStore();
  const { mode } = useRankingStore();
  const [topTopics, setTopTopics] = useState<{ name: string; count: number }[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [most, setMost] = useState<Most | null>(null);
  const [topThree, setTopThree] = useState<{ name: string; count: number }[]>(
    []
  );

  console.log('user', user); //1 ->정상

  useEffect(() => {
    if (mode === 'week') {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          console.log(user); //2 -> null
          const userNotes = await fetchUserNotes(year, month, week, user);

          if (userNotes.length > 0) {
            const result = makeTopTen(userNotes);
            setTopTopics(result.topTopics);
            const topthree = result.topTopics.slice(0, 3);
            setTopThree(topthree);
          } else {
            console.log(`${year}년 ${month}월 ${week}째주 데이터가 없습니다.`); //todo: del
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
    } else {
      const fetchMonthData = async () => {
        try {
          setIsLoading(true);
          const userNotes = await fetchMonthlyNotes(Myear, Mmonth, user);
          if (userNotes.length > 0) {
            const result = makeTopTen(userNotes);
            setTopTopics(result.topTopics);
            const topthree = result.topTopics.slice(0, 3);
            setTopThree(topthree);
            console.log(result);
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

      fetchMonthData();
    }

    return () => {
      setMost(null);
    };
  }, [year, month, week, mode, Mmonth, Myear]);

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

    mentionedEmotionPercentege();
  }, [topTopics]);

  console.log(topThree);

  if (isLoading) {
    return <div>데이터를 불러오는 중입니다...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (topTopics.length === 0) {
    return <div>{NO_DATA_CHART}</div>;
  }

  return (
    <div>
      <TopicChart topTopics={topTopics} />
      <Report most={most} />
      {topThree.map((e) => {
        return (
          <div key={e.name}>
            <TopThreeCard topThree={e} />
          </div>
        );
      })}
      <Solution topThree={topThree} />
    </div>
  );
};

export default RankingPage;

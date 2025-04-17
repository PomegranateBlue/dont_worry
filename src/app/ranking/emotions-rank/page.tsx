'use client';
import React, { useEffect, useState } from 'react';
import { makeTopTen } from '@/app/utils/ranking/RankingFilter';
import EmotionChart from '@/components/ranking/EmotionsChart';
import {
  fetchMonthlyNotes,
  fetchUserNotes
} from '@/app/utils/ranking/DataFetch';

import { Most } from '@/types/ranking/types';
import { NO_DATA_CHART } from '@/constants/ranking/Line';
import { useRankingStore } from '@/store/ranking/rankingStore';
import { useUserStore } from '@/store/store';
import { useMRankingStore } from '@/store/ranking/useMRankingStore';
import TopThreeCard from '@/components/ranking/TopThreeCard';
import MWreportCard from '@/components/ranking/FusionComp/MWreportCard';
import Solution from '@/components/ranking/Solution';
import FilterMenu from '@/components/ranking/FilterMenu';
import {
  DATA_FETCHING,
  DATA_FETHCING_ERROR
} from '@/constants/ranking/ErrorConstants';
import { WEEK_MODE } from '@/constants/ranking/WeekConstants';
import Report from '@/components/ranking/Report';

const EmotionsRankginPage = () => {
  const { year, month, week, mode } = useRankingStore();
  const { year: Myear, month: Mmonth } = useMRankingStore();
  const { user, hydrated } = useUserStore();
  const [topEmotions, setTopEmotions] = useState<
    { name: string; count: number }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [most, setMost] = useState<Most | null>(null);
  const [topThree, setTopThree] = useState<{ name: string; count: number }[]>(
    []
  );

  useEffect(() => {
    if (!hydrated) return;

    if (mode === WEEK_MODE) {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const userNotes = await fetchUserNotes(year, month, week, user);

          if (userNotes.length > 0) {
            const result = makeTopTen(userNotes);
            setTopEmotions(result.topEmotions);
            const topthree = result.topEmotions.slice(0, 6);
            setTopThree(topthree);
          } else {
            console.log(`${year}년 ${month}월 ${week}째주 데이터가 없습니다.`); //todo: del
            setTopEmotions([]);
          }
        } catch (err) {
          console.error(DATA_FETHCING_ERROR, err);
          setError(DATA_FETHCING_ERROR);
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
            const topthree = result.topEmotions.slice(0, 6);
            setTopThree(topthree);
          } else {
            console.log(`${year}년 ${month}월 ${week}째주 데이터가 없습니다.`);
            setTopEmotions([]);
          }
        } catch (err) {
          console.error(DATA_FETHCING_ERROR, err);
          setError(DATA_FETHCING_ERROR);
        } finally {
          setIsLoading(false);
        }
      };

      fetchMonthData();
    }

    return () => {
      setMost(null);
    };
  }, [year, month, week, mode, Mmonth, Myear, hydrated]);

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
    return <div>{DATA_FETCHING}</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (topEmotions.length === 0) {
    return <div>{NO_DATA_CHART}</div>;
  }

  return (
    <div>
      <div className="flex flex-col items-center py-[20px] pb-[60px] gap-[40px] self-stretch">
        <EmotionChart topEmotions={topEmotions} />
        <Report most={most} />
      </div>
      <div className="flex flex-col items-center px-[20px] py-[40px] gap-[20px] self-stretch bg-backgroundSet-card">
        <FilterMenu />
        <div className="flex flex-col w-full max-w-full gap-[12px]">
          {topThree.map((e) => (
            <div key={e.name}>
              <TopThreeCard topThree={e} />
            </div>
          ))}
        </div>
      </div>
      <MWreportCard />

      <Solution topThree={topThree} />
    </div>
  );
};

export default EmotionsRankginPage;

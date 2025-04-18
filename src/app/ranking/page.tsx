'use client';

import React, { useEffect, useState } from 'react';
import { makeTopTen } from '../utils/ranking/RankingFilter';
import TopicChart from '@/components/ranking/TopicChart';
import EmotionChart from '@/components/ranking/EmotionsChart';

import { fetchMonthlyNotes, fetchUserNotes } from '../utils/ranking/DataFetch';
import { Most } from '@/types/ranking/types';

import { NO_DATA_CHART } from '@/constants/ranking/Line';
import { useRankingStore } from '@/store/ranking/rankingStore';
import { useUserStore } from '@/store/store';
import { useMRankingStore } from '@/store/ranking/useMRankingStore';
import TopThreeCard from '@/components/ranking/TopThreeCard';
import Solution from '@/components/ranking/Solution';
import MWreportCard from '@/components/ranking/FusionComp/MWreportCard';
import FilterMenu from '@/components/ranking/FilterMenu';
import { DATA_FETHCING_ERROR } from '@/constants/ranking/ErrorConstants';
import { WEEK_MODE } from '@/constants/ranking/WeekConstants';
import Report from '@/components/ranking/Report';

const RankingPage = () => {
  const { year, month, week, mode, chartMode } = useRankingStore(); // chartMode 추가
  const { year: Myear, month: Mmonth } = useMRankingStore();
  const { user, hydrated } = useUserStore();

  const [topTopics, setTopTopics] = useState<{ name: string; count: number }[]>(
    []
  );
  const [topEmotions, setTopEmotions] = useState<
    { name: string; count: number }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [most, setMost] = useState<Most | null>(null);
  const [topThreeTopic, setTopThreeTopic] = useState<
    { name: string; count: number }[]
  >([]);

  const [topThreeEmotion, setTopThreeEmotion] = useState<
    { name: string; count: number }[]
  >([]);
  // 데이터 가져오기 로직
  useEffect(() => {
    if (!hydrated) return;

    if (mode === WEEK_MODE) {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const userNotes = await fetchUserNotes(year, month, week, user);

          if (userNotes.length > 0) {
            const result = makeTopTen(userNotes);

            setTopTopics(result.topTopics);
            setTopThreeTopic(result.topTopics.slice(0, 6));

            setTopEmotions(result.topEmotions);
            setTopThreeEmotion(result.topEmotions.slice(0, 6));
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

            // chartMode에 따라 다른 데이터 설정

            setTopTopics(result.topTopics);
            setTopThreeTopic(result.topTopics.slice(0, 6));
            setTopEmotions(result.topEmotions);
            setTopThreeEmotion(result.topEmotions.slice(0, 6));
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
  }, [year, month, week, mode, Mmonth, Myear, hydrated, chartMode]);

  // 백분율 계산 로직 - chartMode에 따라 다른 데이터로 계산
  useEffect(() => {
    // 현재 차트 모드에 맞는 데이터 선택
    const currentData = chartMode === 'topic' ? topTopics : topEmotions;

    if (currentData.length === 0) return;

    const calculatePercentage = () => {
      const sortedArr = [...currentData].sort((a, b) => b.count - a.count);
      const totalMentions = sortedArr.reduce(
        (total, item) => total + item.count,
        0
      );
      const itemsWithPercentage = sortedArr.map((item) => ({
        name: item.name,
        count: item.count,
        percentage: ((item.count / totalMentions) * 100).toFixed(2)
      }));

      if (itemsWithPercentage.length > 0) {
        setMost(itemsWithPercentage[0]);
      } else {
        setMost(null);
      }
    };

    calculatePercentage();
  }, [topTopics, topEmotions, chartMode]);

  // if (isLoading) {
  //   return <div>{DATA_FETCHING}</div>;
  // }

  // if (error) {
  //   return <div>{error}</div>;
  // }

  const currentData = chartMode === 'topic' ? topTopics : topEmotions;
  if (currentData.length === 0) {
    return <div>{NO_DATA_CHART}</div>;
  }

  return (
    <div>
      <div className="flex flex-col items-center py-[20px] pb-[60px] gap-[55px] self-stretch">
        {chartMode === 'topic' ? (
          <TopicChart topTopics={topTopics} />
        ) : (
          <EmotionChart topEmotions={topEmotions} />
        )}
        <Report most={most} />
      </div>

      <div className="flex flex-col items-center px-[20px] py-[40px] gap-[20px] self-stretch bg-backgroundSet-card">
        <FilterMenu />

        {chartMode === 'topic' ? (
          <div className="flex flex-col w-full max-w-full gap-[12px]">
            {topThreeTopic.map((e) => (
              <div key={e.name}>
                <TopThreeCard topThree={e} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col w-full max-w-full gap-[12px]">
            {topThreeEmotion.map((e) => (
              <div key={e.name}>
                <TopThreeCard topThree={e} />
              </div>
            ))}
          </div>
        )}
      </div>
      <MWreportCard />
      {chartMode === 'topic' ? (
        <>
          <Solution topThree={topThreeTopic} />
        </>
      ) : (
        <>
          <Solution topThree={topThreeEmotion} />
        </>
      )}
    </div>
  );
};

export default RankingPage;

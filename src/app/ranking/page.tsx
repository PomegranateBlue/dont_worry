'use client';

import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  Suspense
} from 'react';
import { makeTopSix } from '../utils/ranking/RankingFilter';
import TopicChart from '@/components/ranking/TopicChart';
import EmotionChart from '@/components/ranking/EmotionsChart';
import dynamic from 'next/dynamic';

import { fetchMonthlyNotes, fetchUserNotes } from '../utils/ranking/DataFetch';
import { Most } from '@/types/ranking/types';

import { useRankingStore } from '@/store/ranking/rankingStore';
import { useUserStore } from '@/store/auth/store';
import { useMRankingStore } from '@/store/ranking/useMRankingStore';
import TopSixCard from '@/components/ranking/TopSixCard';
import FilterMenu from '@/components/ranking/FilterMenu';

import Report from '@/components/ranking/Report';

const Solution = dynamic(() => import('@/components/ranking/Solution'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] bg-gray-100 animate-pulse rounded-md" />
  )
});

const MWreportCard = dynamic(
  () => import('@/components/ranking/FusionComp/MWreportCard'),
  {
    loading: () => (
      <div className="w-full h-[200px] bg-gray-100 animate-pulse rounded-md" />
    )
  }
);

import {
  DATA_FETHCING_ERROR,
  RankingError
} from '@/constants/error/rankingError';
import { WEEK_MODE } from '@/constants/ranking/weekConstants';
import NoData from '@/components/ranking/NoData';

const EMPTY_ARRAY: { name: string; count: number }[] = [];

const RankingPage = () => {
  const { year, month, week, mode, chartMode } = useRankingStore();
  const { year: Myear, month: Mmonth } = useMRankingStore();
  const { user, hydrated } = useUserStore();

  const [topTopics, setTopTopics] =
    useState<{ name: string; count: number }[]>(EMPTY_ARRAY);
  const [topEmotions, setTopEmotions] =
    useState<{ name: string; count: number }[]>(EMPTY_ARRAY);

  const [most, setMost] = useState<Most | null>(null);

  // fetchData 함수를 useCallback으로 메모이제이션
  const fetchData = useCallback(async () => {
    if (!hydrated) return;

    try {
      let userNotes;

      if (mode === WEEK_MODE) {
        userNotes = await fetchUserNotes(year, month, week, user);
      } else {
        userNotes = await fetchMonthlyNotes(Myear, Mmonth, user);
      }

      if (userNotes.length > 0) {
        const result = makeTopSix(userNotes);

        setTopTopics(result.topTopics);
        setTopEmotions(result.topEmotions);
      } else {
        setTopTopics(EMPTY_ARRAY);
        setTopEmotions(EMPTY_ARRAY);
      }
    } catch (err) {
      console.error(DATA_FETHCING_ERROR, err);
      throw new RankingError('CANT_SELECT_USER_WORRIES');
    }
  }, [year, month, week, Myear, Mmonth, user, mode, hydrated]);

  useEffect(() => {
    fetchData();
    return () => {
      setMost(null);
    };
  }, [fetchData]);

  // useMemo로 most 계산 - 불필요한 useEffect 제거
  const calculatedMost = useMemo(() => {
    const currentData = chartMode === 'topic' ? topTopics : topEmotions;

    if (currentData.length === 0) return null;

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

    return itemsWithPercentage.length > 0 ? itemsWithPercentage[0] : null;
  }, [topTopics, topEmotions, chartMode]);

  // most 값이 변경될 때만 setMost 호출
  useEffect(() => {
    setMost(calculatedMost);
  }, [calculatedMost]);

  // 메모이제이션된 현재 데이터
  const currentData = useMemo(
    () => (chartMode === 'topic' ? topTopics : topEmotions),
    [chartMode, topTopics, topEmotions]
  );

  if (currentData.length === 0) {
    return (
      <div className="flex w-full max-w-[1280px] flex-col">
        <NoData />
      </div>
    );
  }

  return (
    <div className="bg-backgroundSet-card md:px-[60px] xl:px-10">
      {/*레이아웃 상위*/}
      <div className="xl:flex xl:flex-row xl:bg-backgroundSet-card xl:px-[40px] xl:py-[40px] xl:gap-[40px] xl:items-center xl:justify-center">
        <div className="p-5 xl:p-0 md:p-0">
          <div className="flex flex-col items-center gap-[40px] px-[20px] py-[40px] xl:py-[30px] xl:px-[122px] xl:gap-[24px] self-stretch bg-backgroundSet-normal rounded-[20px] w-full xl:w-[580px] shadow-customCard xl:h-[500px] md:h-[481px]">
            {chartMode === 'topic' ? (
              <TopicChart topTopics={topTopics} />
            ) : (
              <EmotionChart topEmotions={topEmotions} />
            )}
            <Report most={most} />
          </div>
        </div>
        <div className="flex flex-col items-center gap-[20px] px-5 py-10 self-stretch xl:w-full xl:gap-[40px] xl:p-0 xl:max-w-[580px] md:px-0">
          <FilterMenu />

          <div className="flex flex-col w-full xl:w-[580px] gap-[12px] xl:gap-[16px]">
            {currentData.map((e) => (
              <div key={e.name}>
                <TopSixCard topSix={e} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/*레이아웃 상위*/}
      {/*데스크탑 레이아웃 하위*/}
      <div className="xl:flex xl:flex-row xl:pb-[40px] xl:justify-center xl:items-center xl:gap-[40px] xl:w-full xl:bg-backgroundSet-card">
        <div className="p-4 xl:p-0 w-full md:px-0">
          <Suspense
            fallback={
              <div className="w-full h-[200px] bg-gray-100 animate-pulse rounded-md" />
            }
          >
            <MWreportCard />
          </Suspense>
        </div>
        <div className="xl:flex xl:w-full p-4 xl:p-0 xl:max-w-[580px] md:px-0">
          <Suspense
            fallback={
              <div className="w-full h-[300px] bg-gray-100 animate-pulse rounded-md" />
            }
          >
            <Solution topSix={currentData} />
          </Suspense>
        </div>
      </div>
      {/*데스크탑 레이아웃 하위.*/}
    </div>
  );
};

export default RankingPage;

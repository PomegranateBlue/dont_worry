'use client';

import React, { useEffect, useState } from 'react';
import { makeTopTen } from '../utils/ranking/RankingFilter';
import TopicChart from '@/components/ranking/TopicChart';
import EmotionChart from '@/components/ranking/EmotionsChart';

import { fetchMonthlyNotes, fetchUserNotes } from '../utils/ranking/DataFetch';
import { Most } from '@/types/ranking/types';

import { NO_DATA_CHART } from '@/constants/ranking/line';
import { useRankingStore } from '@/store/ranking/rankingStore';
import { useUserStore } from '@/store/auth/store';
import { useMRankingStore } from '@/store/ranking/useMRankingStore';
import TopSixCard from '@/components/ranking/TopSixCard';
import MWreportCard from '@/components/ranking/FusionComp/MWreportCard';
import FilterMenu from '@/components/ranking/FilterMenu';

import Report from '@/components/ranking/Report';
import Solution from '@/components/ranking/Solution';
import { WEEK_MODE } from '@/constants/ranking/weekConstants';
import { DATA_FETHCING_ERROR } from '@/constants/error/rankingError';
import { SUPABASE_ERROR_MESSAGE } from '@/constants/error/supabaseErrorKeys';

const RankingPage = () => {
  const { year, month, week, mode, chartMode } = useRankingStore();
  const { year: Myear, month: Mmonth } = useMRankingStore();
  const { user, hydrated } = useUserStore();

  const [topTopics, setTopTopics] = useState<{ name: string; count: number }[]>(
    []
  );
  const [topEmotions, setTopEmotions] = useState<
    { name: string; count: number }[]
  >([]);

  const [most, setMost] = useState<Most | null>(null);
  const [topSixTopic, setTopSixTopic] = useState<
    { name: string; count: number }[]
  >([]);

  const [topSixEmotion, setTopSixEmotion] = useState<
    { name: string; count: number }[]
  >([]);

  useEffect(() => {
    if (!hydrated) return;

    if (mode === WEEK_MODE) {
      const fetchData = async () => {
        try {
          const userNotes = await fetchUserNotes(year, month, week, user);

          if (userNotes.length > 0) {
            const result = makeTopTen(userNotes);

            setTopTopics(result.topTopics);
            setTopSixTopic(result.topTopics.slice(0, 6));

            setTopEmotions(result.topEmotions);
            setTopSixEmotion(result.topEmotions.slice(0, 6));
          } else {
            setTopTopics([]);
            setTopSixTopic([]);
            setTopEmotions([]);
            setTopSixEmotion([]);
          }
        } catch (err) {
          console.error(DATA_FETHCING_ERROR, err);
          throw new Error(SUPABASE_ERROR_MESSAGE.SUPABASE_FETCH_FAILED.message);
        }
      };

      fetchData();
    } else {
      const fetchMonthData = async () => {
        try {
          const userNotes = await fetchMonthlyNotes(Myear, Mmonth, user);

          if (userNotes.length > 0) {
            const result = makeTopTen(userNotes);

            setTopTopics(result.topTopics);
            setTopSixTopic(result.topTopics.slice(0, 6));
            setTopEmotions(result.topEmotions);
            setTopSixEmotion(result.topEmotions.slice(0, 6));
          } else {
            setTopTopics([]);
            setTopSixTopic([]);
            setTopEmotions([]);
            setTopSixEmotion([]);
          }
        } catch (err) {
          console.error(DATA_FETHCING_ERROR, err);
          throw new Error(SUPABASE_ERROR_MESSAGE.SUPABASE_FETCH_FAILED.message);
        }
      };

      fetchMonthData();
    }

    return () => {
      setMost(null);
    };
  }, [year, month, week, mode, Mmonth, Myear, hydrated, chartMode]);

  useEffect(() => {
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

  const currentData = chartMode === 'topic' ? topTopics : topEmotions;
  if (currentData.length === 0) {
    return <div className="p-4">{NO_DATA_CHART}</div>;
  }

  return (
    <div className="bg-backgroundSet-card md:px-[60px]">
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

          {chartMode === 'topic' ? (
            <div className="flex flex-col w-full xl:w-[580px] gap-[12px] xl:gap-[16px]">
              {topSixTopic.map((e) => (
                <div key={e.name}>
                  <TopSixCard topThree={e} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col w-full xl:w-[580px] gap-[12px] xl:gap-[16px]">
              {topSixEmotion.map((e) => (
                <div key={e.name}>
                  <TopSixCard topThree={e} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/*레이아웃 상위*/}
      {/*데스크탑 레이아웃 하위*/}
      <div className="xl:flex xl:flex-row xl:px-10 xl:pb-[40px] xl:justify-center xl:items-center xl:gap-[40px] xl:w-full xl:bg-backgroundSet-card">
        <div className="p-4 xl:p-0 w-full md:px-0">
          <MWreportCard />
        </div>
        {chartMode === 'topic' ? (
          <div className="xl:flex xl:w-full p-4 xl:p-0 xl:max-w-[580px] md:px-0">
            <Solution topThree={topSixTopic} />
          </div>
        ) : (
          <div className="xl:flex xl:w-full p-4 xl:p-0 xl:max-w-[580px] md:px-0">
            <Solution topThree={topSixEmotion} />
          </div>
        )}
      </div>
      {/*데스크탑 레이아웃 하위.*/}
    </div>
  );
};

export default RankingPage;

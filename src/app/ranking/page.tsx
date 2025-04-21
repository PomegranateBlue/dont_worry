'use client';

import React, { useEffect, useState } from 'react';
import { makeTopTen } from '../utils/ranking/RankingFilter';
import TopicChart from '@/components/ranking/TopicChart';
import EmotionChart from '@/components/ranking/EmotionsChart';

import { fetchMonthlyNotes, fetchUserNotes } from '../utils/ranking/DataFetch';
import { Most } from '@/types/ranking/types';

import { NO_DATA_CHART } from '@/constants/ranking/Line';
import { useRankingStore } from '@/store/ranking/rankingStore';
import { useUserStore } from '@/store/auth/store';
import { useMRankingStore } from '@/store/ranking/useMRankingStore';
import TopThreeCard from '@/components/ranking/TopThreeCard';
import MWreportCard from '@/components/ranking/FusionComp/MWreportCard';
import FilterMenu from '@/components/ranking/FilterMenu';
import { DATA_FETHCING_ERROR } from '@/constants/ranking/ErrorConstants';
import { WEEK_MODE } from '@/constants/ranking/WeekConstants';
import Report from '@/components/ranking/Report';
import Solution from '@/components/ranking/Solution';

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

  const [most, setMost] = useState<Most | null>(null);
  const [topSixTopic, setTopSixTopic] = useState<
    { name: string; count: number }[]
  >([]);

  const [topSixEmotion, setTopSixEmotion] = useState<
    { name: string; count: number }[]
  >([]);
  // 데이터 가져오기 로직
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
          }
        } catch (err) {
          console.error(DATA_FETHCING_ERROR, err);
        }
      };

      fetchData();
    } else {
      const fetchMonthData = async () => {
        try {
          const userNotes = await fetchMonthlyNotes(Myear, Mmonth, user);

          if (userNotes.length > 0) {
            const result = makeTopTen(userNotes);

            // chartMode에 따라 다른 데이터 설정

            setTopTopics(result.topTopics);
            setTopSixTopic(result.topTopics.slice(0, 6));
            setTopEmotions(result.topEmotions);
            setTopSixEmotion(result.topEmotions.slice(0, 6));
          }
        } catch (err) {
          console.error(DATA_FETHCING_ERROR, err);
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

  const currentData = chartMode === 'topic' ? topTopics : topEmotions;
  if (currentData.length === 0) {
    return <div>{NO_DATA_CHART}</div>;
  }

  return (
    <div className="xl:bg-backgroundSet-normal">
      {/*레이아웃 상위*/}
      <div className="xl:flex xl:flex-row xl:bg-backgroundSet-card xl:px-[40px] xl:py-[40px] xl:gap-[80px]">
        <div className="flex flex-col items-center gap-[40px] py-[20px] xl:py-[40px] xl:px-[122px] xl:gap-[12px] self-stretch xl:bg-backgroundSet-normal rounded-[20px]">
          {chartMode === 'topic' ? (
            <TopicChart topTopics={topTopics} />
          ) : (
            <EmotionChart topEmotions={topEmotions} />
          )}
          <Report most={most} />
        </div>

        <div className="flex flex-col items-center gap-[20px] px-5 py-10 self-stretch bg-backgroundSet-card xl:w-full xl:gap-[40px] xl:p-0">
          <FilterMenu />

          {chartMode === 'topic' ? (
            <div className="flex flex-col w-full max-w-full gap-[12px]">
              {topSixTopic.map((e) => (
                <div key={e.name}>
                  <TopThreeCard topThree={e} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col w-full max-w-full gap-[12px]">
              {topSixEmotion.map((e) => (
                <div key={e.name}>
                  <TopThreeCard topThree={e} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/*레이아웃 상위*/}
      {/*데스크탑 레이아웃 하위*/}
      <div className="xl:flex xl:flex-row xl:px-10 xl:py-[60px] xl:justify-center xl:items-center xl:gap-[80px] xl:w-full xl:bg-backgroundSet-card">
        <MWreportCard />
        {chartMode === 'topic' ? (
          <div className="xl:flex xl:w-full">
            <Solution topThree={topSixTopic} />
          </div>
        ) : (
          <div className="xl:flex xl:w-full">
            <Solution topThree={topSixEmotion} />
          </div>
        )}
      </div>
      {/*데스크탑 레이아웃 하위*/}
    </div>
  );
};

export default RankingPage;

'use client';

import React from 'react';
import BetterThing from '../BetterThing';
import WorsenedThing from '../WorsenedThing';
import { useRankingStore } from '@/store/ranking/rankingStore';
import {
  REPORT_TITLE_MONTH,
  REPORT_TITLE_WEEK
} from '@/constants/ranking/Line';
import useAnalysisTrend from '@/hooks/ranking/useAnalysisTrend';
import useAnaylsisTrendWeek from '@/hooks/ranking/useAnaylsisTrendWeek';

const MWreportCard = () => {
  const { year, month, mode, week } = useRankingStore();
  const { data: monthData, loading, error } = useAnalysisTrend(year, month);
  const { data: weekData } = useAnaylsisTrendWeek(year, month, week);
  if (loading) return <div className="p-4">데이터를 불러오는 중...</div>;
  if (error) console.log(error);
  if (!monthData) return;
  if (!weekData) return;

  return (
    <section className="flex flex-col items-center gap-4 p-4 sm:p-5 w-full mx-auto mt-6 sm:mt-10 mb-4 sm:mb-6">
      <div className="flex py-2 justify-start items-center gap-2 self-stretch w-full">
        <div className="text-label-normal text-xl sm:text-2xl font-medium leading-tight w-full">
          {mode === 'week' ? REPORT_TITLE_WEEK : REPORT_TITLE_MONTH}
        </div>
      </div>

      <div className="space-y-4 w-full">
        <BetterThing monthData={monthData} weekData={weekData} />
        <WorsenedThing monthData={monthData} weekData={weekData} />
      </div>
    </section>
  );
};

export default MWreportCard;

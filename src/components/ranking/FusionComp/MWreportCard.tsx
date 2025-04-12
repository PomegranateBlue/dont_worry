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
    <section className="w-full max-w-screen-md mx-auto px-4 mt-10 mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-[3px] border-black inline-block pb-1">
        {mode === 'week' ? REPORT_TITLE_WEEK : REPORT_TITLE_MONTH}
      </h2>

      <div className="space-y-4">
        <BetterThing monthData={monthData} weekData={weekData} />
        <WorsenedThing monthData={monthData} weekData={weekData} />
      </div>
    </section>
  );
};

export default MWreportCard;

'use client';

import React from 'react';
import BetterThing from '../BetterThing';
import WorsenedThing from '../WorsenedThing';
import { useRankingStore } from '@/store/ranking/rankingStore';
import {
  REPORT_TITLE_MONTH,
  REPORT_TITLE_WEEK
} from '@/constants/ranking/Line';

const MWreportCard = () => {
  const { mode } = useRankingStore();
  return (
    <section className="w-full max-w-screen-md mx-auto px-4 mt-10 mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-[3px] border-black inline-block pb-1">
        {mode === 'week' ? REPORT_TITLE_WEEK : REPORT_TITLE_MONTH}
      </h2>

      <div className="space-y-4">
        <BetterThing />
        <WorsenedThing />
      </div>
    </section>
  );
};

export default MWreportCard;

'use client';

import {
  MOST_INCREASE_COMMENT_MONTH,
  MOST_INCREASE_COMMENT_WEEK
} from '@/constants/ranking/Line';
import { useRankingStore } from '@/store/ranking/rankingStore';
import { WorsenedThingProps } from '@/types/ranking/types';

import React from 'react';

const WorsenedThing: React.FC<WorsenedThingProps> = ({
  monthData,
  weekData
}) => {
  const { mode } = useRankingStore();

  const monthBest = monthData?.mostIncreased;
  const weekBest = weekData?.mostIncreased;

  return (
    <>
      {mode === 'week' ? (
        <div className="mx-4 my-6 px-6 py-4 rounded-2xl border border-blue-200 bg-blue-50 text-blue-900 text-base sm:text-lg md:text-xl font-medium text-center shadow-sm">
          {weekBest
            ? `${weekBest.category}${MOST_INCREASE_COMMENT_WEEK}`
            : '데이터가 없습니다'}
        </div>
      ) : (
        <div className="mx-4 my-6 px-6 py-4 rounded-2xl border border-blue-200 bg-blue-50 text-blue-900 text-base sm:text-lg md:text-xl font-medium text-center shadow-sm">
          {monthBest
            ? `${monthBest.category}${MOST_INCREASE_COMMENT_MONTH}`
            : '데이터가 없습니다'}
        </div>
      )}
    </>
  );
};

export default WorsenedThing;

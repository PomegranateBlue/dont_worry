'use client';

import {
  MOST_DECREASE_COMMENT_MONTH,
  MOST_DECREASE_COMMENT_WEEK
} from '@/constants/ranking/Line';
import { useRankingStore } from '@/store/ranking/rankingStore';
import { BetterThingProps } from '@/types/ranking/types';

import React from 'react';

const BetterThing: React.FC<BetterThingProps> = ({ monthData, weekData }) => {
  const { mode } = useRankingStore();
  const monthLowest = monthData?.mostDecreased;
  const weekLowest = weekData?.mostDecreased;

  return (
    <>
      {mode === 'week' ? (
        <div className="flex items-center gap-2 self-stretch p-4 sm:p-6 rounded-2xl bg-mind-slpeum_bg text-label-normal text-base sm:text-lg md:text-xl font-medium shadow-sm">
          {weekLowest ? (
            <div className="w-full">
              <div className="flex flex-col w-full">
                <span className="text-label-normal text-lg sm:text-xl font-semibold leading-tight">
                  {weekLowest.category}
                </span>
                <span className="text-label-normal text-sm sm:text-base font-medium leading-normal">
                  {MOST_DECREASE_COMMENT_WEEK}
                </span>
              </div>
            </div>
          ) : (
            <span className="text-label-normal text-sm sm:text-base font-medium">
              데이터가 없습니다
            </span>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2 self-stretch p-4 sm:p-6 rounded-2xl bg-mind-slpeum_bg text-label-normal text-base sm:text-lg md:text-xl font-medium shadow-sm">
          {monthLowest ? (
            <div className="w-full">
              <div className="flex flex-col w-full">
                <span className="text-label-normal text-lg sm:text-xl font-semibold leading-tight">
                  {monthLowest.category}
                </span>
                <span className="text-label-normal text-sm sm:text-base font-medium leading-normal">
                  {MOST_DECREASE_COMMENT_MONTH}
                </span>
              </div>
            </div>
          ) : (
            <span className="text-label-normal text-sm sm:text-base font-medium">
              데이터가 없습니다
            </span>
          )}
        </div>
      )}
    </>
  );
};

export default BetterThing;

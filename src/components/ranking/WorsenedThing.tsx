'use client';

import { NO_DATA } from '@/constants/ranking/ErrorConstants';
import {
  ABOUT,
  MOST_INCREASE_COMMENT_MONTH,
  MOST_INCREASE_COMMENT_WEEK
} from '@/constants/ranking/Line';
import { WEEK_MODE } from '@/constants/ranking/WeekConstants';
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
      {mode === WEEK_MODE ? (
        <div className="flex w-full whitespace-normal break-words items-center gap-2 self-stretch p-4 sm:p-6 rounded-2xl bg-mind-boolan_bg text-label-normal text-base sm:text-lg md:text-xl font-medium shadow-sm">
          {weekBest ? (
            <div className="w-full">
              <div>
                <span className="text-lg sm:text-xl font-semibold leading-tight">
                  {weekBest.category}
                </span>
                <span className="text-sm sm:text-base font-medium leading-normal">
                  {ABOUT}
                </span>
              </div>
              <div className="text-sm sm:text-base font-medium leading-normal">
                {MOST_INCREASE_COMMENT_WEEK}
              </div>
            </div>
          ) : (
            <span className="text-label-normal text-sm sm:text-base font-medium">
              {NO_DATA}
            </span>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2 self-stretch p-4 sm:p-6 rounded-2xl bg-mind-boolan_bg text-label-normal text-base sm:text-lg md:text-xl font-medium shadow-sm">
          {monthBest ? (
            <div className="w-full">
              <div>
                <span className="text-lg sm:text-xl font-semibold leading-tight">
                  {monthBest.category}
                </span>
                <span className="text-sm sm:text-base font-medium leading-normal">
                  {ABOUT}
                </span>
              </div>
              <div className="text-sm sm:text-base font-medium leading-normal">
                {MOST_INCREASE_COMMENT_MONTH}
              </div>
            </div>
          ) : (
            <span className="text-label-normal text-sm sm:text-base font-medium">
              {NO_DATA}
            </span>
          )}
        </div>
      )}
    </>
  );
};

export default WorsenedThing;

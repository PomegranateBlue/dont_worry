'use client';

import {
  ABOUT,
  MOST_DECREASE_COMMENT_MONTH,
  MOST_DECREASE_COMMENT_WEEK
} from '@/constants/ranking/Line';
import { useRankingStore } from '@/store/ranking/rankingStore';
import { BetterThingProps } from '@/types/ranking/types';

import React from 'react';
import Text from '../common/Text';
import { WEEK_MODE } from '@/constants/ranking/WeekConstants';
import { NO_DATA } from '@/constants/ranking/ErrorConstants';

const BetterThing: React.FC<BetterThingProps> = ({ monthData, weekData }) => {
  const { mode } = useRankingStore();
  const monthLowest = monthData?.mostDecreased;
  const weekLowest = weekData?.mostDecreased;

  return (
    <>
      {mode === WEEK_MODE ? (
        <div className="flex items-center gap-2 self-stretch p-4 rounded-2xl bg-mind-slpeum_bg text-label-normal shadow-sm xl:w-[500px] xl:h-[120px]">
          {weekLowest ? (
            <div className="w-full">
              <div>
                <Text
                  as="span"
                  variant="title2"
                  variant2="title1"
                  color="label-normal"
                >
                  {weekLowest.category}
                </Text>
                <Text
                  as="span"
                  variant="body3"
                  variant2="body2"
                  color="label-normal"
                >
                  {ABOUT}
                </Text>
              </div>
              <Text
                as="span"
                variant="body3"
                variant2="body2"
                color="label-normal"
              >
                {MOST_DECREASE_COMMENT_WEEK}
              </Text>
            </div>
          ) : (
            <span className="text-label-normal text-sm sm:text-base font-medium">
              {NO_DATA}
            </span>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2 self-stretch p-4 rounded-2xl bg-mind-slpeum_bg text-label-normal text-base sm:text-lg md:text-xl font-medium shadow-sm xl:max-w-[500px] xl:h-[120px]">
          {monthLowest ? (
            <div className="w-full">
              <div>
                <Text
                  as="span"
                  variant="title2"
                  variant2="title1"
                  color="label-normal"
                >
                  {monthLowest.category}
                </Text>
                <Text
                  as="span"
                  variant="body3"
                  variant2="body2"
                  color="label-normal"
                >
                  {ABOUT}
                </Text>
              </div>
              <Text
                as="span"
                variant="body3"
                variant2="body2"
                color="label-normal"
              >
                {MOST_DECREASE_COMMENT_MONTH}
              </Text>
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

export default BetterThing;

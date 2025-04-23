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
import Text from '../common/Text';

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
        <div className="flex w-full whitespace-normal break-words items-center gap-2 self-stretch p-4 rounded-2xl bg-mind-boolan_bg text-label-normal text-base sm:text-lg md:text-xl font-medium shadow-sm xl:max-w-[500px] xl:h-[120px]">
          {weekBest ? (
            <div className="w-full">
              <div>
                <Text
                  as="span"
                  variant="title2"
                  variant2="title1"
                  color="label-normal"
                >
                  {weekBest.category}
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
                {MOST_INCREASE_COMMENT_WEEK}
              </Text>
            </div>
          ) : (
            <span className="text-label-normal text-sm sm:text-base font-medium">
              {NO_DATA}
            </span>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2 self-stretch p-4 rounded-2xl bg-mind-boolan_bg text-label-normal text-base sm:text-lg md:text-xl font-medium shadow-sm xl:h-[120px] xl:max-w-[500px]">
          {monthBest ? (
            <div className="w-full">
              <div>
                <Text
                  as="span"
                  variant="title2"
                  variant2="title1"
                  color="label-normal"
                >
                  {monthBest.category}
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
                {MOST_INCREASE_COMMENT_MONTH}
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

export default WorsenedThing;

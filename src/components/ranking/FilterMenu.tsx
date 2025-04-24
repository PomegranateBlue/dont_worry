'use client';

import { motion } from 'framer-motion';
import React from 'react';
import {
  CHART_FILTER_EMOTION,
  CHART_FILTER_TOPIC
} from '@/constants/ranking/line';
import Text from '../common/Text';
import { useRankingStore } from '@/store/ranking/rankingStore';

const FilterMenu = () => {
  const { chartMode, setChartMode } = useRankingStore();
  const isTopic = chartMode === 'topic';
  const isEmotion = chartMode === 'emotion';

  const handleTopicClick = () => {
    setChartMode('topic');
  };

  const handleEmotionClick = () => {
    setChartMode('emotion');
  };

  return (
    <div className="w-full">
      <div className="relative flex rounded-full bg-label-disable overflow-hidden h-[36px] xl:h-[44px]">
        <motion.div
          layout
          layoutId="tabHighlight"
          className="absolute top-0 h-full w-1/2 rounded-full bg-primary-4"
          initial={false}
          animate={{
            left: isEmotion ? '50%' : '0%'
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
        <div className="relative z-10 flex w-full text-sm font-semibold">
          <div className="w-1/2 cursor-pointer" onClick={handleTopicClick}>
            <div
              className={`flex justify-center items-center w-full h-full rounded-full transition-all duration-200 ${
                isTopic ? 'text-backgroundSet-normal' : 'text-label-alternative'
              }`}
            >
              <Text
                variant="body2"
                variant2="body1"
                color={isTopic ? 'white' : 'label-alternative'}
              >
                {CHART_FILTER_TOPIC}
              </Text>
            </div>
          </div>

          <div className="w-1/2 cursor-pointer" onClick={handleEmotionClick}>
            <div
              className={`flex justify-center items-center w-full h-full rounded-full transition-all duration-200 ${
                isEmotion
                  ? 'text-backgroundSet-normal'
                  : 'text-label-alternative'
              }`}
            >
              <Text
                variant="body2"
                variant2="body1"
                color={isEmotion ? 'white' : 'label-alternative'}
              >
                {CHART_FILTER_EMOTION}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterMenu;

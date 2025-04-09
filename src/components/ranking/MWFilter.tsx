'use client';

import { useRankingStore } from '@/store/ranking/rankingStore';
import React from 'react';
import { motion } from 'framer-motion';
import { MONTH, WEEK } from '@/constants/ranking/Line';

const MWFilter = () => {
  const mode = useRankingStore((state) => state.mode);
  const setMode = useRankingStore((state) => state.setMode);

  const handleModeChange = (newMode: 'month' | 'week') => {
    setMode(newMode);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between relative">
        <button
          onClick={() => handleModeChange('month')}
          className="relative flex flex-col items-center justify-center w-1/2 py-4"
        >
          <span
            className={`text-lg font-semibold ${
              mode === 'month' ? 'text-gray-900' : 'text-gray-400'
            }`}
          >
            {MONTH}
          </span>
          {mode === 'month' && (
            <motion.div
              layoutId="underline"
              className="absolute bottom-0 w-full h-1 bg-gray-900"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
        </button>

        <button
          onClick={() => handleModeChange('week')}
          className="relative flex flex-col items-center justify-center w-1/2 py-4"
        >
          <span
            className={`text-lg font-semibold ${
              mode === 'week' ? 'text-gray-900' : 'text-gray-400'
            }`}
          >
            {WEEK}
          </span>
          {mode === 'week' && (
            <motion.div
              layoutId="underline"
              className="absolute bottom-0 w-full h-1 bg-gray-900"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default MWFilter;

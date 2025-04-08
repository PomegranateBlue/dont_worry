'use client';

import { useRankingStore } from '@/store/ranking/rankingStore';
import React from 'react';

const MWFilter = () => {
  const mode = useRankingStore((state) => state.mode);
  const setMode = useRankingStore((state) => state.setMode);

  // 모드 변경 처리 함수
  const handleModeChange = (newMode: 'month' | 'week') => {
    setMode(newMode);
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="flex">
        <button
          onClick={() => handleModeChange('week')}
          className={`px-4 py-2 rounded-l-md text-sm font-medium ${
            mode === 'week'
              ? 'bg-blue-500 text-white'
              : 'bg-white text-blue-500'
          } border border-blue-500 focus:outline-none`}
        >
          주별
        </button>
        <button
          onClick={() => handleModeChange('month')}
          className={`px-4 py-2 rounded-r-md text-sm font-medium ${
            mode === 'month'
              ? 'bg-blue-500 text-white'
              : 'bg-white text-blue-500'
          } border border-blue-500 focus:outline-none`}
        >
          월별
        </button>
      </div>
    </div>
  );
};

export default MWFilter;

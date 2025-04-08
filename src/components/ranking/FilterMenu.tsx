'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import {
  CHART_FILTER_EMOTION,
  CHART_FILTER_TOPIC
} from '@/constants/ranking/Line';

const FilterMenu = () => {
  const pathName = usePathname();
  const isTopic = pathName === '/ranking';
  const isEmotion = pathName === '/ranking/emotions-rank';

  return (
    <div className="w-full px-4 pb-6 bg-white mt-2">
      <div className="flex justify-start gap-3 max-w-screen-md mx-auto">
        <Link href="/ranking">
          <button
            className={`px-4 py-2 text-base font-semibold rounded-xl border transition-colors duration-200
              ${
                isTopic
                  ? 'border-purple-500 text-purple-500'
                  : 'border-gray-200 text-gray-700'
              }`}
          >
            {CHART_FILTER_TOPIC}
          </button>
        </Link>

        <Link href="/ranking/emotions-rank">
          <button
            className={`px-4 py-2 text-base font-semibold rounded-xl border transition-colors duration-200
              ${
                isEmotion
                  ? 'border-purple-500 text-purple-500'
                  : 'border-gray-200 text-gray-700'
              }`}
          >
            {CHART_FILTER_EMOTION}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FilterMenu;

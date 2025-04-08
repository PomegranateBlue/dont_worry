'use client';

import { useMRankingStore } from '@/store/ranking/useMRankingStore';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect } from 'react';

export default function MonthNavigator() {
  const {
    year,
    month,
    formattedDate,
    goToNextMonth,
    goToPreviousMonth,
    initialize
  } = useMRankingStore();

  useEffect(() => {
    initialize(year, month);
  }, [initialize, year, month]);

  return (
    <div>
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex-shrink-0 w-6">
          <button
            onClick={goToPreviousMonth}
            className="text-600 hover:text-black"
            style={{ fontSize: '1.5rem' }}
          >
            <ChevronLeft size={24} />
          </button>
        </div>

        <h1 className="text-xl font-bold text-center">{formattedDate}</h1>

        <div className="flex-shrink-0 w-6">
          <button onClick={goToNextMonth} className="text-600 hover:text-black">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useRankingStore } from '@/store/ranking/rankingStore';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect } from 'react';

export default function WeekNavigator() {
  const {
    formattedDate,
    goToPreviousWeek,
    goToNextWeek,
    initialize,
    year,
    month,
    week
  } = useRankingStore();

  useEffect(() => {
    initialize(year, month, week);
  }, [initialize, year, month, week]);

  return (
    <div>
      <div className="flex items-center justify-between p-4 ">
        <div className="flex-shrink-0 w-6">
          <button
            onClick={goToPreviousWeek}
            className="text-600 hover:text-black"
            style={{ fontSize: '1.5rem' }}
          >
            <ChevronLeft size={24} />
          </button>
        </div>

        <h1 className="text-xl font-bold text-center">{formattedDate}</h1>

        <div className="flex-shrink-0 w-6">
          <button onClick={goToNextWeek} className="text-600 hover:text-black">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

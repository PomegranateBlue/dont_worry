'use client';

import { useRankingStore } from '@/store/store';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect } from 'react';

interface WeekNavigatorClientProps {
  initialYear: number;
  initialMonth: number;
  initialWeek: number;
}

export default function WeekNavigator({
  initialYear,
  initialMonth,
  initialWeek
}: WeekNavigatorClientProps) {
  const { formattedDate, goToPreviousWeek, goToNextWeek, initialize } =
    useRankingStore();

  useEffect(() => {
    initialize(initialYear, initialMonth, initialWeek);
  }, [initialize, initialYear, initialMonth, initialWeek]);

  return (
    <div>
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex-shrink-0 w-6">
          <button
            onClick={goToPreviousWeek}
            className="text-gray-600 hover:text-black"
          >
            <ChevronLeft size={24} />
          </button>
        </div>

        <h1 className="text-xl font-bold text-center">{formattedDate}</h1>

        <div className="flex-shrink-0 w-6">
          <button
            onClick={goToNextWeek}
            className="text-gray-600 hover:text-black"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

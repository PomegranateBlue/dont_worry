'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface WeekNavigatorClientProps {
  initialFormattedDate: string;
  initialYear: number;
  initialMonth: number;
  initialWeek: number;
  // weekData?: any; // 필요한 경우 이 부분도 타입 지정
}

export default function WeekNavigator({
  initialFormattedDate,
  initialYear,
  initialMonth,
  initialWeek
}: WeekNavigatorClientProps) {
  const [formattedDate, setFormattedDate] = useState(initialFormattedDate);
  const [currentDate, setCurrentDate] = useState(() => {
    // 초기 날짜 설정
    const date = new Date();
    date.setFullYear(initialYear);
    date.setMonth(initialMonth - 1);
    // 해당 주차의 대략적인 날짜 설정 (정확한 계산은 필요에 따라 조정)
    date.setDate((initialWeek - 1) * 7 + 1);
    return date;
  });

  // 현재 월의 주차 계산
  const getWeekOfMonth = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return Math.ceil((date.getDate() + firstDay) / 7);
  };

  // 날짜 포맷팅
  const updateFormattedDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const week = getWeekOfMonth(date);
    return `${year}년 ${month}월 ${week}째주`;
  };

  // 이전 주로 이동
  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
    setFormattedDate(updateFormattedDate(newDate));

    // 데이터를 다시 가져오는 로직이 필요할 수 있음
  };

  // 다음 주로 이동
  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
    setFormattedDate(updateFormattedDate(newDate));

    // 데이터를 다시 가져오는 로직이 필요할 수 있음
  };

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

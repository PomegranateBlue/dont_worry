'use client';

import React, { useEffect } from 'react';
import { useRankingStore } from '@/store/ranking/rankingStore';

import dayjs from 'dayjs';
import { useMRankingStore } from '@/store/ranking/useMRankingStore';
import TimeFilter from '../TimeFilter';

const TimeFilterGroup = () => {
  const {
    year,
    month,
    week,
    mode,
    initialize: initWeek,
    setMode
  } = useRankingStore();

  const {
    year: mYear,
    month: mMonth,
    initialize: initMonth
  } = useMRankingStore();

  const currentYear = dayjs().year();
  const yearOptions = Array.from({ length: 7 }, (_, i) => currentYear - 3 + i);
  const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);

  const baseYear = mode === 'week' ? year : mYear;
  const baseMonth = mode === 'week' ? month : mMonth;

  const weekCount =
    dayjs(`${baseYear}-${baseMonth}-01`).endOf('month').week() -
    dayjs(`${baseYear}-${baseMonth}-01`).startOf('month').week() +
    1;

  const weekOptions = [
    '전체',
    ...Array.from({ length: weekCount }, (_, i) => i + 1)
  ];

  // 페이지 최초 로드 시 초기화
  useEffect(() => {
    const now = dayjs();
    const currentYear = now.year();
    const currentMonth = now.month() + 1;
    const firstDayOfMonth = now.startOf('month');
    const offsetDays = firstDayOfMonth.diff(
      firstDayOfMonth.startOf('week'),
      'day'
    );
    const week = Math.ceil((now.date() + offsetDays) / 7);

    initWeek(currentYear, currentMonth, week);
    initMonth(currentYear, currentMonth);
  }, [initWeek, initMonth]);

  // 드롭다운 변경 핸들러
  const handleChange = (
    type: 'year' | 'month' | 'week',
    value: number | string
  ) => {
    if (type === 'week') {
      if (value === '전체') {
        setMode('month');
      } else {
        setMode('week');
        initWeek(baseYear, baseMonth, Number(value));
      }
    } else if (type === 'year') {
      if (mode === 'week') {
        initWeek(Number(value), baseMonth, week);
      } else {
        initMonth(Number(value), baseMonth);
      }
    } else if (type === 'month') {
      if (mode === 'week') {
        initWeek(baseYear, Number(value), week);
      } else {
        initMonth(baseYear, Number(value));
      }
    }
  };

  return (
    <div className="flex justify-center items-center space-x-4 bg-backgroundSet-normal">
      <TimeFilter
        type="year"
        options={yearOptions}
        selected={mode === 'week' ? year : mYear}
        onChange={handleChange}
      />
      <TimeFilter
        type="month"
        options={monthOptions}
        selected={mode === 'week' ? month : mMonth}
        onChange={handleChange}
      />
      <TimeFilter
        type="week"
        options={weekOptions}
        selected={mode === 'week' ? week : '전체'}
        onChange={handleChange}
      />
    </div>
  );
};

export default TimeFilterGroup;

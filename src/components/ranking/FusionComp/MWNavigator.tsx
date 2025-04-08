'use client';

import React from 'react';
import MonthNavigator from '../MonthNavigator';
import WeekNavigator from '../WeekNavigator';
import { useRankingStore } from '@/store/ranking/rankingStore';

const MWNavigator = () => {
  const { mode } = useRankingStore();
  const { year, month, week } = useRankingStore();
  console.log(year, month, week);
  return <div>{mode === 'week' ? <WeekNavigator /> : <MonthNavigator />}</div>;
};

export default MWNavigator;

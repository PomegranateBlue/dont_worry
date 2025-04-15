'use client';

import React from 'react';
import MonthNavigator from '../MonthNavigator';
import WeekNavigator from '../WeekNavigator';
import { useRankingStore } from '@/store/ranking/rankingStore';
//todo: timefilter.tsx완성 후 삭제하기
const MWNavigator = () => {
  const { mode } = useRankingStore();
  const { year, month, week } = useRankingStore();
  console.log(year, month, week);//삭제 예정
  return <div>{mode === 'week' ? <WeekNavigator /> : <MonthNavigator />}</div>;
};

export default MWNavigator;

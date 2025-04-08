'use client';

import { MOST_DECREASE_COMMENT } from '@/constants/ranking/Line';
import useAnalysisTrend from '@/hooks/ranking/useAnalysisTrend';
import { useRankingStore } from '@/store/ranking/rankingStore';

import React from 'react';

const BetterThing = () => {
  const { year, month } = useRankingStore();
  const { data, loading, error } = useAnalysisTrend(year, month);
  if (loading) return <div className="p-4">데이터를 불러오는 중...</div>;
  if (error) console.log(error);
  if (!data) return <div className="p-4">표시할 데이터가 없습니다.</div>;

  const { mostDecreased } = data;

  return (
    <>
      <div>{`${mostDecreased.category + MOST_DECREASE_COMMENT}`}</div>
    </>
  );
};

export default BetterThing;

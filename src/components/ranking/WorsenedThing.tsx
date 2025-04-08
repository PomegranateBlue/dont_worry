'use client';

// import useAnalysisTrend from '@/app/utils/ranking/hooks/useAnalysisTrend';
import useAnalysisTrend from '@/hooks/ranking/useAnalysisTrend';
import { MOST_INCREASE_COMMENT } from '@/constants/ranking/Line';
import { useRankingStore } from '@/store/ranking/rankingStore';

import React from 'react';

const WorsenedThing = () => {
  const { year, month } = useRankingStore();
  const { data, loading, error } = useAnalysisTrend(year, month);
  if (loading) return <div className="p-4">데이터를 불러오는 중...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!data) return <div className="p-4">표시할 데이터가 없습니다.</div>;

  const { mostIncreased } = data;

  return (
    <>
      <div>{`${mostIncreased.category + MOST_INCREASE_COMMENT}`}</div>
    </>
  );
};

export default WorsenedThing;

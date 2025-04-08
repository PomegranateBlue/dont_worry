'use client';

import {
  MOST_INCREASE_COMMENT_MONTH,
  MOST_INCREASE_COMMENT_WEEK
} from '@/constants/ranking/Line';
import useAnalysisTrend from '@/hooks/ranking/useAnalysisTrend';
import { useRankingStore } from '@/store/ranking/rankingStore';

import React from 'react';

const WorsenedThing = () => {
  const { year, month, mode } = useRankingStore();
  const { data, loading, error } = useAnalysisTrend(year, month);
  if (loading) return <div className="p-4">데이터를 불러오는 중...</div>;
  if (error) console.log(error);
  if (!data) return <div className="p-4">표시할 데이터가 없습니다.</div>;

  const { mostIncreased } = data;

  return (
    <>
      {mode === 'week' ? (
        <div className="mx-4 my-6 px-6 py-4 rounded-2xl border border-blue-200 bg-blue-50 text-blue-900 text-base sm:text-lg md:text-xl font-medium text-center shadow-sm">{`${
          mostIncreased.category + MOST_INCREASE_COMMENT_WEEK
        }`}</div>
      ) : (
        <div className="mx-4 my-6 px-6 py-4 rounded-2xl border border-blue-200 bg-blue-50 text-blue-900 text-base sm:text-lg md:text-xl font-medium text-center shadow-sm">{`${
          mostIncreased.category + MOST_INCREASE_COMMENT_MONTH
        }`}</div>
      )}
    </>
  );
};

export default WorsenedThing;

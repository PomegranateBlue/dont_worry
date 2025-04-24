'use client';

import { analyzeCategoryTrends } from '@/app/utils/ranking/DataFetch';
import { RANKING_ERROR_MESSAGE } from '@/constants/error/rankingError';
import { useUserStore } from '@/store/auth/store';
import { AnalysisTrendsResult } from '@/types/ranking/types';
import { useEffect, useState } from 'react';

const useAnalysisTrend = (year: number, month: number) => {
  const [data, setData] = useState<AnalysisTrendsResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>('');
  const { user } = useUserStore();

  useEffect(() => {
    //todo: 날짜가 변할때 리랜더링이 되지 않는 부분 수정 + 월별 로직이 아니라 주별 로직도 추가되어야함
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await analyzeCategoryTrends(year, month, user);
        setData(result);
        setError('');
      } catch (err) {
        setError(RANKING_ERROR_MESSAGE.CANT_ANALYZE_WORRIES.message);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      setData(null);
    };
  }, [year, month]);

  return { data, loading, error };
};

export default useAnalysisTrend;

'use client';

import { analyzeCategoryTrends } from '@/app/utils/ranking/DataFetch';
import { useUserStore } from '@/store/store';
import { AnalysisTrendsResult } from '@/types/ranking/types';
import { useEffect, useState } from 'react';
//월별 추이 top2

const useAnalysisTrend = (year: number, month: number) => {
  const [data, setData] = useState<AnalysisTrendsResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const { user } = useUserStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await analyzeCategoryTrends(year, month, user);
        setData(result);
        setError('');
      } catch (err) {
        setError('데이터를 불러오는중 오류 발생');
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [year, month]);

  return { data, loading, error };
};

export default useAnalysisTrend;

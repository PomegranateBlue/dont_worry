'use client';
import { AnalysisTrendsResult } from '@/types/ranking/types';
import { useEffect, useState } from 'react';
import { analyzeCategoryTrends } from '../DataFetch';

const useAnalysisTrend = (year: number, month: number) => {
  const [data, setData] = useState<AnalysisTrendsResult | null>(null); //todo: 이하 3개 스테이트 커스텀훅 리팩토링
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await analyzeCategoryTrends(year, month);
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

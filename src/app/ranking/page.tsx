'use client';
import Chart from '@/components/ranking/Chart';
import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase/supabase';
import { UsersNote } from '@/types/ranking/types';

const RankingPage = () => {
  const [test, setTest] = useState<UsersNote[]>([]);
  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase.from('users_note').select('*');
      if (error) {
        console.log(error);
      }
      console.log('fetcheddata=>', data);
      setTest(data ?? []);
    };

    getData();
  }, []);

  useEffect(() => {
    console.log('Updated test:', test);
  }, [test]);

  // const { data, error } = await supabase.from('users_note').select('*');   async잊지 말고 붙이세요

  // if (error) {
  //   console.error('Error fetching data:', error);
  //   return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  // }

  // console.log(data); // data가 실제 배열인지 확인
  // const res = JSON.stringify(data); // data를 문자열로 변환
  // console.log('res=>', res);

  return (
    <div>
      <Chart />
    </div>
  );
};

export default RankingPage;

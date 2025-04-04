import Chart from '@/components/ranking/Chart';
import React from 'react';
import { createClient } from '../utils/supabase/server';
import {
  makeTopTen,
  counttMentionedKeyword
} from '../utils/ranking/RankingFilter';

const RankingPage = async () => {
  const serverClient = createClient(); //서버 컴포넌트여서 사용해야함

  const { data: userCategory, error } = await serverClient
    .from('users_note')
    .select('*'); //나중에 아이디랑 날짜로 필터링을 한번더 거쳐야함

  if (error) {
    console.error('Error fetching data:', error);
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }

  if (userCategory && userCategory.length > 0) {
    const keywordAnalysis = countMentionedKeyword(userCategory);
    console.log('키워드별 언급 횟수:', keywordAnalysis);

    const topKeywords = makeTopTen(userCategory);
    console.log('상위 10개 주제:', topKeywords.topTopics);
    console.log('상위 10개 감정:', topKeywords.topEmotions);
  } else {
    console.log('데이터가 없거나 비어있습니다.');
  }

  return (
    <div>
      <Chart />
    </div>
  );
};

export default RankingPage;

// 두 번째 파일 (랭킹 관련 파일)

import { RankingItem, TopTenRanking, UserNote } from '@/types/ranking/types';
import { getKeywordAnalysis } from './categoryCounter';

// countMentionedKeyword 함수는 getKeywordAnalysis로 대체

export const makeTopTen = (userCategory: UserNote[]): TopTenRanking => {
  const { topics, emotions } = getKeywordAnalysis(userCategory);

  //언급된 키워드들 중 가장 상위의 n개의 항목을 정렬
  const topTopics: RankingItem[] = Object.entries(topics)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, count]) => ({ name, count }));

  const topEmotions: RankingItem[] = Object.entries(emotions)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, count]) => ({ name, count }));

  return {
    topTopics,
    topEmotions
  };
};

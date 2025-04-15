import {
  CategoryCounts,
  KeywordAnalysis,
  RankingItem,
  TopTenRanking,
  UserNote
} from '@/types/ranking/types';

export const countMentionedKeyword = (
  //각 키워드별 언급된 횟수를 카운트하는 함수
  userCategory: UserNote[]
): KeywordAnalysis => {
  const topicCounts: CategoryCounts = {};
  const emotionCounts: CategoryCounts = {};

  userCategory.forEach((note) => {
    if (note.topic_category) {
      const topics = note.topic_category.split(/\s*,\s*/);
      topics.forEach((topic) => {
        topicCounts[topic] = (topicCounts[topic] || 0) + 1;
      });
    }

    if (note.emotion_category) {
      const emotions = note.emotion_category.split(/\s*,\s*/);
      emotions.forEach((emotion) => {
        emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;
      });
    }
  });

  return {
    topics: topicCounts,
    emotions: emotionCounts
  };
};

export const makeTopTen = (userCategory: UserNote[]): TopTenRanking => {
  //키워드별 상위 10개의 카테고리를 리턴하는 함수
  const { topics, emotions } = countMentionedKeyword(userCategory);

  const topTopics: RankingItem[] = Object.entries(topics)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6) //차트에 노출 시킬 데이터 수를 줄일거면 여기 참조
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

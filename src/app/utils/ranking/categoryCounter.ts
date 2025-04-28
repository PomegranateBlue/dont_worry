// 공통 유틸리티 파일 (예: utils/categoryCounter.ts)
import {
  UserNote,
  CategoryCounts,
  KeywordAnalysis
} from '@/types/ranking/types';

// 통합된 카테고리 카운팅 함수
export const countCategories = (data: UserNote[]) => {
  const topicCounts: CategoryCounts = {};
  const emotionCounts: CategoryCounts = {};
  const allCounts: Record<string, number> = {};

  data.forEach((note) => {
    // 주제 카테고리 처리
    const topicCategories =
      note.topic_category?.split(/\s*,\s*/).filter(Boolean) || [];

    // 감정 카테고리 처리
    const emotionCategories =
      note.emotion_category?.split(/\s*,\s*/).filter(Boolean) || [];

    // 주제 카테고리 카운팅
    topicCategories.forEach((topic) => {
      topicCounts[topic] = (topicCounts[topic] || 0) + 1;
      allCounts[topic] = (allCounts[topic] || 0) + 1;
    });

    // 감정 카테고리 카운팅
    emotionCategories.forEach((emotion) => {
      emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;
      allCounts[emotion] = (allCounts[emotion] || 0) + 1;
    });
  });

  return {
    topics: topicCounts,
    emotions: emotionCounts,
    all: allCounts
  };
};

// 키워드 분석용 함수 (분리된 결과만 필요할 때)
export const getKeywordAnalysis = (data: UserNote[]): KeywordAnalysis => {
  const { topics, emotions } = countCategories(data);
  return { topics, emotions };
};

// 모든 카테고리(주제+감정)의 언급 횟수만 필요할 때
export const getAllCategoryCounts = (
  data: UserNote[]
): Record<string, number> => {
  return countCategories(data).all;
};

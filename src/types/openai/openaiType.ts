import {
  TOPIC_CATEGORIES,
  EMOTION_CATEGORIES
} from '@/constants/openai/category';

export type TopicTypes = (typeof TOPIC_CATEGORIES)[number];
export type EmotionTypes = (typeof EMOTION_CATEGORIES)[number];
//카테고리 상수에 있는 값들만 사용하기 위한 타입 정의의

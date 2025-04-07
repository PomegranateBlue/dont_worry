import { SupabaseClient } from '@supabase/supabase-js';
import { Database, Tables } from '../../../database.types';

export type UsersNote = Tables<'users_note'>;
export type UserStatistice = Tables<'user_statistics'>;

export type Supabse = SupabaseClient<Database>;

export interface UserNote {
  created_at: string;
  content: string;
  note_img: string | null;
  note_id: string;
  id: string;
  topic_category: string;
  emotion_category: string;
}

// 언급 횟수를 저장하는 카운트 객체 타입
export interface CategoryCounts {
  [key: string]: number;
}

// 키워드 분석 결과 타입
export interface KeywordAnalysis {
  topics: CategoryCounts;
  emotions: CategoryCounts;
}

// 랭킹 데이터 항목 타입
export interface RankingItem {
  name: string;
  count: number;
}

// Top 10 랭킹 결과 타입
export interface TopTenRanking {
  topTopics: RankingItem[];
  topEmotions: RankingItem[];
}

//가장 많이 언급된 키워드 타입
export interface Most {
  name: string;
  count: number;
  percentage: string;
}

export interface CategoryChangeData {
  change: number;
  percentage: number;
  current: number;
  previous: number;
}

export interface CategoryResult {
  category: string;
  data: CategoryChangeData;
}

export interface AnalysisTrendsResult {
  mostIncreased: CategoryResult;
  mostDecreased: CategoryResult;
  allChanges: Record<string, CategoryChangeData>;
  prevMonthName: string;
  currentMonthName: string;
}

import { Database } from '@/types/supabase/supabase';
import { supabase } from './supabase';

// 데이터베이스 타입 정의
type Tables = Database['public']['Tables']; // Tables<'letters'>
type User = Tables['users']['Row'];
export type UserUpdate = Pick<User, 'email' | 'nickname' | 'profile_img'>;

// 사용자 정보 가져오기
export const fetchUserInfo = async (userId: string | null | undefined) => {
  if (!userId) return null;

  try {
    const { data, error } = await supabase
      .from('users')
      .select('email, nickname, profile_img, user_id')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data as Pick<User, 'email' | 'nickname' | 'profile_img' | 'user_id'>;
  } catch (error) {
    console.error('사용자 정보 조회 실패:', error);

    throw new Error('사용자 정보를 불러오는 중 문제가 발생했습니다.');
  }
};

// 사용자의 미래 편지 목록 가져오기
export const fetchUserLetters = async (userId: string | null | undefined) => {
  if (userId === null || userId === undefined) {
    return [];
  }

  const { data, error } = await supabase
    .from('letter')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data || [];
};

// 사용자 정보 업데이트하기
export const updateUserInfo = async (
  userId: string | null | undefined,
  updates: Partial<UserUpdate>
): Promise<Pick<User, 'email' | 'nickname' | 'profile_img'> | null> => {
  if (userId === null || userId === undefined) {
    return null;
  }

  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('user_id', userId)
    .select('email, nickname, profile_img')
    .single();

  if (error) throw new Error(error.message);
  return data as Pick<User, 'email' | 'nickname' | 'profile_img'>;
};

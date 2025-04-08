import { supabase } from './supabase';
import browserClient from './client';
import { Database } from '../../../../database.types';

// 데이터베이스 타입 정의
type Tables = Database['public']['Tables']; // Tables<'letters'>
type User = Tables['users']['Row'];
export type UserUpdate = Pick<User, 'email' | 'nickname' | 'profile_img'>;

// 사용자 정보 가져오기
export const fetchUserInfo = async (userId: string | null | undefined) => {
  if (!userId) return null;
  console.log('db.ts$$$$$$$', userId);

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

export const fetchUser = async () => {
  const { data, error } = await browserClient.auth.getUser();
  console.log('data***:', data);
  if (error) {
    console.log('오류!!', '사용자 정보를 가져오는 중 에러가 발생했습니다.');
    throw new Error('사용자 정보를 가져오는 중 에러가 발생했습니다');
  } else {
    return data.user?.id;
  }
};

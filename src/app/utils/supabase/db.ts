import { supabase } from './supabase';

// 사용자의 미래 편지 목록 가져오기
export const fetchUserLetters = async (userId: string | undefined) => {
  const { data, error } = await supabase
    .from('letter')
    .select('*')
    .eq('id', userId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

// 사용자 닉네임 가져오기
export const fetchUserNickname = async (userId: string | undefined) => {
  const { data, error } = await supabase
    .from('user')
    .select('nickname')
    .eq('id', userId)
    .single();
  if (error) {
    console.error('유저 닉네임 조회 에러:', error.message);
    return null;
  }
  return data?.nickname;
};

// 사용자 프로필 사진 수정

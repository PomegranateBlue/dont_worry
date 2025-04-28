import { supabase } from './supabase';
import browserClient from './client';
import { Database } from '../../../../database.types';

// 데이터베이스 타입 정의
type User = Database['public']['Tables']['users']['Row'];
export type UserUpdate = Pick<
  User,
  'email' | 'nickname' | 'profile_img' | 'is_deleted'
>;

// 사용자 정보 가져오기
export const fetchUserInfo = async (userId: string | null | undefined) => {
  if (!userId) return null;

  try {
    const { data, error } = await supabase
      .from('users')
      .select('email, nickname, profile_img, user_id, is_deleted')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data as Pick<
      User,
      'email' | 'nickname' | 'profile_img' | 'user_id' | 'is_deleted'
    >;
  } catch (error) {
    console.error('사용자 정보 조회 실패:', error);

    throw new Error('사용자 정보를 불러오는 중 문제가 발생했습니다.');
  }
};

// 사용자가 작성한 미래 편지 저장하기
export const saveLetter = async (
  userId: string | null,
  content: string,
  sendAt: string,
  imgUrl: string = ''
) => {
  if (!userId) return null;

  const { data, error } = await browserClient
    .from('letter')
    .insert([
      {
        user_id: userId,
        content,
        send_at: sendAt,
        img_url: imgUrl,
        isSent: false
      }
    ])
    .select();

  if (error) {
    console.error('편지 저장 실패:', error);
    throw new Error('편지를 저장하는 중 문제가 발생했습니다.');
  }

  return data;
};

// 사용자의 미래 편지 목록 가져오기
export const fetchUserLetters = async (
  userId: string | null | undefined,
  selectedFilter: string | null
) => {
  if (!userId) {
    return [];
  }

  const sortColumn = selectedFilter === '도착일순' ? 'send_at' : 'created_at';

  const { data, error } = await supabase
    .from('letter')
    .select('*')
    .eq('user_id', userId)
    .order(sortColumn, { ascending: false });

  if (error) throw new Error(error.message);
  return data || [];
};

// 사용자가 작성한 미래 편지 삭제하기
export const deleteLetters = async (userId: string, letterIds: string[]) => {
  const { error } = await browserClient
    .from('letter')
    .delete()
    .in('letter_id', letterIds);

  if (error) throw new Error(error.message);
};

// 사용자 정보 업데이트하기
export const updateUserInfo = async (
  userId: string | null | undefined,
  updates: Partial<UserUpdate>
): Promise<Pick<
  User,
  'email' | 'nickname' | 'profile_img' | 'is_deleted'
> | null> => {
  if (userId === null || userId === undefined) {
    return null;
  }

  const { data, error } = await browserClient
    .from('users')
    .update(updates)
    .eq('user_id', userId)
    .select('email, nickname, profile_img, is_deleted')
    .single();

  if (error) throw new Error(error.message);
  return data as Pick<
    User,
    'email' | 'nickname' | 'profile_img' | 'is_deleted'
  >;
};

//로그인 유저 ID
export const fetchUser = async () => {
  const { data, error } = await browserClient.auth.getUser();
  if (error) {
    console.log('오류!!', '사용자 정보를 가져오는 중 에러가 발생했습니다.');
    throw new Error('사용자 정보를 가져오는 중 에러가 발생했습니다');
  } else {
    return data.user?.id;
  }
};

// 사용자 걱정 보관함
export const fetchUserWorries = async (userId: string | null | undefined) => {
  if (userId === null || userId === undefined) {
    return [];
  }

  const { data, error } = await supabase
    .from('users_note')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data || [];
};

//이미지 업로드
export const uploadProfileImage = async (file: File, userId: string | null) => {
  const fileName = `${userId}_${Date.now()}.png`;
  const filePath = `profile-images/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('image')
    .upload(filePath, file, { upsert: false });

  if (uploadError)
    throw new Error('이미지 업로드 실패: ' + uploadError.message);

  const { data } = supabase.storage.from('image').getPublicUrl(filePath);
  return data.publicUrl;
};

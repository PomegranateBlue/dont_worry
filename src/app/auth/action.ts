'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/app/utils/supabase/server';

interface ErrorFormState {
  error: string | null;
  success: boolean;
}

const errorMessages: Record<string, string> = {
  'Invalid login credentials': '이메일 또는 비밀번호가 올바르지 않습니다.',
  'User already registered': '이미 가입된 이메일 주소입니다.',
  'Email not confirmed':
    '이메일 인증이 완료되지 않았습니다. 이메일을 확인해주세요.',
  'Too many requests': '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.',
  'Auth session missing': '인증 세션이 누락되었습니다. 다시 로그인해주세요.',
  'Database error':
    '데이터베이스 오류가 발생했습니다. 나중에 다시 시도해주세요.',
  'For security purposes, you can only request this after a certain amount of time has passed since you last signed up':
    '보안상 회원가입 후 일정 시간이 지나야 다시 시도할 수 있습니다.',
  'Password should be at least 6 characters':
    '비밀번호는 최소 6자 이상이어야 합니다.',
  'Weak password':
    '비밀번호가 너무 약합니다. 더 강력한 비밀번호를 사용해주세요.',
  'Email rate limit exceeded':
    '이메일 인증 요청이 너무 많습니다. 잠시 후 다시 시도해주세요.',
  'Unable to validate token':
    '인증 토큰 검증에 실패했습니다. 다시 시도해주세요.',
  'Network error': '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.',
  default: '알 수 없는 오류가 발생했습니다. 다시 시도해주세요.'
};

const getKoreanErrorMessage = (
  errorMessage: string | null | undefined
): string => {
  if (!errorMessage) return errorMessages.default;
  return errorMessages[errorMessage] || errorMessages.default;
};

export async function login(
  prevState: ErrorFormState,
  formData: FormData
): Promise<ErrorFormState> {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string
  };

  const { error, data: authData } = await supabase.auth.signInWithPassword(
    data
  );

  if (error || !authData?.user) {
    const errorMessage = getKoreanErrorMessage(error?.message);
    return { error: errorMessage, success: false };
    // redirect('/error');
  }

  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('is_deleted')
    .eq('user_id', authData.user.id)
    .single();

  if (userError || userData?.is_deleted) {
    await supabase.auth.signOut();
    return {
      error: '탈퇴한 회원입니다. 로그인할 수 없습니다.',
      success: false
    };
  }

  revalidatePath('/', 'layout');
  // redirect('/');
  return { success: true, error: null };
}

export async function signup(
  prevState: ErrorFormState,
  formData: FormData
): Promise<ErrorFormState> {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const fullName = formData.get('fullName') as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName }
    }
  });

  if (error) {
    const errorMessage = getKoreanErrorMessage(error.message);
    return { error: errorMessage, success: false };
    // redirect('/error');
  }

  //로그인페이지로
  revalidatePath('/', 'layout');
  redirect('/auth/login');
}

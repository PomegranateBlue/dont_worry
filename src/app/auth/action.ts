'use server';

import { revalidatePath } from 'next/cache';
// import { redirect } from 'next/navigation';
import { createClient } from '@/app/utils/supabase/server';
import {
  SUPABASE_ERROR_TO_KEY,
  isLoginErrorResponse,
  LoginErrorMessageType
} from '@/constants/error/loginError';

interface ErrorFormState {
  error: string | null;
  action?: string | null;
  success: boolean;
}

export async function login(
  prevState: ErrorFormState,
  formData: FormData
): Promise<ErrorFormState> {
  const supabase = await createClient();

  // 폼 데이터 가져오기
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string
  };

  try {
    // 로그인 시도
    const { error, data: authData } = await supabase.auth.signInWithPassword(
      data
    );

    // 로그인 오류 처리
    if (error) {
      // Supabase 에러 메시지를 우리 시스템의 에러 키로 변환
      const errorKey = SUPABASE_ERROR_TO_KEY[error.message] || 'UNKNOWN';
      // 에러 응답 객체 생성
      const errorResponse = isLoginErrorResponse(
        errorKey as LoginErrorMessageType
      );
      return {
        error: errorResponse.error,
        action: errorResponse.action,
        success: false
      };
    }

    // 인증은 성공했지만 사용자가 없는 경우
    if (!authData?.user) {
      const errorResponse = isLoginErrorResponse('USER_NOT_FOUND');
      return {
        error: errorResponse.error,
        action: errorResponse.action,
        success: false
      };
    }

    // 탈퇴한 사용자인지 확인
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('is_deleted')
      .eq('user_id', authData.user.id)
      .single();

    if (userError) {
      const errorResponse = isLoginErrorResponse('DATABASE_ERROR');
      return {
        error: errorResponse.error,
        action: errorResponse.action,
        success: false
      };
    }

    // 탈퇴한 사용자인 경우
    if (userData?.is_deleted) {
      await supabase.auth.signOut();
      return {
        error: '탈퇴한 회원입니다. 로그인할 수 없습니다.',
        action: '다른 계정으로 로그인하거나 새로 가입해주세요.',
        success: false
      };
    }

    // 로그인 성공
    revalidatePath('/', 'layout');
    // 필요시 리다이렉션 활성화
    // redirect('/');
    return { success: true, error: null };
  } catch (e) {
    // 예상치 못한 오류 처리
    console.error('로그인 중 예상치 못한 오류 발생:', e);
    const errorResponse = isLoginErrorResponse('UNKNOWN');
    return {
      error: errorResponse.error,
      action: errorResponse.action,
      success: false
    };
  }
}

export async function signup(
  prevState: ErrorFormState,
  formData: FormData
): Promise<ErrorFormState> {
  const supabase = await createClient();

  // 폼 데이터 가져오기
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const fullName = formData.get('fullName') as string;

  try {
    // 회원가입 시도
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName }
      }
    });

    // 회원가입 오류 처리
    if (error) {
      // Supabase 에러 메시지를 우리 시스템의 에러 키로 변환
      const errorKey = SUPABASE_ERROR_TO_KEY[error.message] || 'UNKNOWN';
      // 에러 응답 객체 생성
      const errorResponse = isLoginErrorResponse(
        errorKey as LoginErrorMessageType
      );
      return {
        error: errorResponse.error,
        action: errorResponse.action,
        success: false
      };
    }

    // 회원가입 성공
    revalidatePath('/', 'layout');
    // redirect('/auth/login');
    return { success: true, error: null };
  } catch (e) {
    // 예상치 못한 오류 처리
    console.error('회원가입 중 예상치 못한 오류 발생:', e);
    const errorResponse = isLoginErrorResponse('UNKNOWN');
    return {
      error: errorResponse.error,
      action: errorResponse.action,
      success: false
    };
  }
}

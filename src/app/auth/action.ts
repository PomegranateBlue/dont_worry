'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/app/utils/supabase/server';

interface ErrorFormState {
  error: string | null;
}

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

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: '이메일 또는 비밀번호가 틀렸습니다' };
    // redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

// export async function logout(
//   prevState:ErrorFormState,
//   formData
// )

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
    console.log(error);
    redirect('/error');
  }

  //로그인페이지로
  revalidatePath('/', 'layout');
  redirect('/auth/login');
}

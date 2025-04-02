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
    return { error: '이메일 또는 미밀번호가 틀렸습니다' };
    // redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signup(
  prevState: ErrorFormState,
  formData: FormData
): Promise<ErrorFormState> {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    nickname: formData.get('nickname') as string
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

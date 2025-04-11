'use client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { login } from '../action';
import { useForm } from 'react-hook-form';
import { useFormState } from 'react-dom';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/store';
import { useEffect } from 'react';
import { fetchUser } from '@/app/utils/supabase/db';

const initialState = { success: false, error: null };

const schema = z.object({
  email: z
    .string()
    .email('이메일 형식이 아닙니다.')
    .nonempty('이메일을 입력하세요'),
  password: z.string().nonempty('비밀번호를 입력하세요')
});

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useUserStore();
  const {
    register,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const [state, formAction] = useFormState(login, initialState);

  useEffect(() => {
    const afterLogin = async () => {
      if (state.success) {
        try {//state변경을 위해 useEffect를 사용하는것은 좋지 않음(안티 패턴임)
          const data = await fetchUser();
          setUser(data);
          console.log('$$$DATA:', data);
          router.push('/');
        } catch (error) {
          console.error('유저 정보 불러오기 실패:', error);
        }
      }
    };
    afterLogin();
  }, [state.success]); // success 상태 변화에만 반응

  return (
    <>
      <form action={formAction}>
        <label>
          Email:
          <input
            {...register('email')}
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
          />
        </label>
        {errors.email && <span>{errors.email.message}</span>}
        <label>
          Password:
          <input
            {...register('password')}
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </label>
        {errors.password && <span>{errors.password.message}</span>}
        {state.error && <p>{state.error}</p>}
        <button type="submit">Log in</button>
      </form>
      <Link href="/auth/signup">회원가입하러가기</Link>
    </>
  );
}

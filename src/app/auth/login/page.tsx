'use client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { login } from '../action';
import { useForm } from 'react-hook-form';
import { useFormState } from 'react-dom';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/store';
import { useUserData } from '@/hooks/useMyPageQueries';

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
  const { data: user } = useUserData();
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
  if (state.success) {
    console.log(state);
    setUser(user!);
    console.log(user);
    router.push('/');
  }

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

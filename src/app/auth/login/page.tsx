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
import Image from 'next/image';

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
      <h2 className="m-4 text-center font-semibold text-xl">로그인</h2>
      <form
        action={formAction}
        className="space-y-2 border-b border-b[#E0E0E2] pb-6"
      >
        <div>
          <label>
            <span className="font-semibold">이메일</span>
            <input
              {...register('email')}
              type="email"
              name="email"
              id="email"
              placeholder="ex)abc@email.com"
              required
              className={`w-full p-4 border-b-[1px] focus:outline-none ${
                errors.email ? 'border-b-red-500' : 'border-b-[#D6D6D6]'
              }`}
            />
            {errors.email && (
              <p className="text-red-500 mt-1">{errors.email.message}</p>
            )}
          </label>
        </div>
        <div>
          <label>
            <span className="font-semibold">비밀번호</span>
            <input
              {...register('password')}
              type="password"
              name="password"
              placeholder="비밀번호 입력"
              required
              className={`w-full p-4 border-b-[1px] focus:outline-none ${
                errors.password ? 'border-b-red-500' : 'border-b-[#D6D6D6]'
              }`}
            />
            {errors.password ? (
              <p className="text-red-500 mt-1">{errors.password.message}</p>
            ) : (
              <p className="text-[#A3A3A3] text-sm mt-1">
                영문 및 숫자, 12자 이내
              </p>
            )}
          </label>
        </div>

        {state.error && <p>{state.error}</p>}

        <button
          type="submit"
          className="w-full bg-[#8573C9] p-3 rounded-md !mt-10 text-white text-lg font-medium"
        >
          로그인
        </button>
      </form>
      <div className="mt-10">
        <p className="text-lg text-center">소셜 계정으로 로그인</p>
        <div className="flex flex-wrap mx-auto w-fit space-x-9 m-8">
          <Image
            src="/images/login-kakao.svg"
            width={56}
            height={56}
            alt="login-kakao"
            priority
          />
          <Image
            src="/images/login-naver.svg"
            width={56}
            height={56}
            alt="login-naver"
            priority
          />
          <Image
            src="/images/login-google.svg"
            width={56}
            height={56}
            alt="login-google"
            priority
          />
        </div>
      </div>
      <Link
        href="/auth/signup"
        className="text-center mx-auto w-fit block underline"
      >
        회원가입
      </Link>
    </>
  );
}

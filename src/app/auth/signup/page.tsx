'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { signup } from '../action';

const initialState = { success: false, error: null };

const schema = z.object({
  email: z
    .string()
    .email('이메일 형식이 아닙니다.')
    .nonempty('이메일을 입력하세요'),
  password: z.string().nonempty('비밀번호를 입력하세요'),
  fullName: z.string().nonempty('닉네임을 입력해주세요')
});

const SignupPage = () => {
  const {
    register,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      fullName: ''
    }
  });
  const [state, formAction] = useFormState(signup, initialState);

  return (
    <>
      <h2 className="m-4 text-center font-semibold">회원가입</h2>
      <form action={formAction} className="space-y-2">
        <div>
          <label>
            <span className="font-semibold">닉네임</span>
            <input
              {...register('fullName')}
              type="text"
              name="fullName"
              placeholder="닉네임"
              required
              className="w-full p-4 border-b-[1px] border-b-[#D6D6D6]"
            />
            {errors.fullName && (
              <p className="text-red-500 mt-1">{errors.fullName.message}</p>
            )}
          </label>
        </div>
        <div>
          <label>
            <span className="font-semibold">이메일</span>
            <input
              {...register('email')}
              type="email"
              name="email"
              placeholder="ex)abc@email.com"
              required
              className="w-full p-4 border-b-[1px] border-b-[#D6D6D6]"
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
              placeholder="비밀번호"
              required
              className="w-full p-4 border-b-[1px] border-b-[#D6D6D6]"
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
          className="w-full bg-black p-3 rounded-sm !mt-10 text-white"
        >
          회원가입
        </button>
      </form>
      <Link href="/auth/login" className="mx-auto mt-4 block w-fit">
        이미 계정이 있어요
      </Link>
    </>
  );
};

export default SignupPage;

'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { signup } from '../action';

const initialState = { error: null };

const schema = z.object({
  email: z
    .string()
    .email('이메일 형식이 아닙니다.')
    .nonempty('이메일을 입력하세요'),
  password: z.string().nonempty('비밀번호를 입력하세요'),
  nickname: z.string().nonempty('닉네임을 입력해주세요')
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
      nickname: ''
    }
  });
  const [state, formAction] = useFormState(signup, initialState);

  return (
    <div>
      <form
        action={formAction}
        className="flex flex-col gap-4 p-4 shadow-md rounded-md w-[500px]"
      >
        <label>
          이메일
          <input
            {...register('email')}
            type="email"
            name="email"
            placeholder="이메일"
            required
          />
          {errors.email && <p>{errors.email.message}</p>}
        </label>
        <label>
          비밀번호
          <input
            {...register('password')}
            type="password"
            name="password"
            placeholder="비밀번호"
            required
          />
          {errors.password && <p>{errors.password.message}</p>}
        </label>
        <label>
          닉네임
          <input
            {...register('nickname')}
            type="nickname"
            name="nickname"
            id=""
            placeholder="닉네임"
            required
          />
          {errors.nickname && <p>{errors.nickname.message}</p>}
        </label>
        <button type="submit" className="bg-black text-white p-2 rounded-md">
          회원가입
        </button>
      </form>
      <Link href="login">로그인하러가기</Link>
    </div>
  );
};

export default SignupPage;

'use client';
import { login } from '@/app/auth/action';
import { fetchUser } from '@/app/utils/supabase/db';
import { useUserStore } from '@/store/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const initialState = { success: false, error: null };

const schema = z.object({
  email: z
    .string()
    .email('이메일 형식이 아닙니다.')
    .nonempty('이메일을 입력하세요'),
  password: z.string().nonempty('비밀번호를 입력하세요')
});
const LoginForm = () => {
  const router = useRouter();
  const { setUser } = useUserStore();
  const [state, formAction] = useFormState(login, initialState);
  useEffect(() => {
    const afterLogin = async () => {
      console.log(state);
      if (state.success) {
        try {
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

  return (
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

      {state.error && <p className="text-red-500 !mt-4">{state.error}</p>}

      <button
        type="submit"
        className="w-full bg-[#8573C9] p-3 rounded-md !mt-10 text-white text-lg font-medium"
      >
        로그인
      </button>
    </form>
  );
};

export default LoginForm;

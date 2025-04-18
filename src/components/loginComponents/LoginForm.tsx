'use client';
import { login } from '@/app/auth/action';
import { fetchUser } from '@/app/utils/supabase/db';
import { useUserStore } from '@/store/auth/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Text from '../common/Text';

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
      className="space-y-5 border-b border-b-line-normal pb-9"
    >
      <div>
        <label className="space-y-2">
          <Text variant="body2" color="label-normal">
            이메일
          </Text>
          <input
            {...register('email')}
            type="email"
            name="email"
            id="email"
            placeholder="ex)abc@email.com"
            required
            className={`w-full p-4 border-[1px] border-label-assistive rounded-md focus:outline-none placeholder-label-assistive ${
              errors.email ? 'border-error' : ' border-label-assistive'
            }`}
          />
          {errors.email ? (
            <Text variant="label1" color="error">
              {errors.email.message}
            </Text>
          ) : (
            <Text variant="label1" color="label-assistive">
              헬퍼 텍스트
            </Text>
          )}
        </label>
      </div>
      <div>
        <label className="space-y-2">
          <span className="font-semibold">비밀번호</span>
          <input
            {...register('password')}
            type="password"
            name="password"
            placeholder="비밀번호 입력"
            required
            className={`w-full p-4 border-[1px] border-label-assistive rounded-md focus:outline-none placeholder-label-assistive ${
              errors.email ? 'border-error' : ' border-label-assistive'
            }`}
          />
          {errors.password ? (
            <Text variant="label1" color="error">
              {errors.password.message}
            </Text>
          ) : (
            <Text variant="label1" color="label-assistive">
              헬퍼 텍스트
            </Text>
          )}
        </label>
      </div>

      {state.error && (
        <Text color="error" className="!mt-4">
          {state.error}
        </Text>
      )}

      <button
        type="submit"
        className="w-full bg-primary-4 p-3 rounded-md !mt-7"
      >
        <Text as="span" variant="title2" color="white">
          로그인
        </Text>
      </button>
    </form>
  );
};

export default LoginForm;

'use client';

import { login, signup } from '@/app/auth/action';
import { fetchUser, fetchUserInfo } from '@/app/utils/supabase/db';
import { useUserStore } from '@/store/auth/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Text from '../common/Text';
import { InputForm } from './InputForm';
import { showToast } from '../common/Toast';
import { LOGIN_TEXT } from '@/constants/login/text';

interface LoginFormProps {
  mode: string;
}

interface FormData {
  email: string;
  password: string;
  fullName?: string;
}

const loginSchema = z.object({
  email: z
    .string()
    .nonempty('이메일을 입력하세요')
    .email('이메일 형식이 아닙니다.'),
  password: z.string().nonempty('비밀번호를 입력하세요')
});

const signupSchema = loginSchema.extend({
  fullName: z
    .string()
    .nonempty('닉네임을 입력하세요')
    .min(2, '닉네임은 2자 이상이어야 합니다.')
    .max(10, '닉네임은 10자 이하여야 합니다.')
    .regex(
      /^[가-힣a-zA-Z0-9]+$/,
      '닉네임은 한글, 영문, 숫자만 사용할 수 있습니다.'
    )
});

const initialState = { success: false, error: null };

const LoginForm = ({ mode }: LoginFormProps) => {
  const router = useRouter();
  const { setUser } = useUserStore();

  const schema = mode === 'signup' ? signupSchema : loginSchema;
  const actionFn = mode === 'signup' ? signup : login;
  const [state, formAction] = useFormState(actionFn, initialState);

  useEffect(() => {
    const afterLogin = async () => {
      if (state.success) {
        try {
          const data = await fetchUser();
          setUser(data);
          const userInfo = await fetchUserInfo(data);
          showToast(`${userInfo?.nickname}님 환영합니다!`, 'success');
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
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      fullName: ''
    }
  });

  return (
    <form action={formAction} className="space-y-5">
      {/* 닉네임: 회원가입일 때만 보이게 */}
      {mode === 'signup' && (
        <InputForm
          label="닉네임"
          type="text"
          name="fullName"
          placeholder="닉네임 입력"
          register={register}
          error={errors.fullName}
          required
        />
      )}
      <InputForm
        label="이메일"
        type="email"
        name="email"
        placeholder="ex)abc@email.com"
        register={register}
        error={errors.email}
        required
      />
      <InputForm
        label="비밀번호"
        type="password"
        name="password"
        placeholder="비밀번호 입력"
        register={register}
        error={errors.password}
        required
      />

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
          {mode === 'signup' ? LOGIN_TEXT.signupTitle : LOGIN_TEXT.loginTitle}
        </Text>
      </button>
    </form>
  );
};

export default LoginForm;

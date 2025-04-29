'use client';

import { login, signup } from '@/app/auth/action';
import { fetchUser, fetchUserInfo } from '@/app/utils/supabase/db';
import { useUserStore } from '@/store/auth/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo } from 'react';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import Text from '../common/Text';
import { InputForm } from './InputForm';
import { showToast } from '../common/Toast';
import { LOGIN_TEXT } from '@/constants/login/text';
import { Info } from 'lucide-react';
import { AuthFormValues, LoginFormProps } from '@/types/auth/auth';
import { loginSchema, signupSchema } from '@/types/auth/schemas';

const initialState = { success: false, error: null };

const LoginForm = ({ mode }: LoginFormProps) => {
  const router = useRouter();
  const { setUser } = useUserStore();

  const schema = useMemo(
    () => (mode === 'signup' ? signupSchema : loginSchema),
    [mode]
  );
  const actionFn = useMemo(() => (mode === 'signup' ? signup : login), [mode]);

  const [state, formAction] = useFormState(actionFn, initialState);

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<AuthFormValues>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
      fullName: ''
    }
  });

  useEffect(() => {
    const afterLogin = async () => {
      if (state.success) {
        try {
          const [data, userInfo] = await Promise.all([
            fetchUser(),
            fetchUser().then(fetchUserInfo)
          ]);
          setUser(data);
          // const userInfo = await fetchUserInfo(data);
          showToast(`🎉 ${userInfo?.nickname}님 환영합니다!`, 'success');
          router.push('/');
        } catch (error) {
          console.error('유저 정보 불러오기 실패:', error);
        }
      }
    };
    afterLogin();
  }, [state.success]); // success 상태 변화에만 반응

  const onSubmit = (data: AuthFormValues) => {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
    if (mode === 'signup' && data.fullName) {
      formData.append('fullName', data.fullName);
    }
    formAction(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
        infoText={
          mode === 'signup' ? (
            <Text
              as="div"
              variant="label1"
              color="primary4"
              className="flex items-center gap-1 !leading-normal !mt-[6px]"
            >
              <Info className="w-4 h-4 translate-y-[-2px]" />
              <span>미래 편지를 입력하신 이메일로 받아볼 수 있어요!</span>
            </Text>
          ) : undefined
        }
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
        <Text color="error" variant={'body2'} className="!mt-4">
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

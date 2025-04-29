import { z } from 'zod';

//로그인 스키마
export const loginSchema = z.object({
  email: z
    .string()
    .nonempty('이메일을 입력하세요')
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      '이메일 형식이 올바르지 않습니다.'
    ),
  password: z
    .string()
    .nonempty('비밀번호를 입력하세요')
    .min(6, '비밀번호는 6자 이상이어야 합니다.')
});

//로그아웃 스키마
export const signupSchema = loginSchema.extend({
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

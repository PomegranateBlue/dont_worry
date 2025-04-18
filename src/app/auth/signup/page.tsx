import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { signup } from '../action';
import Text from '@/components/common/Text';
import LoginForm from '@/components/loginComponents/LoginForm';

// const initialState = { success: false, error: null };

// const schema = z.object({
//   email: z
//     .string()
//     .email('이메일 형식이 아닙니다.')
//     .nonempty('이메일을 입력하세요'),
//   password: z.string().nonempty('비밀번호를 입력하세요'),
//   fullName: z.string().nonempty('닉네임을 입력해주세요')
// });

const SignupPage = () => {
  // const {
  //   register,
  //   formState: { errors }
  // } = useForm({
  //   resolver: zodResolver(schema),
  //   mode: 'onBlur',
  //   defaultValues: {
  //     email: '',
  //     password: '',
  //     fullName: ''
  //   }
  // });
  // const [state, formAction] = useFormState(signup, initialState);

  return (
    <div className="px-5">
      <Text variant="title1" color="label-normal" className="my-4 text-center">
        회원가입
      </Text>
      <LoginForm mode="signup" />
      <Link href="/auth/login" className="mx-auto mt-4 block w-fit">
        이미 계정이 있어요
      </Link>
    </div>
  );
};

export default SignupPage;

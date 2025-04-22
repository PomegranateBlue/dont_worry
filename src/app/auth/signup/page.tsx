import Link from 'next/link';
import Text from '@/components/common/Text';
import LoginForm from '@/components/loginComponents/LoginForm';

const SignupPage = () => {
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

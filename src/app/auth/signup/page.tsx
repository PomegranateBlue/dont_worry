import Link from 'next/link';
import Text from '@/components/common/Text';
import LoginForm from '@/components/loginComponents/LoginForm';

const SignupPage = () => {
  return (
    <div className="px-5  md:px-0 max-w-[650px] mx-auto">
      <div className=" h-14 flex items-center justify-center mb-7">
        <Text variant="title1" color="label-normal">
          회원가입
        </Text>
      </div>

      <LoginForm mode="signup" />
      <Link href="/auth/login" className="mx-auto mt-4 block w-fit">
        이미 계정이 있어요
      </Link>
    </div>
  );
};

export default SignupPage;

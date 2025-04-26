import Link from 'next/link';
import Text from '@/components/common/Text';
import LoginForm from '@/components/loginComponents/LoginForm';
import { PATHS } from '@/constants/common/paths';
import { LOGIN_TEXT } from '@/constants/login/text';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `DONT WORRY | ${LOGIN_TEXT.signupTitle}`,
  description: '회원가입 페이지'
};

const SignupPage = () => {
  return (
    <div className="px-5  md:px-0 max-w-[650px] mx-auto">
      <div className=" h-14 flex items-center justify-center mb-7">
        <Text variant="title1" color="label-normal">
          {LOGIN_TEXT.signupTitle}
        </Text>
      </div>

      <LoginForm mode="signup" />
      <Link href={PATHS.LOGIN} className="mx-auto mt-4 block w-fit">
        {LOGIN_TEXT.alreadyAccount}
      </Link>
    </div>
  );
};

export default SignupPage;

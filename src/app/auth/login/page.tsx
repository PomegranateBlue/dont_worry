import Link from 'next/link';
import LoginForm from '@/components/loginComponents/LoginForm';
import Text from '@/components/common/Text';
import Image from 'next/image';
import { PATHS } from '@/constants/common/paths';
import { LOGIN_TEXT } from '@/constants/login/text';
import { SocialLogin } from '@/components/loginComponents/SocialLogin';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DONT WORRY | 로그인',
  description: '로그인 페이지'
};

export default function LoginPage() {
  return (
    <div className="px-5  md:px-0 max-w-[650px] mx-auto pb-5">
      <div className=" h-14 flex items-center justify-center">
        <Text variant="title1" color="label-normal">
          {LOGIN_TEXT.loginTitle}
        </Text>
      </div>
      <div className="flex justify-center my-10">
        <Image
          src="/images/header-logo.svg"
          alt="logo"
          width={206}
          height={32}
          priority
        />
      </div>
      <LoginForm mode="login" />
      <div className="w-full h-[1px] bg-line-normal my-9"></div>
      <Text variant="body3" color="label-normal" className="text-center">
        {LOGIN_TEXT.socialLoginTitle}
      </Text>
      <div className="flex flex-wrap mx-auto w-fit space-x-9 m-8">
        <SocialLogin provider="kakao" />
        <SocialLogin provider="google" />
      </div>
      <Link href={PATHS.SIGNUP} className="text-center mx-auto w-fit block">
        <Text variant="body3" color="label-alternative" className="underline">
          {LOGIN_TEXT.signupTitle}
        </Text>
      </Link>
    </div>
  );
}

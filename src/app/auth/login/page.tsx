import Link from 'next/link';
import LoginForm from '@/components/loginComponents/LoginForm';
import NaverLogin from '@/components/loginComponents/NaverLogin';
import KakaoLogin from '@/components/loginComponents/KakaoLogin';
import GoogleLogin from '@/components/loginComponents/GoogleLogin';
import Text from '@/components/common/Text';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="px-5">
      <Text variant="title1" color="label-normal" className="my-4 text-center">
        로그인
      </Text>
      <Image
        src="/images/header-logo.svg"
        alt="logo"
        width={206}
        height={32}
        className="mx-auto my-10"
      />
      <LoginForm mode="login" />
      <div className="mt-10">
        <Text variant="body3" color="label-normal" className="text-center">
          소셜 계정으로 로그인
        </Text>
        <div className="flex flex-wrap mx-auto w-fit space-x-9 m-8">
          <KakaoLogin />
          <NaverLogin />
          <GoogleLogin />
        </div>
      </div>
      <Link href="/auth/signup" className="text-center mx-auto w-fit block">
        <Text variant="body3" color="label-alternative" className=" underline">
          회원가입
        </Text>
      </Link>
    </div>
  );
}

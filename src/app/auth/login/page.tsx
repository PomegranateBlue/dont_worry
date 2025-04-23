import Link from 'next/link';
import LoginForm from '@/components/loginComponents/LoginForm';
// import NaverLogin from '@/components/loginComponents/NaverLogin';
import KakaoLogin from '@/components/loginComponents/KakaoLogin';
import GoogleLogin from '@/components/loginComponents/GoogleLogin';
import Text from '@/components/common/Text';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="px-5  md:px-0 max-w-[650px] mx-auto pb-5">
      <div className=" h-14 flex items-center justify-center">
        <Text variant="title1" color="label-normal">
          로그인
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
      <div className="mt-10">
        <Text variant="body3" color="label-normal" className="text-center">
          소셜 계정으로 로그인
        </Text>
        <div className="flex flex-wrap mx-auto w-fit space-x-9 m-8">
          <KakaoLogin />
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

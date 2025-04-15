import Link from 'next/link';
import LoginForm from '@/components/loginComponents/LoginForm';
import NaverLogin from '@/components/loginComponents/NaverLogin';
import KakaoLogin from '@/components/loginComponents/KakaoLogin';
import GoogleLogin from '@/components/loginComponents/GoogleLogin';
import Text from '@/components/common/Text';

export default function LoginPage() {
  return (
    <div className="px-4">
      <Text variant="title1" color="label-normal" className="my-4 text-center">
        로그인
      </Text>
      <LoginForm />
      <div className="mt-10">
        <p className="text-lg text-center">소셜 계정으로 로그인</p>
        <div className="flex flex-wrap mx-auto w-fit space-x-9 m-8">
          <KakaoLogin />
          <NaverLogin />
          <GoogleLogin />
        </div>
      </div>
      <Link
        href="/auth/signup"
        className="text-center mx-auto w-fit block underline"
      >
        회원가입
      </Link>
    </div>
  );
}

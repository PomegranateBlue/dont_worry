import Link from 'next/link';
import LoginForm from '@/components/loginComponents/LoginForm';
import NaverLogin from '@/components/loginComponents/NaverLogin';
import KakaoLogin from '@/components/loginComponents/KakaoLogin';
import GoogleLogin from '@/components/loginComponents/GoogleLogin';

export default function LoginPage() {
  return (
    <div className="px-4">
      <h2 className="m-4 text-center font-semibold text-xl">로그인</h2>
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

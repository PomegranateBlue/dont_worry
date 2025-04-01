import Link from 'next/link';

const SignupPage = () => {
  return (
    <div>
      <form className="flex flex-col gap-4 p-4 shadow-md rounded-md w-[500px]">
        <input type="email" name="email" id="" placeholder="이메일" required />
        <input
          type="password"
          name="password"
          id=""
          placeholder="비밀번호"
          required
        />
        <input
          type="nickname"
          name="nickname"
          id=""
          placeholder="닉네임"
          required
        />
        <button type="submit" className="bg-black text-white p-2 rounded-md">
          회원가입
        </button>
      </form>
      <Link href="login">로그인하러가기</Link>
    </div>
  );
};

export default SignupPage;

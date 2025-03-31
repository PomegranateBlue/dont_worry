import Link from 'next/link';
import React from 'react';

const LoginPage = () => {
  return (
    <div>
      <form className="flex flex-col gap-4 p-4 shadow-md rounded-md w-[500px]">
        <input type="email" name="email" id="" placeholder="이메일" required />
        <input type="password" name="password" id="" placeholder="비밀번호" required />
        <button type="submit" className="bg-black text-white p-2 rounded-md">
          로그인
        </button>
      </form>
      <Link href="signup">회원가입 하러가기</Link>
    </div>
  );
};

export default LoginPage;

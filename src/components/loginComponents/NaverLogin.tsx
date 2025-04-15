'use client';
import Image from 'next/image';

const NaverLogin = () => {
  return (
    <Image
      src="/images/login-naver.svg"
      width={56}
      height={56}
      alt="login-naver"
      priority
    />
  );
};

export default NaverLogin;

import Link from 'next/link';
import LogOutButton from './header/LogOutButton';
import { getIsLogin } from '@/app/utils/supabase/server';

export default async function Header() {
  const isLogin = await getIsLogin();
  return (
    // <div className="w-full bg-orange-500 h-[48px] text-black   ">
    //   <Link href="/community">commnunity</Link>
    //   <Link href="/note">note</Link>
    //   <Link href="/letter">letter</Link>
    //   <Link href="/login">login</Link>
    //   <Link href="/signup">signup</Link>
    //   <Link href="/ranking">ranking</Link>
    //   <Link href="/mypage">profile</Link>
    // </div>
    <div className="w-full bg-orange-500 h-[48px] text-black">
      <Link href="/community">community</Link>
      <Link href="/note">note</Link>
      <Link href="/letter">letter</Link>
      <Link href="/ranking">ranking</Link>

      {isLogin ? (
        <>
          <Link href="/mypage">profile</Link>
          <LogOutButton />
        </>
      ) : (
        <>
          <Link href="/login">login</Link>
          <Link href="/signup">signup</Link>
        </>
      )}
    </div>
  );
}

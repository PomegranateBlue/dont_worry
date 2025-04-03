import Link from 'next/link';
export default function Header() {
  return (
    <div className="w-full bg-white h-[48px] text-black   ">
      <Link href="community">commnunity</Link>
      <Link href="note">note</Link>
      <Link href="letter">letter</Link>
      <Link href="login">login</Link>
      <Link href="signup">signup</Link>
      <Link href="ranking">ranking</Link>
      <Link href="mypage">profile</Link>
    </div>
  );
}

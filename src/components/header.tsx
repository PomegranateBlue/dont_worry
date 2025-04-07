import Link from 'next/link';
import LogOutButton from './header/LogOutButton';

export default function Header() {
  // useEffect(() => {
  //   const getUser = async () => {
  //     const { data } = await browserClient.auth.getUser();
  //     console.log('data:', data);
  //   };

  //   getUser();
  // }, []);

  return (
    <div className="w-full bg-orange-500 h-[48px] text-black   ">
      <Link href="/community">commnunity</Link>
      <Link href="/note">note</Link>
      <Link href="/letter">letter</Link>
      <Link href="/login">login</Link>
      <Link href="/signup">signup</Link>
      <Link href="/ranking">ranking</Link>
      <Link href="/mypage">profile</Link>
    </div>
  );
}

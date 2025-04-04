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
    <header className="flex flex-row bg-slate-200 p-4 justify-between">
      <Link href="community">commnunity</Link>
      <Link href="note">note</Link>
      <Link href="letter">letter</Link>
      <Link href="login">login</Link>
      <Link href="signup">signup</Link>
      <Link href="ranking">ranking</Link>
      <Link href="mypage">profile</Link>
      <Link href="test">test</Link>
      <LogOutButton />
    </header>
  );
}

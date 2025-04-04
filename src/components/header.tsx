import Link from 'next/link';
import LogOutButton from './loginComponents/LogOutButton';

export default function Header() {
  // useEffect(() => {
  //   const getUser = async () => {
  //     const { data } = await browserClient.auth.getUser();
  //     console.log('data:', data);
  //   };

  //   getUser();
  // }, []);

  return (
    <header className="flex flex-row flex-wrap bg-slate-200 p-4 justify-between">
      <Link href="/">서비스 소개</Link>
      <Link href="/note">걱정 작성</Link>
      <Link href="/">걱정 보관함</Link>
      <Link href="/ranking">통계 페이지</Link>
      <Link href="/letter">편지쓰기</Link>
      <Link href="/mypage">마이페이지</Link>
      <Link href="/auth/login">로그인</Link>
      <Link href="/auth/signup">회원가입</Link>
      <LogOutButton />
    </header>
  );
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DONT WORRY | 마이페이지',
  description:
    '내 정보, 프로필, 내가 작성한 걱정과 편지를 확인할 수 있는 공간입니다.'
};

export default function MyPageLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

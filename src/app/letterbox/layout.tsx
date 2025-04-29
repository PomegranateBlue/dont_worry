import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DONT WORRY | 편지보관함페이지',
  description: '미래의 나에게 작성한 편지를 모아볼 수 있는 공간입니다.'
};

export default function LetterBoxPageLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

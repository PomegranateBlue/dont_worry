import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DONT WORRY | 미래편지페이지',
  description: '미래의 나에게 편지를 작성할 수 있는 공간입니다.'
};

export default function LetterPageLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

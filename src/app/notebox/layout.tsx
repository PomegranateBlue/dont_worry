import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DONT WORRY | 걱정 보관함',
  description:
    '지금까지 작성한 모든 걱정을 한 눈에 볼 수 있어요. 당신의 기록을 다시 돌아보세요.',
  openGraph: {
    title: 'DONT WORRY | 걱정 보관함',
    description:
      '기록된 걱정들을 한 번에 확인해보세요. 당신의 감정과 고민이 여기에 담겨있어요.',
    url: 'https://dontworry.io.kr/noteBox',
    images: [
      {
        url: 'https://dontworry.io.kr/images/og-note-box.png',
        width: 1200,
        height: 630,
        alt: 'DONT WORRY 걱정 보관함'
      }
    ],
    type: 'website'
  }
};

export default function NoteBoxLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DONT WORRY | 걱정 작성',
  description: '당신의 고민을 자유롭게 작성하고, AI에게 도움을 받아보세요.',
  openGraph: {
    title: 'DONT WORRY | 걱정 작성',
    description:
      '걱정되는 일이 있다면 자유롭게 작성해보세요. AI가 함께 생각해줄게요.',
    url: 'https://dontworry.io.kr/note',
    images: [
      {
        url: 'https://dontworry.io.kr/images/og-note.png',
        width: 1200,
        height: 630,
        alt: 'DONT WORRY 걱정 작성'
      }
    ],
    type: 'website'
  }
};

export default function NoteLayout({
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

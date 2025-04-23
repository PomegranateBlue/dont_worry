'use client';

import { useUserLetters } from '@/hooks/letterHooks/useUserLetters';
import { Separator } from '@radix-ui/react-separator';
import Image from 'next/image';
import React from 'react';
import Text from '../common/Text';

interface LetterCardProps {
  selectedFilter: string | null;
}

const formatDate = (date?: string | null) => {
  if (!date) return '날짜 없음';
  return new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const LetterCard = ({ selectedFilter }: LetterCardProps) => {
  const { data: letters, isLoading, isError } = useUserLetters(selectedFilter);

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>편지 데이터 로딩 실패</div>;

  return (
    <section className="flex w-[375px] px-5 pb-5 flex-col items-start gap-5">
      {letters?.map((letter) => (
        <main
          key={letter.letter_id}
          className="flex flex-col items-center gap-4 p-5 self-stretch border rounded shadow"
        >
          <nav className="flex items-center gap-2 self-stretch">
            <Text variant="label1" color="label-neutral">
              도착 예정일 {formatDate(letter.send_at)}
            </Text>
          </nav>
          <Separator className="w-[295px] h-[1px] bg-line-normal" />
          <article className="flex items-center gap-3 self-stretch">
            {letter.img_url && (
              <Image
                width={80}
                height={80}
                src={letter.img_url}
                alt="편지 이미지"
                className="w-[72px] h-[72px] rounded-[4px]"
              />
            )}
            <figure className="flex flex-col justify-between items-start flex-[1_0_0] self-stretch">
              <Text variant="label1" color="label-alternative">
                {formatDate(letter.send_at)} 작성
              </Text>
              <div className="h-[38px] self-stretch">
                <Text variant="label1" color="label-neutral">
                  {letter.content}
                </Text>
              </div>
            </figure>
          </article>
        </main>
      ))}
    </section>
  );
};

export default LetterCard;

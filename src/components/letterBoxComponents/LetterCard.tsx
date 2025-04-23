'use client';

import { useUserLetters } from '@/hooks/letterHooks/useUserLetters';
import Image from 'next/image';
import React from 'react';

const LetterCard = () => {
  const { data: letters, isLoading, isError } = useUserLetters();

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>편지 데이터 로딩 실패</div>;

  return (
    <div className="space-y-4">
      {letters?.map((letter) => (
        <div
          key={letter.letter_id}
          className="border p-4 rounded shadow bg-white"
        >
          <p>{letter.content}</p>
          {letter.img_url && (
            <Image
              width={80}
              height={80}
              src={letter.img_url}
              alt="편지 이미지"
              className="mt-2 w-full h-auto rounded"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default LetterCard;

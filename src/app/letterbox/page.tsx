'use client';

import Text from '@/components/common/Text';
import EditLetter from '@/components/letterBoxComponents/EditLetter';
import FilterLetter from '@/components/letterBoxComponents/FilterLetter';
import LetterCard from '@/components/letterBoxComponents/LetterCard';
import NoLetter from '@/components/letterBoxComponents/NoLetter';
import { useUserLetters } from '@/hooks/letterboxHooks/useUserLetters';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const LetterBoxPage = () => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedLetterIds, setSelectedLetterIds] = useState<string[]>([]);

  const {
    data: letters = [],
    isLoading,
    isError
  } = useUserLetters(selectedFilter);

  const isAllSelected = Boolean(
    letters?.length &&
      selectedLetterIds.length === letters.length &&
      selectedLetterIds.every((id) =>
        letters.some((letter) => letter.letter_id === id)
      )
  );

  const handleCheckboxChange = (id: string) => {
    const updatedLetterIds = selectedLetterIds.includes(id)
      ? selectedLetterIds.filter((item) => item !== id)
      : [...selectedLetterIds, id];

    setSelectedLetterIds(updatedLetterIds);
  };

  const handleSelectAllLetter = () => {
    if (isAllSelected) {
      setSelectedLetterIds([]);
    } else {
      setSelectedLetterIds(letters.map((letter) => letter.letter_id));
    }
  };

  const formatDate = (date?: string | null) => {
    if (!date) return '날짜 없음';
    return new Date(date).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (letters.length === 0) {
    return <NoLetter />;
  }

  return (
    <section className="flex w-full max-w-[375px] xl:max-w-[1280px] pb-1.5 flex-col justify-center items-center bg-backgroundSet-card mx-auto">
      {/* 타이틀 */}
      <nav className="flex h-[56px] px-4 xl:px-0 justify-center items-center gap-5 self-stretch bg-backgroundSet-normal">
        <Text variant="title1" color="label-normal" className="text-center">
          미래 편지 보관함
        </Text>
      </nav>

      {/* 필터 + 편집 버튼 */}
      <header className="flex h-12 px-5 xl:px-4 xl:max-w-[648px] justify-between items-center w-full">
        <FilterLetter
          selectedFilter={selectedFilter}
          onToggleFilter={(label) => setSelectedFilter(label || null)}
        />
        <EditLetter
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          selectedLetterIds={selectedLetterIds}
          setSelectedLetterIds={setSelectedLetterIds}
          isAllSelected={isAllSelected}
          onSelectAll={handleSelectAllLetter}
        />
      </header>

      {/* 걱정 작성하러 가기 배너 */}
      <article className="flex items-center px-4 xl:max-w-[648px] xl:px-4 pt-2 pb-2 w-full rounded-[8px]">
        <Link href="/note" className="w-full">
          <nav className="flex items-center gap-4 p-4 bg-backgroundSet-normal border rounded w-full">
            <Image
              src="/images/ver2-default.svg"
              alt="오늘의 걱정 아이콘"
              width={40}
              height={40}
            />
            <div className="flex flex-col gap-1">
              <Text as="p" variant="body3" color="label-normal">
                걱정 작성하고 답변 받기
              </Text>
              <Text as="p" variant="label1" color="label-alternative">
                걱정이가 기다리고 있어요!
              </Text>
            </div>
          </nav>
        </Link>
      </article>

      {/* 편지 리스트 */}
      {isLoading ? (
        <div className="mt-5">로딩중...</div>
      ) : isError ? (
        <div className="mt-5">편지 데이터 로딩 실패</div>
      ) : (
        <section className="flex w-full max-w-[375px] xl:max-w-[648px] px-5 xl:px-4 pb-5 flex-col items-start gap-5 mt-5">
          {letters.map((letter) => (
            <LetterCard
              key={letter.letter_id}
              letter={letter}
              isEdit={isEdit}
              isSelected={selectedLetterIds.includes(letter.letter_id)}
              onCheckboxChange={() => handleCheckboxChange(letter.letter_id)}
              formatDate={formatDate}
            />
          ))}
        </section>
      )}
    </section>
  );
};

export default LetterBoxPage;

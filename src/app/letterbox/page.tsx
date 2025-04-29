'use client';

import Text from '@/components/common/Text';
import EditLetter from '@/components/letterBoxComponents/EditLetter';
import FilterLetter from '@/components/letterBoxComponents/FilterLetter';
import LetterCard from '@/components/letterBoxComponents/LetterCard';
import NoLetter from '@/components/letterBoxComponents/NoLetter';
import { useUserLetters } from '@/hooks/letterboxHooks/useUserLetters';
import Image from 'next/image';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import { LETTER_ERROR_KEYS, LetterError } from '@/constants/error/letterError';
import LoadingLetters from '@/components/letterBoxComponents/LoadingLetters';

const LetterBoxPage = () => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedLetterIds, setSelectedLetterIds] = useState<string[]>([]);

  const {
    data: letters = [],
    isLoading,
    isError
  } = useUserLetters(selectedFilter);

  // 전체 편지가 선택되었는지 여부를 계산
  const isAllSelected = useMemo<boolean>(() => {
    if (!letters?.length) return false;

    return (
      selectedLetterIds.length === letters.length &&
      selectedLetterIds.every((id) =>
        letters.some((letter) => letter.letter_id === id)
      )
    );
  }, [letters, selectedLetterIds]);

  // 단일 편지 선택/해제 핸들러
  const handleCheckboxChange = (id: string) => {
    const updatedLetterIds = selectedLetterIds.includes(id)
      ? selectedLetterIds.filter((item) => item !== id)
      : [...selectedLetterIds, id];

    setSelectedLetterIds(updatedLetterIds);
  };

  // 전체 선택/해제 핸들러
  const handleSelectAllLetter = () => {
    if (isAllSelected) {
      setSelectedLetterIds([]);
    } else {
      setSelectedLetterIds(letters.map((letter) => letter.letter_id));
    }
  };

  //에러처리
  if (isError) {
    throw new LetterError(LETTER_ERROR_KEYS.CANT_SELECT_LETTER);
  }

  //작성한 편지가 없을 경우 보여주는 컴포넌트
  if (letters.length === 0) {
    return <NoLetter />;
  }

  return (
    <section className="flex w-full max-w-[375px] md:max-w-[768px] xl:max-w-[1280px] pb-1.5 flex-col justify-center items-center bg-backgroundSet-card mx-auto">
      {/* 타이틀 */}
      <nav className="flex h-[56px] px-4 xl:px-0 justify-center items-center gap-5 self-stretch bg-backgroundSet-normal">
        <Text variant="title1" color="label-normal" className="text-center">
          미래 편지 보관함
        </Text>
      </nav>

      {/* 필터 + 편집 버튼 */}
      <header className="flex h-12 px-5 xl:px-4 md:max-w-[608px] xl:max-w-[648px] justify-between items-center w-full">
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
      <article className="flex items-center px-4 md:max-w-[608px] xl:max-w-[648px] xl:px-4 pt-2 pb-2 w-full rounded-[8px]">
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
        <LoadingLetters />
      ) : (
        <section className="flex w-full max-w-[375px] md:max-w-[608px] xl:max-w-[648px] px-5 xl:px-4 pb-5 flex-col items-start gap-5 mt-5">
          {letters.map((letter) => (
            <LetterCard
              key={letter.letter_id}
              letter={letter}
              isEdit={isEdit}
              isSelected={selectedLetterIds.includes(letter.letter_id)}
              onCheckboxChange={() => handleCheckboxChange(letter.letter_id)}
            />
          ))}
        </section>
      )}
    </section>
  );
};

export default LetterBoxPage;

'use client';

import Text from '@/components/common/Text';
import EditLetter from '@/components/letterBoxComponents/EditLetter';
import FilterLetter from '@/components/letterBoxComponents/FilterLetter';
import LetterCard from '@/components/letterBoxComponents/LetterCard';
import NoLetter from '@/components/letterBoxComponents/NoLetter';
import { useUserLetters } from '@/hooks/letterHooks/useUserLetters';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const LetterBoxPage = () => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedLetterIds, setSelectedLetterIds] = useState<string[]>([]);

  // 데이터 페칭 로직을 페이지 컴포넌트로 이동
  const {
    data: letters = [],
    isLoading,
    isError
  } = useUserLetters(selectedFilter);

  // 전체 선택 여부 계산
  const isAllSelected = Boolean(
    letters?.length &&
      selectedLetterIds.length === letters.length &&
      selectedLetterIds.every((id) =>
        letters.some((letter) => letter.letter_id === id)
      )
  );

  // 체크박스 상태를 토글하는 함수
  const handleCheckboxChange = (id: string) => {
    const updatedLetterIds = selectedLetterIds.includes(id)
      ? selectedLetterIds.filter((item) => item !== id) // 이미 선택된 경우 제거
      : [...selectedLetterIds, id]; // 선택되지 않은 경우 추가

    setSelectedLetterIds(updatedLetterIds); // 상태 업데이트
  };

  // 전체 선택/해제 처리
  const handleSelectAllLetter = () => {
    if (isAllSelected) {
      setSelectedLetterIds([]); // 전체 해제
    } else {
      setSelectedLetterIds(letters.map((letter) => letter.letter_id)); // 전체 선택
    }
  };

  // 날짜 포맷팅 함수
  const formatDate = (date?: string | null) => {
    if (!date) return '날짜 없음';
    return new Date(date).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // 편지가 하나도 없을 경우 NoLetter 컴포넌트만 보여주기
  if (letters.length === 0) {
    return <NoLetter />;
  }

  return (
    <section className="flex w-[375px] pb-1.5 flex-col justify-center items-center bg-backgroundSet-card mx-auto">
      <nav className="flex h-[56px] px-[6px] justify-center items-center gap-[20px] self-stretch">
        <div className="w-full">
          <Text
            variant="title1"
            color="label-normal"
            className="text-center font-pretendard text-[20px] font-semibold leading-[135%]"
          >
            미래 편지 보관함
          </Text>
        </div>
      </nav>

      <header className="flex h-12 px-5 justify-between items-center self-stretch">
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

      <article className="flex items-center p-5 self-stretch">
        <Link href="/note">
          <nav className="w-[335px] h-[59px] flex items-center gap-4 p-2 px-4 bg-backgroundSet-normal border rounded">
            <Image
              src="/images/ver2-default.svg"
              alt="오늘의 걱정 아이콘"
              width={40}
              height={40}
            />
            <div className="flex flex-col gap-2 ">
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
      {isLoading ? (
        <div className="mt-5">로딩중...</div>
      ) : isError ? (
        <div className="mt-5">편지 데이터 로딩 실패</div>
      ) : (
        <section className="flex w-[375px] px-5 pb-5 flex-col items-start gap-5">
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

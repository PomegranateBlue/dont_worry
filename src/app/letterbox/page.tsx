'use client';

import Text from '@/components/common/Text';
import EditLetter from '@/components/letterBoxComponents/EditLetter';
import FilterLetter from '@/components/letterBoxComponents/FilterLetter';
import LetterCard from '@/components/letterBoxComponents/LetterCard';
import React, { useState } from 'react';

const LetterBoxPage = () => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedLetterIds, setSelectedLetterIds] = useState<string[]>([]);

  return (
    <section>
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
      <div className="flex w-[375px] flex-col items-center">
        <nav>
          <FilterLetter
            selectedFilter={selectedFilter}
            onToggleFilter={(label) => setSelectedFilter(label || null)}
          />
          <EditLetter
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            selectedLetterIds={selectedLetterIds}
            setSelectedLetterIds={setSelectedLetterIds}
          />
        </nav>

        <LetterCard
          selectedFilter={selectedFilter}
          selectedLetterIds={selectedLetterIds}
          setSelectedLetterIds={setSelectedLetterIds}
          isEdit={isEdit}
        />
      </div>
    </section>
  );
};

export default LetterBoxPage;

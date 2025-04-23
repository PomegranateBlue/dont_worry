'use client';

import Text from '@/components/common/Text';
import FilterLetter from '@/components/letterBoxComponents/FilterLetter';
import LetterCard from '@/components/letterBoxComponents/LetterCard';
import React, { useState } from 'react';

const LetterBoxPage = () => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
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
      <div>
        <FilterLetter
          selectedFilter={selectedFilter}
          onToggleFilter={(label) => setSelectedFilter(label || null)}
        />
        <LetterCard selectedFilter={selectedFilter} />
      </div>
    </section>
  );
};

export default LetterBoxPage;

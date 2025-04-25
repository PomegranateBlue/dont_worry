'use client';

import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';
import Text from '../common/Text';

interface FilterLetterProps {
  selectedFilter: string | null;
  onToggleFilter: (label: string) => void;
}
const FilterLetter = ({
  selectedFilter,
  onToggleFilter
}: FilterLetterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterOption = (label: string) => {
    if (selectedFilter === label) {
      onToggleFilter(''); // 선택 해제
    } else {
      onToggleFilter(label);
    }
    setIsOpen(false); // 선택하고 나면 드롭다운 닫기
  };

  return (
    <section>
      <button
        className={`flex items-start px-3 py-[6px] h-[32px] rounded-[16px] border xl:rounded-[20px] xl:px-[16px] bg-backgroundSet-normal ${
          selectedFilter
            ? 'border-primary-4 bg-primary-1'
            : 'border-line-normal'
        }`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Text variant="body3" as="p" color="label-neutral">
          {selectedFilter || '정렬기준'}
        </Text>

        <ChevronDown className="ml-1 w-4 h-4" />
      </button>

      {isOpen && (
        <figure className="absolute mt-1 w-full border rounded-[8px] bg-backgroundSet-normal shadow">
          <button
            className="flex px-[12px] py-[6px] justify-center items-center gap-[8px] self-stretch z-10 bg-backgroundSet-normal"
            onClick={() => handleFilterOption('작성일순')}
          >
            <Text variant="body3" as="p" color="label-neutral">
              작성일순
            </Text>
          </button>
          <button
            className="flex px-[12px] py-[6px] justify-center items-center gap-[8px] self-stretch z-10 bg-backgroundSet-normal"
            onClick={() => handleFilterOption('도착일순')}
          >
            <Text variant="body3" as="p" color="label-neutral">
              도착일순
            </Text>
          </button>
        </figure>
      )}
    </section>
  );
};

export default FilterLetter;

'use client';

import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';

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
    <div className="relative">
      <button
        className="flex items-center px-3 py-1 border rounded"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectedFilter || '선택 없음'}
        <ChevronDown className="ml-1 w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute mt-1 w-full border rounded bg-white shadow">
          <button
            className="w-full px-3 py-1 text-left hover:bg-gray-100"
            onClick={() => handleFilterOption('작성일순')}
          >
            작성일순
          </button>
          <button
            className="w-full px-3 py-1 text-left hover:bg-gray-100"
            onClick={() => handleFilterOption('도착일순')}
          >
            도착일순
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterLetter;

'use client';
// import FilterModal from './FilterModal';

import { ChevronDown } from 'lucide-react';
const sortOption = ['최신순', '주제별', '감정별'];
// import { frameSteps } from 'framer-motion';.
const FilterBar = () => {
  return (
    <header className="flex items-center justify-evenly p-4">
      {sortOption.map((label) => (
        <button
          key={label}
          className="flex items-center  font-bold  px-3 py-1.5 border-[2px] border-black rounded-full text-md"
        >
          {label}
          <ChevronDown className="w-4 h-4" />
        </button>
      ))}

      <button className="ml-2 text-sm text-black flex items-center gap-1">
        편집
      </button>
    </header>
  );
};

export default FilterBar;

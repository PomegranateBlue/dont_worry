'use client';
// import FilterModal from './FilterModal';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
const sortOption = ['최신순', '주제별', '감정별'];
// import { frameSteps } from 'framer-motion';.
import FilterModal from './FilterModal';
const FilterBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-evenly p-4">
        {sortOption.map((label) => (
          <button
            key={label}
            onClick={() => setIsModalOpen(true)}
            className="flex items-center  font-bold  px-3 py-0.5 border-[2px] border-black rounded-full text-md"
          >
            {label}
            <ChevronDown className="w-4 h-4" />
          </button>
        ))}

        <button className="ml-6 text-md text-black flex items-center gap-1">
          편집
        </button>
      </header>

      <FilterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default FilterBar;

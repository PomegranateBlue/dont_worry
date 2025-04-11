'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import FilterModal from './FilterModal';

const sortOption = ['최신순', '주제별', '감정별'];

const FilterBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  



  return (
    <>
      <header className="w-full flex items-center justify-between p-4">
        <div className="flex-1 whitespace-nowrap scrollbar-hide overflow-x-auto flex pr-4">
          <div className="flex gap-2 w-max">
            {sortOption.map((label) => (
              <button
                key={label}
                className="flex items-center  font-medium  px-3 py-1 border-[1px] border-black rounded-full text-sm"
              >
                {label}
                <ChevronDown className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>
        <button className="ml-6 text-md text-black flex items-center ">
          편집
        </button>
      </header>

      <FilterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
    
      />
    </>
  );
};

export default FilterBar;

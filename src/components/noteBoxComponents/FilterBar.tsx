'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Text from '../common/Text';
const sortOption = ['정렬순', '주제별', '감정별'];

interface FilterBarProps {
  onClickFilter: (label: string) => void;
}

const FilterBar = ({ onClickFilter }: FilterBarProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>('주제별');
  console.log(selectedOption);
  const handleFilterOption = (label: string) => {
    setSelectedOption(label);
    onClickFilter(label);
  };

  return (
    <>
      <header className="w-full flex items-center justify-between p-5">
        <div className="flex-1 whitespace-nowrap scrollbar-hide overflow-x-auto flex pr-4">
          <div className="flex gap-2 w-max">
            {sortOption.map((label) => (
              <button
                key={label}
                className="flex items-center  border-line-normal   px-[12px] py=[6px] w-auto h-[32px] border-[1px] rounded-[16px] "
                onClick={() => handleFilterOption(label)}
              >
                <Text color="label-neutral" variant="body3" as="p">
                  {label}
                </Text>
                <ChevronDown className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>
        <button className="ml-6  px-2 py-4 flex items-center ">
          <Text variant="body3" color="label-alternative" as="p">
            편집
          </Text>
        </button>
      </header>
    </>
  );
};

export default FilterBar;

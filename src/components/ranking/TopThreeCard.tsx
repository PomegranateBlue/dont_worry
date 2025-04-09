import React from 'react';
import { ChevronRight } from 'lucide-react';

export interface TopThree {
  name: string;
  count: number;
}

export interface TopThreeProps {
  topThree: TopThree;
}

const TopThreeCard = ({ topThree }: TopThreeProps) => {
  return (
    <div className="w-full border border-black rounded-md px-4 py-3 flex items-center justify-between mb-2 ">
      <div className="flex items-center space-x-2">{/*여기서 부터 링크 태그로 감싸야함*/}
        <span className="font-semibold text-sm text-black">
          {topThree.name}
        </span>
        <span className="text-sm text-gray-700">{`총 ${topThree.count}개`}</span>
      </div>
      <ChevronRight size={20} className="text-black" />
    </div>
  );
};

export default TopThreeCard;

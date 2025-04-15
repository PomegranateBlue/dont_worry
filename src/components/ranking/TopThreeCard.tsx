import React from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export interface TopThree {
  name: string;
  count: number;
}

export interface TopThreeProps {
  topThree: TopThree;
}

const TopThreeCard = ({ topThree }: TopThreeProps) => {
  return (
    <Link
      href={{
        pathname: '/notebox',
        query: { category: topThree.name }
      }}
      className="flex bg-backgroundSet-normal h-[56px] p-[16px] items-center gap-[10px] self-stretch rounded-lg"
    >
      <span className="text-label-normal text-[14px] font-medium leading-[150%]">
        {topThree.name}
      </span>
      <span className="text-label-alternative text-[12px] font-normal leading-[150%] ml-1">
        {`총 ${topThree.count}개`}
      </span>

      <ChevronRight
        size={20}
        className="text-label-normal w-[24px] h-[24px] aspect-square ml-auto"
      />
    </Link>
  );
};

export default TopThreeCard;

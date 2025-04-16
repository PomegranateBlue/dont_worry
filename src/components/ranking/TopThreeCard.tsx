import React from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Text from '../common/Text';

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
      <Text as="span" variant="body3" color="label-normal">
        {topThree.name}
      </Text>
      <Text as="span" variant="label1" color="label-alternative">
        {`총 ${topThree.count}개`}
      </Text>

      <ChevronRight
        size={20}
        className="text-label-normal w-[24px] h-[24px] aspect-square ml-auto"
      />
    </Link>
  );
};

export default TopThreeCard;

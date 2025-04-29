import React from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Text from '../common/Text';
import { useRankingStore } from '@/store/ranking/rankingStore';

export interface TopSix {
  name: string;
  count: number;
}

export interface TopSixProps {
  topSix: TopSix;
}

const TopSixCard = ({ topSix }: TopSixProps) => {
  const { chartMode } = useRankingStore();
  return (
    <Link
      href={{
        pathname: '/notebox',
        query: { category: topSix.name, categoryType: chartMode }
      }}
      className="flex bg-backgroundSet-normal h-[56px] p-[16px] items-center gap-[10px] self-stretch rounded-lg shadow-customCard"
    >
      <Text as="span" variant="body3" variant2="body1" color="label-normal">
        {topSix.name}
      </Text>
      <Text as="span" variant="label1" color="label-alternative">
        {`총 ${topSix.count}개`}
      </Text>

      <ChevronRight
        size={20}
        className="text-label-normal w-[24px] h-[24px] aspect-square ml-auto"
      />
    </Link>
  );
};

export default TopSixCard;

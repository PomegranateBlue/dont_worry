// components/ranking/Report.tsx
import { Most } from '@/types/ranking/types';
import React from 'react';
import Text from '../common/Text';

interface ReportProps {
  most: Most | null;
}

const Report = ({ most }: ReportProps) => {
  if (!most) {
    return (
      <div className="h-[100px] w-full bg-gray-100 animate-pulse rounded-md" />
    );
  }

  return (
    <Text
      as="h2"
      variant="heading3"
      variant2="heading4"
      color="label-normal"
      className="text-center break-words"
    >
      {`${most.name}에 관한 걱정이`}
      <br />
      {`${most.percentage}%로 가장 많았어요`}
    </Text>
  );
};

export default React.memo(Report);

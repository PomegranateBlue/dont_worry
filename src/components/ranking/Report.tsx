import { Most } from '@/types/ranking/types';
import React from 'react';
import Text from '../common/Text';

interface ReportProps {
  most: Most | null;
}

const Report = ({ most }: ReportProps) => {
  return (
    <>
      {most && (
        <Text
          as="h2"
          variant="heading3"
          variant2="heading4"
          color="label-normal"
          className="text-center text-[22px] font-medium leading-[135%] w-[228px] h-[60px] xl:w-[255px] xl:h-[76px]"
        >
          {`${most.name}에 관한 걱정이 
          ${most.percentage}%로 가장 많았어요`}
        </Text>
      )}
    </>
  );
};

export default React.memo(Report);

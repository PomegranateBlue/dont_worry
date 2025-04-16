import { Most } from '@/types/ranking/types';
import React from 'react';
import Text from '../common/Text';

interface ReportProps {
  most: Most | null;
}

const Report: React.FC<ReportProps> = ({ most }) => {
  //주차별 차트 하단에 간단 요약
  return (
    <>
      {most && (
        <Text
          as="h2"
          variant="heading3"
          color="label-normal"
          className="text-center text-[22px] font-medium leading-[135%] w-[228px] h-[60px]"
        >
          {`${most.name}에 관한 걱정이 
          ${most.percentage}%로 가장 많았어요`}
        </Text>
      )}
    </>
  );
};

export default Report;

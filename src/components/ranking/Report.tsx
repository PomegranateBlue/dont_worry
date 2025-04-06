import { Most } from '@/types/ranking/types';
import React from 'react';

interface ReportProps {
  most: Most | null;
}

const Report: React.FC<ReportProps> = ({ most }) => {
  return (
    <div>
      {most && (
        <>
          <h1>{`${most?.name}에 관한 걱정이 ${most?.percentage}%로 가장 많았어요`}</h1>
          <div>{`${most?.name} 총 ${most?.count}개`}</div>
        </>
      )}
    </div>
  );
};

export default Report;

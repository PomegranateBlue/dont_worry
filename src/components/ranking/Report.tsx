import { Most } from '@/types/ranking/types';
import React from 'react';

interface ReportProps {
  most: Most | null;
}

const Report: React.FC<ReportProps> = ({ most }) => {
  //주차별 차트 하단에 간단 요약
  return (
    most && (
      <div className="mt-6 px-4 py-3 bg-gray-50 rounded-xl shadow-inner w-full max-w-md mx-auto text-center mb-2">
        <h2 className="text-lg font-bold text-gray-800 mb-1">
          {`${most.name}에 관한 걱정이 ${most.percentage}%로 가장 많았어요`}
        </h2>
      </div>
    )
  );
};

export default Report;

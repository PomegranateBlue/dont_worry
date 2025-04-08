import { Most } from '@/types/ranking/types';
import React from 'react';

interface ReportProps {
  most: Most | null;
}

const Report: React.FC<ReportProps> = ({ most }) => {
  //주차별 차트 하단에 간단 요약
  return (
    most && (
      <div className="mt-6 px-4 py-3 bg-gray-50 rounded-xl shadow-inner w-full max-w-md mx-auto text-center">
        <h2 className="text-lg font-bold text-gray-800 mb-1">
          {`${most.name}에 관한 걱정이 ${most.percentage}%로 가장 많았어요`}
        </h2>
        <p className="text-sm text-gray-500">{`총 ${most.count}개의 ${most.name}관련 고민이 있었어요.`}</p>
      </div>
    )
  );
};

export default Report;

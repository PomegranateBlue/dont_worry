'use client';

import React, { useEffect, useState } from 'react';

type TopThreeItem = {
  name: string;
  count: number;
};

type SolutionProps = {
  topThree: TopThreeItem[];
};

const Solution = ({ topThree }: SolutionProps) => {
  const [solution, setSolution] = useState<string | null>(null);

  useEffect(() => {
    const makeSolution = async () => {
      const keywords = topThree.map((e) => e.name).join(', '); // "불안, 직장, 인간관계" 이런 식

      try {
        const res = await fetch('/utils/rankingSolution', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ keywords })
        });

        const data = await res.json();
        setSolution(data); // GPT 응답이 string으로 오니까 그대로 저장
      } catch (error) {
        console.error('솔루션 생성 중 오류 발생:', error);
        setSolution('문제를 불러오는 중 오류가 발생했습니다.');
      }
    };

    if (topThree.length > 0) {
      makeSolution();
    }
  }, [topThree]);

  return (
    <div className="p-4 mt-6 rounded-lg bg-slate-50">
      <h2 className="text-xl font-semibold mb-2">GPT 솔루션</h2>
      {solution ? (
        <p className="whitespace-pre-line">{solution}</p>
      ) : (
        <p>솔루션을 생성 중입니다...</p>
      )}
    </div>
  );
};

export default Solution;

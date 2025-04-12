'use client';

import browserClient from '@/app/utils/supabase/client';
import { supabase } from '@/app/utils/supabase/supabase';
import { useUserStore } from '@/store/store';
import React, { useEffect, useState } from 'react';

type TopThreeItem = {
  name: string;
  count: number;
};

type SolutionProps = {
  topThree: TopThreeItem[];
};

const stringifyTopThree = (list: TopThreeItem[]) => {
  return list.map((item) => item.name).join(',');
};

const Solution = ({ topThree }: SolutionProps) => {
  const [solution, setSolution] = useState<string | null>(null);
  const { user } = useUserStore();

  useEffect(() => {
    const makeSolution = async () => {
      const keywords = stringifyTopThree(topThree);
      if (!user) {
        console.error('사용자 ID가 없습니다.');
        return;
      }

      try {
        const { data, error } = await supabase //블로킹 하기 위해 최근 데이터 조회
          .from('user_statistics')
          .select('comment, top_three')
          .eq('user_id', user)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (error) {
          console.error('Supabase 에러 발생:', error);
        }

        if (data?.comment && data.top_three) {
          const serverTopThree = data.top_three.replace(/\s/g, ''); //슈베에서 불러온 top3
          const currentTopThree = keywords.replace(/\s/g, ''); //페이지에서 계산된 top3

          if (serverTopThree === currentTopThree) {
            //이미 동일 내용으로 생성된 멘트가 있다면 재활용
            setSolution(data.comment);
            return;
          }
        }

        console.log('GPT 요청 실행 중...');
        const res = await fetch('/utils/rankingSolution', {
          //멘트가 없거나 중복되지 않은경우 새로운 답변 생성
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ keywords })
        });

        if (!res.ok) {
          throw new Error(`서버 오류: ${res.status}`);
        }

        const gptData = await res.json();

        if (typeof gptData === 'string') {
          //생성한 답변과 top3를 저장
          setSolution(gptData);
          console.log('1', user);
          const { error: serror } = await browserClient
            .from('user_statistics')
            .insert([
              {
                user_id: user,
                comment: gptData,
                top_three: keywords,
                created_at: new Date().toISOString()
              }
            ]);
          if (serror) {
            console.log(serror);
          }
        } else {
          setSolution('예상하지 못한 GPT 응답 형식입니다.');
        }
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

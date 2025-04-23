'use client';

import browserClient from '@/app/utils/supabase/client';
import { supabase } from '@/app/utils/supabase/supabase';
import { NO_ID, SOLUTION_TITLE } from '@/constants/ranking/Line';
import { useUserInfo } from '@/hooks/userHooks/useUserInfo';
import { useUserStore } from '@/store/auth/store';
import React, { useEffect, useRef, useState } from 'react';
import Text from '../common/Text';
import Image from 'next/image';

type TopThreeItem = {
  name: string;
  count: number;
};

type SolutionProps = {
  topThree: TopThreeItem[];
};

const stringifyTopThree = (list: TopThreeItem[]) => {
  //props로 받은 topthree 정렬
  return list
    .map((item) => item.name)
    .sort()
    .join(',');
};

const parseAndSort = (str: string) => {
  //슈베에서 받은 topthree 정렬
  return str
    .split(',')
    .map((s) => s.trim())
    .sort()
    .join(',');
};

const Solution = ({ topThree }: SolutionProps) => {
  const [solution, setSolution] = useState<string | null>(null);
  const { user } = useUserStore();
  const { data: userInfo } = useUserInfo();

  const prevKeywordsRef = useRef<string | null>(null);

  useEffect(() => {
    const makeSolution = async () => {
      const keywords = stringifyTopThree(topThree);
      if (!user) {
        console.error(NO_ID); //del
        return;
      }

      try {
        const { data, error } = await supabase
          .from('user_statistics')
          .select('comment, top_three, created_at')
          .eq('user_id', user)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Supabase 에러 발생:', error);
        }

        // 기존 데이터 중 같은 키워드가 있는지 확인 (내용 일치 기준)
        const matchingEntry = data?.find((entry) => {
          return entry.top_three && parseAndSort(entry.top_three) === keywords;
        });

        if (matchingEntry) {
          setSolution(matchingEntry.comment);
          return;
        }

        const res = await fetch('/utils/rankingSolution', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ keywords })
        });

        if (!res.ok) {
          throw new Error(`서버 오류: ${res.status}`);
        }

        const gptData = await res.json();

        if (typeof gptData === 'string') {
          setSolution(gptData);

          // 중복 저장 방지
          const { data: existing } = await browserClient
            .from('user_statistics')
            .select('id')
            .eq('user_id', user)
            .eq('top_three', keywords)
            .maybeSingle();

          if (!existing) {
            const { error: insertError } = await browserClient
              .from('user_statistics')
              .insert([
                {
                  user_id: user,
                  comment: gptData,
                  top_three: keywords,
                  created_at: new Date().toISOString()
                }
              ]);

            if (insertError) {
              console.log('삽입 에러:', insertError);
            }
          }
        } else {
          setSolution('예상하지 못한 GPT 응답 형식입니다.');
        }
      } catch (error) {
        console.error('솔루션 생성 중 오류 발생:', error);
        setSolution('문제를 불러오는 중 오류가 발생했습니다.');
      }
    };

    const keywords = stringifyTopThree(topThree);

    if (topThree.length > 0 && prevKeywordsRef.current !== keywords) {
      prevKeywordsRef.current = keywords;
      makeSolution();
    }
  }, [topThree, user]);

  return (
    <div className="flex flex-col gap-4 p-5 w-full xl:gap-6 xl:p-10 rounded-[20px] shadow-customCard bg-backgroundSet-normal xl:h-[407px] xl:max-w-[580px]">
      <div className="flex py-2 justify-start items-center gap-2 self-stretch w-full xl:gap-3">
        <Image
          src="/images/ver-default.svg"
          width={24}
          height={24}
          alt="이미지 없음"
        />
        <Text
          as="div"
          variant="title2"
          variant2="heading4"
          color="label-normal"
        >
          {userInfo?.nickname + SOLUTION_TITLE}
        </Text>
      </div>

      {solution ? (
        <Text
          variant="body3"
          color="label-normal"
          className="items-center flex w-full p-4 flex-col justify-center gap-2 rounded-lg bg-primary-1 whitespace-normal break-words xl:p-6 xl:max-w-[500px] xl:h-[240px]"
        >
          {solution}
        </Text>
      ) : (
        <p>솔루션을 생성 중입니다...</p>
      )}
    </div>
  );
};

export default Solution;

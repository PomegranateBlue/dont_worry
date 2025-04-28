'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Text from '../common/Text';
import { useUserInfo } from '@/hooks/userHooks/useUserInfo';
import { useUserStore } from '@/store/auth/store';
import { SOLUTION_TITLE } from '@/constants/ranking/line';
import { useSolutionGenerator } from '@/hooks/ranking/useSolutionGenerator';

export type TopSixItem = {
  name: string;
  count: number;
};

type SolutionProps = {
  topSix: TopSixItem[];
};

const Solution = ({ topSix }: SolutionProps) => {
  const { user } = useUserStore();
  const { data: userInfo } = useUserInfo();
  const { solution, generateSolution, isLoading } = useSolutionGenerator();

  useEffect(() => {
    if (topSix.length > 0 && user) {
      generateSolution(topSix, user);
    }
  }, [topSix, user, generateSolution]);

  return (
    <div className="flex flex-col gap-4 p-5 w-full xl:gap-6 xl:p-10 rounded-[20px] shadow-customCard bg-backgroundSet-normal xl:h-[407px] xl:max-w-[580px]">
      <div className="flex py-2 justify-start items-center gap-2 self-stretch w-full xl:gap-3">
        <Image
          src="/images/ver-default.svg"
          width={24}
          height={24}
          alt="이미지 없음"
          className="lg:hidden"
        />
        <Image
          src="/images/ver-default.svg"
          width={40}
          height={40}
          alt="이미지 없음"
          className="hidden lg:block"
        />
        <Text as="h2" variant="title2" variant2="heading4" color="label-normal">
          {userInfo?.nickname + SOLUTION_TITLE}
        </Text>
      </div>

      {isLoading ? (
        <p>솔루션을 생성 중입니다...</p>
      ) : (
        <Text
          variant="body3"
          color="label-normal"
          className="items-center flex w-full p-4 flex-col justify-center gap-2 rounded-lg bg-primary-1 whitespace-normal break-words xl:p-6 xl:max-w-[500px] xl:h-[240px]"
        >
          {solution}
        </Text>
      )}
    </div>
  );
};

export default Solution;

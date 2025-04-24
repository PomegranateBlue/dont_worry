'use client';

import React from 'react';
import BetterThing from '../BetterThing';
import WorsenedThing from '../WorsenedThing';
import { useRankingStore } from '@/store/ranking/rankingStore';
import {
  REPORT_TITLE_MONTH,
  REPORT_TITLE_WEEK
} from '@/constants/ranking/line';
import useAnalysisTrend from '@/hooks/ranking/useAnalysisTrend';
import useAnaylsisTrendWeek from '@/hooks/ranking/useAnaylsisTrendWeek';
import Text from '@/components/common/Text';

import Image from 'next/image';
import { WEEK_MODE } from '@/constants/ranking/WeekConstants';

const MWreportCard = () => {
  const { year, month, mode, week } = useRankingStore();
  const { data: monthData, loading, error } = useAnalysisTrend(year, month);
  const { data: weekData } = useAnaylsisTrendWeek(year, month, week);
  if (loading) return <div className="p-4">데이터를 불러오는 중...</div>;
  if (error) console.log(error);
  if (!monthData) return;
  if (!weekData) return;

  return (
    <section className="flex flex-col items-center gap-4 p-5 w-full mx-auto xl:p-10 xl:gap-6 xl:max-w-[580px] rounded-[20px] bg-backgroundSet-normal shadow-customCard">
      <div className="flex py-2 justify-start items-center gap-2 self-stretch w-full xl:gap-3">
        <Image
          src="/images/rankingLogo.svg"
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
          {mode === WEEK_MODE ? REPORT_TITLE_WEEK : REPORT_TITLE_MONTH}
        </Text>
      </div>
      <div className="xl:gap-3 xl:items-start gap-4 flex flex-col w-full">
        {/*여기 레이아웃을 잘 정해야함 그래야 gap이 적용됨*/}
        <BetterThing monthData={monthData} weekData={weekData} />
        <WorsenedThing monthData={monthData} weekData={weekData} />
      </div>
    </section>
  );
};

export default MWreportCard;

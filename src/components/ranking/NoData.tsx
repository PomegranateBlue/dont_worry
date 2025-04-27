'use client';
//4/26이후 todo: 폰트 적용 확인 중간 부분 높이가 안 맞는 문제 확인
import React from 'react';
import Text from '../common/Text';
import Image from 'next/image';
import Link from 'next/link';
import {
  IF_HAS_WORRY,
  NO_DATA_CHART1,
  NO_DATA_CHART2
} from '@/constants/ranking/line';
const NoData = () => {
  return (
    <form className="flex flex-col items-center justify-center xl:py-8 xl:p-0 w-screen bg-backgroundSet-card pt-[140px]">
      <div className="w-[375px] xl:w-[1280px] flex items-center flex-col  justify-center">
        <div className="flex flex-col items-center xl:mb-0 xl:py-[40px] w-full justify-center mt-[30px] xl:mt-0">
          <Image
            src="/images/ver-default.svg"
            alt="default 이미지"
            width={128}
            height={128}
            priority
            className="hidden xl:block"
          />
          <Image
            src="/images/ver-default.svg"
            alt="default 이미지"
            width={107}
            height={107}
            priority
            className="xl:hidden"
          />
          <div className="flex flex-col items-center py-5 mb-[155px]">
            <Text
              variant="heading3"
              color="label-normal"
              className="flex w-full max-w-[648px] px-5 py-2 items-center justify-center text-center break-keep"
            >
              {NO_DATA_CHART1}
              <br className="xl:hidden" />
              {NO_DATA_CHART2}
            </Text>
          </div>
        </div>
        <div className="w-full xl:pt-[40px]">
          <Text
            as="span"
            color="label-alternative"
            variant="label1"
            variant2="label1"
            className="flex items-center justify-center px-5 py-2 xl:p-0"
          >
            {IF_HAS_WORRY}
          </Text>
          <div className="flex px-5 py-2 w-full items-center justify-center flex-row">
            <Link href="/note" className="w-full flex justify-center">
              <button
                type="button"
                className="w-full max-w-[648px] h-12 bg-primary-4 rounded-lg flex items-center justify-center"
              >
                <Text as="h3" variant="title2" color="white">
                  걱정 작성하러 가기
                </Text>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};
export default NoData;

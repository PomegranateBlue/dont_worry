'use client';
import React from 'react';
import Text from '../common/Text';
import Image from 'next/image';
import Link from 'next/link';
import {
  GOTO_NOTE,
  IF_HAS_WORRY,
  NO_DATA_CHART1,
  NO_DATA_CHART2
} from '@/constants/ranking/line';

const NoData = () => {
  return (
    <div className="flex flex-col max-h-screen w-full bg-backgroundSet-card items-center">
      <div className="flex flex-col items-center flex-1 w-full max-w-[1280px] pt-[105px]">
        <div className="w-full flex flex-col items-center justify-center px-5 xl:px-0">
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
            {/* 텍스트 */}
            <div className="flex flex-col items-center py-5">
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
        </div>
      </div>
      <div className="xl:h-[78px] h-[87px] md:h-[112px]" />
      <div className="w-full max-w-[1280px] flex flex-col items-center xl:px-0 pt-10">
        <Text
          as="span"
          color="label-alternative"
          variant="label1"
          variant2="label1"
          className="flex items-center justify-center"
        >
          {IF_HAS_WORRY}
        </Text>
        <Link href="/note" className="w-full flex justify-center px-5 py-6">
          <button
            type="button"
            className="w-full max-w-[648px] h-12 bg-primary-4 rounded-lg flex items-center justify-center"
          >
            <Text as="h3" variant="title2" color="white">
              {GOTO_NOTE}
            </Text>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NoData;

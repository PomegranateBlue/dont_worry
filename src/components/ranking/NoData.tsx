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
    <div className="flex flex-col w-full min-h-[calc(100dvh-7.5rem)] bg-backgroundSet-card items-center">
      <div className="flex flex-col items-center w-full max-w-[1280px] flex-1 justify-center">
        <div className="w-full flex flex-col items-center justify-center px-5 xl:px-0">
          <div className="flex flex-col items-center w-full justify-center">
            {/* 이미지들 */}
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

      {/* 하단 영역 */}
      <div className="w-full max-w-[1280px] flex flex-col items-center xl:px-0 py-5">
        <Text
          as="span"
          color="label-alternative"
          variant="label1"
          variant2="label1"
          className="flex items-center justify-center"
        >
          {IF_HAS_WORRY}
        </Text>
        <Link href="/note" className="w-full flex justify-center px-5 p-6">
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

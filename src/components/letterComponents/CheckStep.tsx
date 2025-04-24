'use client';

import React from 'react';
import Text from '../common/Text';
import Image from 'next/image';
import Link from 'next/link';

const CheckStep = () => {
  return (
    <section>
      <nav className="flex h-[56px] px-[6px] justify-center items-center gap-[20px] mb-40 self-stretch">
        <div className="w-96">
          <Text
            variant="title1"
            color="label-normal"
            className="text-center font-pretendard text-[20px] font-semibold leading-[135%]"
          >
            미래 편지 작성
          </Text>
        </div>
      </nav>
      <form className="w-96 flex flex-col justify-between items-center bg-backgroundSet-normal mx-auto px-5 py-8">
        <div className="flex flex-col items-center w-[375px] mb-44">
          <Image
            src="/images/ver-default.svg"
            alt="default 이미지"
            width={150}
            height={150}
            priority
            className="mb-4"
          />
          <nav className="flex flex-col items-start py-5 self-stretch">
            <div className="flex justify-center items-center gap-2 px-5 py-2 self-stretch">
              <Text
                variant="heading3"
                color="label-normal"
                className="text-center font-[500] text-[22px] leading-[135%] font-['IBM Plex Sans KR']"
              >
                미래의 나에게 편지를 보냈어요
              </Text>
            </div>
          </nav>
        </div>
        <div className="w-full mt-10">
          <Link href="/letterbox">
            <button
              type="button"
              className="w-full h-12 bg-primary-4 text-white text-lg font-semibold rounded-lg"
            >
              편지함 바로가기
            </button>
          </Link>
        </div>
      </form>
    </section>
  );
};

export default CheckStep;

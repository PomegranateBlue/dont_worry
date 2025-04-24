'use client';

import React from 'react';
import Text from '../common/Text';
import Image from 'next/image';
import Link from 'next/link';

const NoLetter = () => {
  return (
    <section className="relative w-[375px] flex flex-col justify-center items-center pb-1.5 mx-auto">
      <nav className="w-full flex h-[56px] px-[6px] justify-center items-center gap-[20px] mb-40">
        <Text
          variant="title1"
          color="label-normal"
          className="text-center font-pretendard text-[20px] font-semibold leading-[135%]"
        >
          미래 편지 보관함
        </Text>
      </nav>
      <form className="w-[375px]  flex flex-col items-center bg-backgroundSet-normal mx-auto px-5 py-8">
        <div className="flex flex-col items-center w-full mb-40">
          <Image
            src="/images/ver-sad.svg"
            alt="슬픈 이미지"
            width={150}
            height={150}
            priority
            className="mb-4"
          />
          <nav className="flex items-center py-5 self-stretch">
            <div className="flex flex-col justify-center items-center gap-2 px-5 py-2 self-stretch">
              <Text
                variant="heading3"
                color="label-normal"
                className="text-center font-[500] text-[22px] leading-[135%] font-['IBM Plex Sans KR']"
              >
                아직 보낸 편지가 없어요.
              </Text>
              <Text
                variant="body3"
                color="label-normal"
                className="text-center font-[500] text-[14px] leading-[150%] font-['Pretendard']"
              >
                하단의 버튼을 눌러 나를 위한 편지를 보내보세요
              </Text>
            </div>
          </nav>
        </div>

        {/* <Text>{formattedDate}에 이메일로 편지가 도착해요</Text> */}

        <div className="w-full">
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

export default NoLetter;

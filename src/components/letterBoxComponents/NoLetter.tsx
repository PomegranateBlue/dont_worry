'use client';

import React from 'react';
import Text from '../common/Text';
import Image from 'next/image';
import Link from 'next/link';


const NoLetter = () => {
  return (
    <section className="w-[375px] md:w-[648px] xl:w-[1280px] flex flex-col justify-center items-center md:pb-[42px] mx-auto">
      <nav className="w-full flex h-[56px] px-[6px] justify-center items-center gap-[20px] mb-40 mx-auto">
        <Text
          variant="title1"
          color="label-normal"
          className="flex w-full max-w-[363px] items-center justify-center"
        >
          미래 편지 보관함
        </Text>
      </nav>
      <form className="w-full flex flex-col items-center bg-backgroundSet-normal mx-auto px-5 py-8 md:p-0">
        <div className="flex flex-col items-center w-full mb-[190px]">
          <Image
            src="/images/ver-sad.svg"
            alt="슬픈 이미지"
            width={106}
            height={128}
            priority
            className="mb-4"
          />
          <nav className="flex flex-col items-center py-5 self-stretch">
            <div className="flex flex-col justify-center items-center px-5 py-2 md:px-0 md:py-5 self-stretch">
              <Text variant="heading3" color="label-normal" className="py-2">
                아직 보낸 편지가 없어요.
              </Text>
              <Text variant="body3" color="label-normal" className="py-2">
                하단의 버튼을 눌러 나를 위한 편지를 보내보세요
              </Text>
            </div>
          </nav>
        </div>
        {/* 버튼 */}
        <div className="w-[375px] md:w-[608px] xl">
          <Link href="/letter">
            <button
              type="button"
              className="w-full h-12 bg-primary-4 text-white text-lg font-semibold rounded-lg py-2"
            >
              편지쓰러 가기
            </button>
          </Link>
        </div>
      </form>
    </section>
  );
};

export default NoLetter;

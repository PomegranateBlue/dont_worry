'use client';
//4/26이후 todo: 폰트 적용 확인 중간 부분 높이가 안 맞는 문제 확인
import React from 'react';
import Text from '../common/Text';
import Image from 'next/image';
import Link from 'next/link';
const CheckStep = () => {
  return (
    <section className="w-[375px] xl:w-[1280px] flex items-center flex-col  justify-center xl:gap-[84px]">
      {/*s1*/}
      <nav className="flex h-[56px] px-4 justify-center items-center gap-5 xl:h-[80px] xl:px-10 self-stretch xl:gap-0 mb-[161px]">
        <div className="w-full">
          <Text
            variant="title1"
            color="label-normal"
            className="text-center font-pretendard text-[20px] font-semibold leading-[135%]"
          >
            미래 편지 작성
          </Text>
        </div>
      </nav>
      {/*s1*/}

      {/*gap*/}

      {/*s2*/}
      <form className="w-[375px] flex flex-col items-center justify-center bg-backgroundSet-normal xl:py-8 xl:w-[648px] xl:p-0">
        <div className="flex flex-col items-center xl:mb-0 xl:py-[40px] w-full justify-center">
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
          <nav className="flex flex-col items-start py-5 self-stretch mb-[155px]">
            <Text
              variant="heading3"
              color="label-normal"
              className="flex w-full px-5 py-2 items-center justify-center"
            >
              미래의 나에게 편지를 보냈어요
            </Text>
            <Text
              as="span"
              variant="body3"
              variant2="body2"
              className="flex items-center px-5 py-2 justify-center xl:px-6 w-full"
            >
              {}월{}일에 메일로 편지가 도착해요
            </Text>
          </nav>
          <div className="xl:h-[87px]" />
        </div>
        <div className="w-full xl:pt-[40px]">
          <Text
            as="span"
            color="label-alternative"
            variant2="label1" //todo: 폰트 확인하기 && variant확인
            className="flex items-center justify-center px-5 py-2 xl:p-0"
          >
            작성한 편지는 보관함에서 확인할 수 있어요
          </Text>
          <div className="flex px-5 py-2 w-full xl:py-6 items-center justify-center flex-row">
            <Link href="/letterbox">
              <button
                type="button"
                className="w-[335px] h-12 bg-primary-4 rounded-lg flex items-center justify-center"
              >
                <Text
                  variant="title2"
                  color="white"
                  className="flex justify-center items-center w-full"
                >
                  편지함 바로가기
                </Text>
              </button>
            </Link>
          </div>
        </div>
      </form>
      {/*s2*/}
    </section>
  );
};
export default CheckStep;
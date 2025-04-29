export const dynamic = 'force-static';

import Image from 'next/image';
import Text from '@/components/common/Text';
import StartButton from '@/components/introComponents/StartButton';
import StartButtonBottom from '@/components/introComponents/StartButtonBottom';
import Carousel from '@/components/introComponents/Carousel';

const HomePage = () => {
  return (
    <main className="min-h-screen">
      {/*히어로 섹션 시작  */}
      <section
        className="flex flex-col w-full h-[621px] pt-[60px] relative xl:overflow-hidden xl:flex-row "
        style={{
          background: 'linear-gradient(0deg, #E8E2FF 0%, #8775CA 87.13%)'
        }}
      >
        <div className="relative z-10 flex flex-col items-center justify-center  xl:items-start xl:left-[600px] gap-[40px] xl:bottom-[100px] ">
          {/* 텍스트 */}
          <Text
            variant="display3"
            variant2="display1"
            className="text-center text-backgroundSet-normal xl:text-left"
          >
            말 못할 걱정들..
            <br />
            어딘가 털어놓고 싶다면?
          </Text>
          <div>
            <StartButton />
          </div>
        </div>

        <div className="absolute bottom-[88px] w-full left-1/2 -translate-x-1/2 z-10 md:bottom-[65px] xl:bottom-[55px] ">
          <Carousel />
        </div>

        {/* 배경 일러스트 이미지 */}
        <div className="xl:hidden">
          <Image
            src={'/images/hero-section-bg.svg'}
            alt="hero"
            fill
            priority
            className="absolute  object-cover"
          />
        </div>
        <div className="hidden xl:block">
          <Image
            src={'/images/hero-section-desktop.svg'}
            alt="hero-desktop"
            fill
            priority
            className="absolute object-cover"
          />
        </div>
      </section>
      {/*히어로 섹션 끝끝  */}

      {/* 첫번째 섹션 시작 */}
      <section className="flex flex-col py-[60px] justify-center items-center bg-backgroundSet-normal gap-[40px]">
        <div>
          <Image
            src={'/images/mobile-logo.svg'}
            width={0}
            height={0}
            alt="logo"
            loading="lazy"
            className="min-w-[181px] min-h-[27px]  xl:min-w-[312px] xl:min-h-[40px]"
          />
        </div>

        <div className="flex flex-col justify-center items-center gap-[12px]">
          <Text
            variant="title2"
            variant2="heading1"
            color="primary2"
            className="flex justify-center text-center"
          >
            돈워리는 부정적인 감정을
            <br className="xl:hidden" /> 기록하고, 정리하고, 돌아볼 수 있게 돕는
            <br className="xl:hidden" />
          </Text>
          <Text variant="heading3" color="primary4" variant2="display2">
            정서 기반 감정 기록 플랫폼입니다
          </Text>
        </div>
      </section>
      {/* 첫번째 섹션 끝 */}

      <section className="w-full h-auto flex flex-col bg-primary-1 items-center justify-center px-[20px] py-[60px] gap-[40px] xl:min-h-[752px] xl:px-[60px] xl:py-[80px]">
        <div className="flex flex-col justify-center items-center gap-[12px]">
          <div className="flex bg-primary-4 rounded-[16px] px-3 py-1">
            <Text
              variant="body3"
              variant2="body1"
              className="text-backgroundSet-normal"
            >
              걱정 작성하기
            </Text>
          </div>
          <div>
            <Text variant="heading3" variant2="display2" color="primary4">
              가벼운 한마디로 시작해보세요
            </Text>
          </div>
        </div>
        {/* 단계별 내용 시작*/}
        <div className="flex flex-col justify-center items-center gap-[40px] xl:flex-row xl:gap-[24px] xl:mx-auto  ">
          <div className="flex flex-col gap-[20px]">
            <div className="flex flex-col gap-[8px]  ">
              <div>
                <Text variant="body2" variant2="title2" color="primary4">
                  Step1
                </Text>
              </div>
              <div>
                <Text variant="body2" variant2="body1" color="label-normal">
                  걱정의 주제와 느끼는 감정을 선택해요
                </Text>
              </div>
            </div>
            <div>
              <Image
                src={'/images/step1-final.svg'}
                src={'/images/step1-final.svg'}
                width={0}
                height={0}
                alt="step1"
                loading="lazy"
                className="min-w-[335px] min-h-[150px] xl:min-w-[370px] xl:min-h-[300px]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-[20px]">
            <div className="flex flex-col gap-[8px]  ">
              <div>
                <Text variant="body2" variant2="title2" color="primary4">
                  Step2
                </Text>
              </div>
              <div>
                <Text variant="body2" variant2="body1" color="label-normal">
                  내 걱정과 속마음을 작성해요
                </Text>
              </div>
            </div>
            <div>
              <Image
                src={'/images/step2-final.svg'}
                width={0}
                height={0}
                alt="step2"
                loading="lazy"
                className="min-w-[335px] min-h-[150px] xl:min-w-[370px] xl:min-h-[300px]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-[20px]">
            <div className="flex flex-col gap-[8px]  ">
              <div>
                <Text variant="body2" variant2="title2" color="primary4">
                  Step3
                </Text>
              </div>
              <div>
                <Text
                  variant="body2"
                  variant2="body1"
                  color="label-normal"
                  className="xl:whitespace-nowrap"
                >
                  돈워리가 건네는 위로와 조언을 통해 스스로 성장해요
                </Text>
              </div>
            </div>
            <div className="bg-[#ADA2D7] min-w-[335px] rounded-[8px] xl:min-w-[370px]">
              <Image
                src={'/images/step3-final.svg'}
                width={0}
                height={0}
                alt="step3"
                loading="lazy"
                className="min-w-[335px] min-h-[150px] xl:min-w-[370px] xl:min-h-[300px]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col justify-center items-center bg-backgroundSet-normal min-h-[752px] gap-[40px] px-5 py-[60px] xl:flex-row xl:gap-[80px] xl:min-h-[752px] xl:px-[60px] xl:py-[80px]">
        <div className="flex flex-col justify-center items-center  gap-[24px] xl:items-start xl:text-left ">
          <div className="flex flex-col justify-center items-center gap-[12px] xl:items-start">
            <div className="flex bg-primary-4 rounded-[16px] px-3 py-1 ">
              <Text
                variant="body3"
                variant2="body1"
                className="text-backgroundSet-normal"
              >
                통계
              </Text>
            </div>
            <div className="flex text-center xl:text-left ">
              <Text variant="heading2" variant2="display2" color="primary4">
                통계 데이터를 통해
                <br className="xl:hidden" /> 파악하는 기록
              </Text>
            </div>
          </div>
          <div className="flex">
            <div className="flex xl:text-left">
              <Text variant="body2" variant2="body1" color="label-neutral">
                지금까지 작성한 걱정 기록을 기반으로
                <br className="xl:hidden" />
                나의 감정 패턴과 고민의 주제를 한눈에 확인할 수 있어요
              </Text>
            </div>
          </div>
        </div>

        <div className="flex">
          <Image
            src={'/images/graph.svg'}
            width={0}
            height={0}
            alt="graph"
            loading="lazy"
            className="min-w-[236px] min-h-[236px] md:min-w-[320px] md:min-h-[320px] xl:min-w-[353px] xl:min-h-[353px]"
          />
        </div>
      </section>

      <section className="flex flex-col xl:flex-row-reverse items-center justify-center px-5 py-[60px] bg-primary-1 gap-[40px] xl:gap-[80px] xl:min-h-[752px] xl:px-[60px] xl:py-[80px]">
        <div className="flex flex-col items-center xl:items-start gap-[24px] text-center xl:text-left">
          <div className="flex flex-col items-center xl:items-start gap-[12px]">
            <div className="flex bg-primary-4 rounded-[16px] px-3 py-1">
              <Text
                variant="body3"
                variant2="body1"
                className="text-backgroundSet-normal"
              >
                미래편지
              </Text>
            </div>
            <div className="flex">
              <Text variant="heading2" variant2="display2" color="primary4">
                미래의 나에게 보내는 편지
              </Text>
            </div>
          </div>
          <div className="flex">
            <Text variant="body2" variant2="body1" color="label-neutral">
              지금의 내가 느끼는 감정, 바라는 변화
              <br />
              그리고 전하고 싶은 말들을 미래의 나에게 편지로 남겨보세요
            </Text>
          </div>
        </div>

        <div className="flex w-full xl:w-[335px] justify-center xl:justify-start">
          <Image
            src="/images/future-letter-final.svg"
            width={335}
            height={335}
            alt="future"
            className="w-[260px] h-auto xl:w-[335px]"
            loading="lazy"
          />
        </div>
      </section>
      <section className="flex flex-col justify-center items-center h-[630px] bg-primary-1 gap-[40px] xl:gap-[60px] xl:min-h-[752px] xl:px-[60px] xl:py-[80px]">
        <Text
          variant="heading2"
          variant2="display2"
          color="primary4"
          className="flex text-center"
        >
          여러분의 고민은 무엇인가요?
          <br /> 돈워리를 통해 이야기를 들려주세요
        </Text>
        <div>
          <Image
            src={'/images/intro-emoticon.svg'}
            width={0}
            height={0}
            alt="main"
            className="min-w-[253px] min-h-[160px]  xl:max-w-[317px] xl:min-h-[200px]"
          />
        </div>

        <StartButtonBottom />
      </section>

      <section className="hidden xl:flex xl:w-full xl:h-[320px] xl:px-[60px] xl:py-[40px] xl:justify-between xl:items-start bg-backgroundSet-card text-label-neutral text-[14px]">
        {/* 왼쪽 영역 */}
        <div className="flex flex-col gap-[12px]">
          {/* 로고 */}
          <div className="flex items-center gap-[8px]">
            <Image
              src="/images/ver-default.svg"
              alt="footer-emoticon"
              width={28}
              height={28}
              loading="lazy"
            />
            <Image
              src="/images/mobile-logo.svg"
              alt="footer-logo"
              width={180}
              height={27}
              loading="lazy"
            />
          </div>

          {/* 버전 정보 */}
          <div className="text-primary-4 font-bold">v1.0.0</div>

          {/* 연락처 */}
          <div className="flex gap-[4px]">
            <span className="font-medium">Contact</span>
            <span>abcd_1234@gmail.com</span>
          </div>

          {/* 이용약관 / 개인정보처리방침 */}
          <div className="flex gap-[12px]">
            <button className="underline">이용약관</button>
            <button className="underline">개인정보처리방침</button>
          </div>

          {/* 저작권 */}
          <div className="text-[13px] text-label-disable">
            Copyright © Don’t Worry All rights reserved
          </div>
        </div>

        {/* 오른쪽 링크 목록 */}
        <div className="grid grid-cols-2 gap-x-[40px] gap-y-[8px] text-label-normal">
          <Text variant="label1" color="label-assistive">
            돈워리
          </Text>
          <Text variant="label1" color="label-assistive">
            서비스
          </Text>
          <Text variant="label1" color="label-assistive">
            서비스 소개
          </Text>
          <Text variant="label1" color="label-assistive">
            서비스 이용약관
          </Text>
          <Text variant="label1" color="label-assistive">
            걱정 작성
          </Text>
          <Text variant="label1" color="label-assistive">
            개인정보처리방침
          </Text>
          <Text variant="label1" color="label-assistive">
            걱정 보관함
          </Text>
          <Text variant="label1" color="label-assistive">
            고객 센터
          </Text>
          <Text variant="label1" color="label-assistive">
            통계
          </Text>
          <Text variant="label1" color="label-assistive">
            미래 편지 작성
          </Text>
        </div>
      </section>
    </main>
  );
};

export default HomePage;

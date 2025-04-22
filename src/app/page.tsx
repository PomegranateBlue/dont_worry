// export const dynamic = 'force-static';

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
        className="flex flex-col w-full h-[621px] pt-[60px] relative overflow-hidden"
        style={{
          background: 'linear-gradient(0deg, #E8E2FF 0%, #8775CA 87.13%)'
        }}
      >
        <div className="relative z-10 flex flex-col items-center justify-center">
          {/* 텍스트 */}
          <Text
            variant="display3"
            className="text-center text-backgroundSet-normal"
          >
            말 못할 걱정들..
            <br />
            어딘가 털어놓고 싶다면?
          </Text>

          {/* 버튼과 배경 이미지 사이 30px */}
          <div className="mt-[40px] mb-[40px]">
            <StartButton />
          </div>
        </div>

        {/* 캐러셀: 섹션 바닥 기준으로 62px 위 */}
        <div className="absolute bottom-[88px] left-1/2 -translate-x-1/2 z-10 ">
          <Carousel />
        </div>

        {/* 배경 일러스트 이미지: 섹션 바닥에 붙음 */}
        <div>
          <Image
            src={'/images/hero-section.svg'}
            alt="hero"
            width={430}
            height={356}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 z-0 object-cover"
          />
        </div>
      </section>
      {/*히어로 섹션 끝끝  */}

      {/* 첫번째 섹션 시작 */}
      <section className="flex flex-col py-[60px] justify-center items-center bg-backgroundSet-normal gap-[40px]">
        <div>
          <Image
            src={'/images/mobile-logo.svg'}
            width={180}
            height={24}
            alt="logo"
          />
        </div>

        <div className="flex flex-col justify-center items-center gap-[12px]">
          <Text
            variant="title2"
            color="primary2"
            className="flex justify-center text-center"
          >
            돈워리는 부정적인 감정을
            <br /> 기록하고, 정리하고, 돌아볼 수 있게 돕는
            <br />
          </Text>
          <Text variant="heading3" color="primary4">
            정서 기반 감정 기록 플랫폼입니다
          </Text>
        </div>
      </section>
      {/* 첫번째 섹션 끝 */}

      <section className="w-full h-auto flex flex-col bg-primary-1 items-center justify-center px-[20px] py-[60px] gap-[40px]">
        <div className="flex flex-col justify-center items-center gap-[12px]">
          <div className="flex bg-primary-4 rounded-[16px] px-3 py-1">
            <Text variant="body3" className="text-backgroundSet-normal">
              걱정 작성하기
            </Text>
          </div>
          <div>
            <Text variant="heading3" color="primary4">
              가벼운 한마디로 시작해보세요
            </Text>
          </div>
        </div>
        {/* 단계별 내용 시작*/}
        <div className="flex flex-col justify-center items-center gap-[40px]">
          <div className="flex flex-col gap-[20px]">
            <div className="flex flex-col gap-[8px]  ">
              <div>
                <Text variant="body2" color="primary4">
                  Step1
                </Text>
              </div>
              <div>
                <Text variant="body2" color="label-normal">
                  걱정의 주제와 느끼는 감정을 선택해요
                </Text>
              </div>
            </div>
            <div>
              <Image
                src={'images/step1-final.svg'}
                width={335}
                height={300}
                alt="step1"
              />
            </div>
          </div>

          <div className="flex flex-col gap-[20px]">
            <div className="flex flex-col gap-[8px]  ">
              <div>
                <Text variant="body2" color="primary4">
                  Step2
                </Text>
              </div>
              <div>
                <Text variant="body2" color="label-normal">
                  내 걱정과 속마음을 작성해요
                </Text>
              </div>
            </div>
            <div>
              <Image
                src={'images/step2-final.svg'}
                width={335}
                height={300}
                alt="step2"
              />
            </div>
          </div>

          <div className="flex flex-col gap-[20px]">
            <div className="flex flex-col gap-[8px]  ">
              <div>
                <Text variant="body2" color="primary4">
                  Step3
                </Text>
              </div>
              <div>
                <Text variant="body2" color="label-normal">
                  돈워리가 건네는 위로와 조언을 통해 스스로 성장해요
                </Text>
              </div>
            </div>
            <div>
              <Image
                src={'images/step3-final.svg'}
                width={335}
                height={300}
                alt="step3"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col justify-center items-center bg-backgroundSet-normal px-5 py-[60px]">
        <div className="flex flex-col justify-center items-center gap-[24px]">
          <div className="flex flex-col justify-center items-center gap-[12px]">
            <div className="flex bg-primary-4 rounded-[16px] px-3 py-1">
              <Text variant="body3" className="text-backgroundSet-normal">
                통계
              </Text>
            </div>
            <div className="flex text-center ">
              <Text variant="heading2" color="primary4">
                통계 데이터를 통해
                <br /> 파악하는 기록
              </Text>
            </div>
          </div>
          <div className="flex">
            <div className="flex">
              <Text variant="body2" color="label-neutral">
                지금까지 작성한 걱정 기록을 기반으로
                <br />
                나의 감정 패턴과 고민의 주제를 한눈에 확인할 수 있어요
              </Text>
            </div>
          </div>
        </div>

        <div>
          <Image
            src={'images/graph.svg'}
            width={335}
            height={335}
            alt="graph
          "
          />
        </div>
      </section>

      <section className="flex flex-col items-center justify-center px-5 py-[60px] bg-primary-1">
        <div className="flex flex-col justify-center items-center gap-[24px]">
          <div className="flex flex-col justify-center items-center gap-[12px]">
            <div className="flex bg-primary-4 rounded-[16px] px-3 py-1">
              <Text variant="body3" className="text-backgroundSet-normal">
                미래편지
              </Text>
            </div>
            <div className="flex text-center ">
              <Text variant="heading2" color="primary4">
                미래의 나에게 보내는 편지
              </Text>
            </div>
          </div>
          <div className="flex">
            <div className="flex">
              <Text
                variant="body2"
                color="label-neutral"
                className="whitespace-nowrap"
              >
                지금의 내가 느끼는 감정, 바라는 변화, 그리고 <br /> 전하고 싶은
                말들을 미래의 나에게 편지로 남겨보세요
              </Text>
            </div>
          </div>
        </div>

        <div>
          <div>
            <Image
              src={'/images/future-letter-final.svg'}
              width={335}
              height={335}
              alt="future"
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col h-[630px] justify-center items-center px-5 py-[60px]">
        <div className="">
          <div>
            <Text variant="body3" color="white">
              커뮤니티
            </Text>
          </div>
          <div>
            <Text variant="heading2" color="primary4">
              다른 사람들의 이야기
            </Text>
          </div>
          <div>
            <Text variant="body2" color="label-neutral" className="px-4 pt-6">
              익명의 사용자들과 서로의 고민을 읽고, 공감하며 응원의 댓글을
              나눠보세요
            </Text>
          </div>
        </div>

        <div>
          <Image
            src={'images/community-final.svg'}
            width={335}
            height={300}
            alt="community"
          />
        </div>
      </section>

      <section className="flex flex-col justify-center items-center h-[630px] bg-[#F3F0FF]">
        <Text variant="heading2" color="primary4" className="flex text-center">
          여러분의 고민은 무엇인가요?
          <br /> 돈워리를 통해 이야기를 들려주세요
        </Text>
        <Image
          src={'/images/intro-emoticon.svg'}
          width={253}
          height={160}
          alt="main"
          className=" pt-20 pb-20"
        />
        <StartButtonBottom />
      </section>
    </main>
  );
};

export default HomePage;

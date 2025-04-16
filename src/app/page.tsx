import Image from 'next/image';
import Text from '@/components/common/Text';
import StartButton from '@/components/introComponents/StartButton';
import StartButtonBottom from '@/components/introComponents/StartButtonBottom';
const HomePage = () => {
  return (
    <main className="min-h-screen">
      <section
        className="w-full h-[752px] pt-[60px] pb-[60px]"
        style={{
          background: 'linear-gradient(0deg, #E8E2FF 0%, #8775CA 100%)'
        }}
      >
        <div className="flex flex-col items-center justify-center">
          <Text variant="display3" className="text-center text-[#FFFFFF]">
            말 못할 걱정들..
            <br />
            어딘가 털어놓고 싶다면?
          </Text>
          <Image
            className="pt-20 pb-20"
            src={'/images/intro-emoticon.svg'}
            width={253}
            height={160}
            alt="main"
          />
          <StartButton />
        </div>
      </section>

      <section className="flex flex-col h-[630px] justify-center items-center bg-backgroundSet-normal">
        <Text
          variant="title1"
          color="label-normal"
          className="flex justify-center text-center"
        >
          돈워리는 부정적인 감정을
          <br /> 기록하고, 정리하고, 돌아볼 수 있게 돕는
          <br /> 정서 기반 감정 기록 플랫폼입니다.
        </Text>
        <Image
          src={'/images/ver-default.svg'}
          width={160}
          height={123}
          alt="logo"
          className="pt-20"
        />
      </section>

      <section className="w-full h-auto flex flex-col bg-primary-1 items-center justify-center pt-5 pb-5">
        <Text
          color="white"
          variant="title2"
          className="flex items-center justify-center bg-[#47484C] rounded-[40px] w-[178px] h-[48px] px-5 py-4 "
        >
          돈워리 서비스
        </Text>
        <Text
          color="primary4"
          variant="heading2"
          className="pt-[60px] pb-[60px]"
        >
          가벼운 한 마디로 시작해보세요
        </Text>
        <Image
          src={'/images/note-step1.svg'}
          width={300}
          height={300}
          alt="step1"
        ></Image>
        <Image
          src={'/images/note-step2.svg'}
          width={300}
          height={300}
          alt="step2"
        ></Image>
        <Image
          src={'/images/note-step3.svg'}
          width={300}
          height={300}
          alt="step3"
        ></Image>
      </section>

      <section className="flex flex-col justify-center items-center h-[630px] bg-backgroundSet-normal">
        <Text variant="heading2" color="primary4" className="text-center">
          통계 데이터를 통해
          <br />
          파악하는 기록
        </Text>
        <Text variant="body2" className="text-label-neutral pt-6 px-5">
          지금까지 작성한 걱정 기록을 기반으로, 나의 감정 패턴과 고민의 주제를
          한눈에 확인할 수 있어요
        </Text>
      </section>

      <section className="flex flex-col items-center justify-center h-[630px] bg-primary-1">
        <Text variant="heading2" color="primary4">
          미래의 나에게 보내는 편지
        </Text>
        <Text variant="body2" className="text-label-neutral pt-6 px-4">
          지금의 내가 느끼는 감정, 바라는 변화, 그리고 전하고 싶은 말들을 미래의
          나에게 편지로 남겨보세요
        </Text>
      </section>

      <section className="flex flex-col h-[630px] justify-center items-center">
        <Text variant="heading2" color="primary4">
          다른 사람들의 이야기
        </Text>
        <Text variant="body2" color="label-neutral" className="px-4 pt-6">
          익명의 사용자들과 서로의 고민을 읽고, 공감하며 응원의 댓글을
          나눠보세요
        </Text>
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

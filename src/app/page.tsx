import Image from 'next/image';
import { Plus } from 'lucide-react';
const HomePage = () => {
  return (
    <main className="min-h-screen">
      <section className="w-full h-[482px] bg-black">Hero section</section>
      <section className="bg-gray-100 py-10 px-6 text-center">
        <h2 className="flex justify-center text-center text-xl font-bold  p-10">
          마음의 고민을
          <br />
          이곳에서 묻어보세요
        </h2>
        <div className="flex flex-col justify-center items-center gap-[20px]">
          <Image
            src="/images/userInput.svg"
            width={280}
            height={60}
            alt="userInput"
          />
          <Image
            src="/images/gptAnswer.svg"
            width={280}
            height={60}
            alt="gptAnswer"
          />
        </div>
      </section>
      <section className="bg-white py-10 px-6 text-center">
        <p className="flex text-center font-bold text-xl justify-center p-10">
          한눈에 보는 나의 마음 상태는?
          <br />
          바로 확인해보세요!
        </p>
        <div className="bg-green-500 h-[110px]">이미지 삽입</div>
      </section>
      <section className="bg-gray-100 py-10 px-6 text-center">
        <p className="text-center font-bold ">
          미래의 나 자신에게
          <br />
          편지를 보내보세요
        </p>
        <Image src="/images/mail.svg" width={280} height={80} alt="mail" />
        <button className="flex justify-center items-center mx-auto px-6 py-3 bg-black text-white rounded-xl font-semibold">
          <Plus />
          서비스 시작하기
        </button>
      </section>
    </main>
  );
};

export default HomePage;

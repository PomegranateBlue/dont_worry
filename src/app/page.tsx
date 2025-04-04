import Image from 'next/image';

const HomePage = () => {
  return (
    <main className="min-h-screen">
      <section className="w-full h-[482px] bg-black">Hero section</section>
      <section className="w-full h-[110px] bg-slate-400">
        <p className="text-center text-xl font-bold">
          마음의 고민을
          <br />
          이곳에서 묻어보세요
        </p>
        <Image
          src="/images/userInput.svg"
          width={280}
          height={60}
          alt="userInput"
        />
      </section>
      <section className="w-full h-[110px]"></section>
      <section className="w-full h-[110px]"></section>
    </main>
  );
};

export default HomePage;

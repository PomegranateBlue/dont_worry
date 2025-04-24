'use client';
import { PATHS } from '@/constants/common/paths';
import {
  ChevronLeft,
  CircleChevronLeft,
  CircleChevronRight
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const memberCards = [
  {
    name: '송제우',
    image: '/face-tutor.png',
    address: 'GitHub',
    github: 'https://github.com/PomegranateBlue',
    line: 'INTRODUCTION',
    intro1: '인트로1',
    intro2: '인트로2'
  },
  {
    name: '오원택',
    image: '/face-one.png',
    address: 'GitHub',
    github: 'https://github.com/dhdnjs0702',
    line: 'INTRODUCTION',
    intro1: '인트로1',
    intro2: '인트로2'
  },
  {
    name: '문정빈',
    image: '/face-yeon.png',
    address: 'GitHub',
    github: 'https://github.com/answq',
    line: 'INTRODUCTION',
    intro1: '인트로1',
    intro2: '인트로2'
  },
  {
    name: '유익환',
    image: '/face-IU.png',
    address: 'GitHub',
    github: 'https://github.com/ick-web/',
    line: 'INTRODUCTION',
    intro1: '인트로1',
    intro2: '인트로2'
  },
  {
    name: '강혜린',
    image: '/face-doni.png',
    address: 'GitHub',
    github: 'https://github.com/hyerin-kang',
    line: 'INTRODUCTION',
    intro1: '인트로1',
    intro2: '인트로2'
  }
];

const TeamPage = () => {
  const [view, setView] = useState(0);

  const handlePrev = () => {
    setView((prev) => (prev === 0 ? memberCards.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setView((prev) => (prev === memberCards.length - 1 ? 0 : prev + 1));
  };
  return (
    <div className="flex flex-col min-h-screen">
      {/* 왼쪽 상단 뒤로가기 아이콘 */}
      <div className="relative flex items-center justify-center h-16 border-b">
        <Link href={PATHS.MYPAGE} className="absolute left-4 p-2">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-xl font-semibold">DONT WORRY 팀을 소개 합니다!</h1>
      </div>

      {/* 가운데 콘텐츠 */}
      <div className="flex flex-col items-center flex-1 mt-4">
        <div className="wrapper w-full h-screen flex flex-col justify-center items-center overflow-hidden">
          <div className="rounded-3xl w-full h-full flex justify-center items-center bg-color-black1 m-3">
            <div className="w-[90%] h-[500px] flex flex-col relative overflow-hidden -mt-20">
              <div
                className="absolute top-0 left-0 w-full h-full flex flex-row transition-transform duration-500"
                style={{ transform: `translateX(-${view * 100}%)` }}
              >
                {memberCards.map((card, index) => (
                  <div
                    key={index}
                    className="w-full h-full shrink-0 flex flex-col justify-center items-center"
                  >
                    <div className="border rounded-3xl w-full h-2/3 flex justify-center items-center gap-8">
                      <div className="flex justify-center items-center">
                        <Image
                          src={card.image}
                          alt={`${card.name} Logo`}
                          width={240}
                          height={240}
                          className="bg-white rounded-full"
                        />
                      </div>
                      <div className="w-3/6 flex flex-col justify-center items-start transition-all duration-300">
                        <h1 className="text-5xl font-bold mb-4">{card.name}</h1>
                        <h3 className="text-lg text-neutral-300 font-semibold">
                          {card.address}
                        </h3>
                        <a
                          href={card.github}
                          className="text-blue-400 font-semibold hover:underline mb-4"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {card.github}
                        </a>
                        <h3 className="text-lg text-neutral-300 font-semibold">
                          {card.line}
                        </h3>
                        <p className="w-full flex text-neutral-300 font-semibold">
                          {card.intro1}
                          <br />
                          {card.intro2}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="w-full absolute bottom-7 left-1/2 transform -translate-x-1/2 flex justify-center gap-4">
                <button onClick={handlePrev}>
                  <CircleChevronLeft className="text-4xl transition-all duration-300 hover:text-color-orange2" />
                </button>
                <button onClick={handleNext}>
                  <CircleChevronRight className="text-4xl transition-all duration-300 hover:text-color-orange2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;

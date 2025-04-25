'use client';

import Text from '@/components/common/Text';
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
    image: '/images/wontaek-face.png',
    github: 'https://github.com/PomegranateBlue',
    intro1: '함께하면 두려울 게 없는 든든한 리더!',
    intro2: '항상 팀을 배려하며 최고의 결과를 이끄는 조타수입니다.'
  },
  {
    name: '오원택',
    image: '/images/wontaek-face.png',
    github: 'https://github.com/dhdnjs0702',
    intro1: '우리 팀의 부리더이자 분위기 메이커!',
    intro2: '상황 판단이 빠르고 센스 넘치는 전략가예요.'
  },
  {
    name: '문정빈',
    image: '/images/wontaek-face.png',
    github: 'https://github.com/answq',
    intro1: '사용자 관점에서 생각하는 개발자!',
    intro2: '섬세한 관찰력으로 사용자 흐름을 잡아줘요.'
  },
  {
    name: '유익환',
    image: '/images/wontaek-face.png',
    github: 'https://github.com/ick-web/',
    intro1: '코드로 감동을 주는 개발자!',
    intro2: '논리적이면서도 창의적인 해결사입니다.'
  },
  {
    name: '강혜린',
    image: '/images/hyerin-face.png',
    github: 'https://github.com/hyerin-kang',
    intro1: 'UI/UX 디자인에 진심인 개발자',
    intro2: '유저의 경험을 중시한 감성 넘치는 화면 구성을 제공합니다.'
  },
  {
    name: '소수현',
    image: '/images/suhyeon-face',
    github: 'https://github.com/designer1',
    intro1: '디자인 감각이 뛰어난 우리의 아트 디렉터',
    intro2: '멋진 디자인으로 프로젝트에 생명을 불어넣어요.'
  },
  {
    name: '김효임',
    image: '/images/wontaek-face.png',
    github: 'https://github.com/designer2',
    intro1: '브랜드 아이덴티티의 마법사',
    intro2: '세련된 디자인으로 사용자 경험을 극대화시켜요.'
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
    <div className="min-h-screen bg-purple-50  font-sans flex flex-col">
      {/* Header */}
      <div className="relative flex items-center justify-center h-16 bg-white">
        <Link href={PATHS.MYPAGE} className="absolute left-4 p-2">
          <ChevronLeft />
        </Link>
        <Text variant={'heading3'} color={'primary4'}>
          💜 우리 팀을 소개할게요! 💜
        </Text>
      </div>

      {/* 프로젝트 소개 섹션 */}
      <section className="w-full px-6 py-16 bg-gradient-to-b from-[#f3f0ff] to-white flex flex-col items-center gap-5 text-center">
        <Text variant={'heading3'} color={'primary4'}>
          Don’t Worry – 걱정이 많아도 괜찮아!
        </Text>
        <Text variant={'body1'} color={'label-neutral'}>
          <span>밤마다 걱정이 머리를 떠나지 않나요?</span>
          <br />
          Don’t Worry는 그런 당신을 위한, 귀엽고 직관적인{' '}
          <strong>‘마음 정리 도우미’</strong>
          입니다.
        </Text>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-8 max-w-5xl w-full">
          <div className="bg-white shadow-sm rounded-xl p-6 text-left border border-color-purple3 ">
            <Text variant={'title1'} color={'primary4'} className="mb-2">
              ✏️ 걱정 작성
            </Text>
            <Text variant={'body2'} color="label-alternative">
              고민을 적고, AI에게 따뜻한 위로를 받아보세요.
            </Text>
          </div>
          <div className="bg-white shadow-sm rounded-xl p-6 text-left border border-color-purple3 ">
            <Text variant={'title1'} color={'primary4'} className="mb-2">
              📥 걱정 보관함
            </Text>
            <Text variant={'body2'} color="label-alternative">
              작성한 걱정과 위로를 언제든 다시 확인할 수 있어요.
            </Text>
          </div>
          <div className="bg-white shadow-sm rounded-xl p-6 text-left border border-color-purple3 ">
            <Text variant={'title1'} color={'primary4'} className="mb-2">
              📊 걱정 분석
            </Text>
            <Text variant={'body2'} color="label-alternative">
              반복된 고민을 분석해 나만의 걱정 패턴을 찾아보세요.
            </Text>
          </div>
          <div className="bg-white shadow-sm rounded-xl p-6 text-left border border-color-purple3 ">
            <Text variant={'title1'} color={'primary4'} className="mb-2">
              💌 미래의 나에게
            </Text>
            <Text variant={'body2'} color="label-alternative">
              미래의 나에게 편지를 쓰며 변화된 나를 만나보세요.
            </Text>
          </div>
        </div>

        <div className="max-w-4xl mt-10 text-neutral-600 text-sm">
          <h4 className="font-semibold text-lg text-color-purple2 mb-2">
            🤝 우리 팀은 이렇게 협업했어요
          </h4>
          <ul className="list-disc list-inside space-y-1 text-left">
            <li>매일 짧은 스크럼으로 진행 상황을 공유했어요</li>
            <li>문제가 생기면 바로 모여서 해결 방안을 찾았어요</li>
            <li>디자인-개발 간 피드백을 적극적으로 주고받았어요</li>
            <li>끝까지 포기하지 않고, 함께 완성해냈어요</li>
          </ul>
        </div>
      </section>

      {/* Content */}
      <div className="flex flex-1 justify-center items-center px-4 py-8">
        <div className="w-full max-w-4xl flex flex-col items-center">
          {/* 흰 박스 */}
          <div className="w-full bg-white rounded-3xl shadow-md p-6">
            {/* 슬라이드 */}
            <div className="overflow-hidden relative">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${view * 100}%)` }}
              >
                {memberCards.map((member, index) => (
                  <div
                    key={index}
                    className="min-w-full flex flex-col items-center justify-center gap-6"
                  >
                    <div className="w-48 h-48 rounded-full bg-purple-100 flex items-center justify-center overflow-hidden border-4 border-purple-200 shadow-md">
                      <Image
                        src={member.image}
                        alt={`${member.name} 이미지`}
                        width={200}
                        height={200}
                      />
                    </div>
                    <div className="text-center flex flex-col gap-4">
                      <Text variant={'heading2'}>{member.name}</Text>
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Text
                          variant={'heading5'}
                          color={'primary4'}
                          className="underline"
                        >
                          GitHub 바로가기
                        </Text>
                      </a>
                      <Text variant={'body2'} color={'label-neutral'}>
                        {member.intro1}
                        <br />
                        {member.intro2}
                      </Text>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 👇 흰 박스 바깥, 아래쪽 버튼 */}
          <div className="mt-5 flex gap-6">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-purple-200 text-purple-800 hover:bg-purple-300 shadow"
            >
              <CircleChevronLeft className="mx-auto" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-purple-200 text-purple-800 hover:bg-purple-300 shadow"
            >
              <CircleChevronRight className="mx-auto" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { CircleChevronLeft, CircleChevronRight } from 'lucide-react';
import Text from '@/components/common/Text';

type Member = {
  name: string;
  role: string;
  image: string;
  github?: string;
  intro1: string;
  intro2: string;
};

const MemberSlide = ({ members }: { members: Member[] }) => {
  const clonedMembers = [members[members.length - 1], ...members, members[0]];
  const [view, setView] = useState(1);
  const [isAnimating, setIsAnimating] = useState(true);
  const [initialRender, setInitialRender] = useState(true);

  const widthPercentage = 100; // 한 슬라이드 너비

  const handlePrev = () => {
    if (!isAnimating) return;
    setView((prev) => prev - 1);
  };

  const handleNext = () => {
    if (!isAnimating) return;
    setView((prev) => prev + 1);
  };

  useEffect(() => {
    if (view === 0) {
      setTimeout(() => {
        setIsAnimating(false);
        setView(clonedMembers.length - 2); // 마지막 진짜 멤버
      }, 500);
    } else if (view === clonedMembers.length - 1) {
      setTimeout(() => {
        setIsAnimating(false);
        setView(1); // 첫 번째 진짜 멤버
      }, 500);
    } else {
      setIsAnimating(true);
    }
  }, [view]);

  useEffect(() => {
    // 초기 렌더 이후 애니메이션 활성화
    const timer = setTimeout(() => setInitialRender(false), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-1 justify-center items-center px-4 py-8">
      <div className="w-full max-w-4xl flex flex-col items-center">
        <div className="w-full bg-white rounded-3xl shadow-md p-6">
          <div className="overflow-hidden relative">
            <motion.div
              className="flex"
              animate={{ x: `-${view * widthPercentage}%` }}
              transition={
                !initialRender && isAnimating
                  ? { duration: 0.5, ease: 'easeInOut' }
                  : { duration: 0 }
              }
            >
              {clonedMembers.map((member, index) => (
                <div
                  key={index}
                  className="min-w-full flex flex-col items-center justify-center gap-6"
                >
                  <div className="w-48 h-48 rounded-full bg-white flex items-center justify-center overflow-hidden border-4 border-purple-200 shadow-md">
                    <Image
                      src={member.image}
                      alt={`${member.name} 이미지`}
                      width={200}
                      height={200}
                    />
                  </div>
                  <div className="text-center flex flex-col gap-4 items-center">
                    <div className="flex items-center gap-2">
                      <Text variant="heading2" color="label-normal">
                        {member.name}
                      </Text>
                      <Text
                        variant="heading5"
                        color="label-alternative"
                        className="mt-1"
                      >
                        {member.role}
                      </Text>
                    </div>
                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Text
                          variant="heading5"
                          color="primary4"
                          className="underline"
                        >
                          GitHub 바로가기
                        </Text>
                      </a>
                    )}
                    <Text variant="body2" color="label-neutral">
                      {member.intro1}
                      <br />
                      {member.intro2}
                    </Text>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* 버튼 */}
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
  );
};

export default MemberSlide;

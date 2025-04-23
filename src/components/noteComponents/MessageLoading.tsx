'use client';

import Text from '../common/Text';
import Lottie from 'react-lottie';
import type { AnimationConfigWithData } from 'lottie-web';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const MessageLoading = () => {
  const [animation, setAnimation] = useState<
    AnimationConfigWithData['animationData'] | null
  >(null);
  const [dotIndex, setDotIndex] = useState(0);
  const dotArray = ['', '.', '..', '...'];

  useEffect(() => {
    fetch('/images/lottie.json') // public 경로 기준
      .then((res) => res.json())
      .then((data) => setAnimation(data))
      .catch((err) => {
        console.error('Lottie JSON 로딩 실패:', err);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotIndex((prev) => (prev + 1) % dotArray.length);
    }, 500);
    return () => clearInterval(interval);
  }, []);
  
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  return (
    <div className="absolute inset-0 z-50 bg-backgroundSet-offwhite flex flex-col justify-center items-center text-center gap-[16px]">
      <div>
        <Text variant="body1" color="label-normal">
          걱정이가 답장을 쓰고 있어요
          <br />
          잠시만 기다려주세요
          <motion.span
            key={dotIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="inline-block ml-1"
          >
            {dotArray[dotIndex]}
          </motion.span>
        </Text>
      </div>
      <div className="w-[200px] h-[200px]">
        {animation && <Lottie options={defaultOptions} />}
      </div>
    </div>
  );
};

export default MessageLoading;

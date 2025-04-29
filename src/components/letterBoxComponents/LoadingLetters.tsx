'use client';

import Text from '../common/Text';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const LoadingLetters = () => {
  const [dotIndex, setDotIndex] = useState(0);
  const dotArray = ['', '.', '..', '...'];

  useEffect(() => {
    const interval = setInterval(() => {
      setDotIndex((prev) => (prev + 1) % dotArray.length);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center text-center gap-4 py-10">
      <Text variant="body1" color="label-normal">
        편지를 가져오는 중이에요
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
      <div className="w-36 h-36 relative">
        <Image
          src="/images/ver2-default.svg"
          alt="편지 가져오는 중"
          fill
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>
    </div>
  );
};

export default LoadingLetters;

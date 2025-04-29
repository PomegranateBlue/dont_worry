'use client';

import Text from '../common/Text';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const LoadingSaveLetter = () => {
  const [dotIndex, setDotIndex] = useState(0);
  const dotArray = ['', '.', '..', '...'];

  useEffect(() => {
    const interval = setInterval(() => {
      setDotIndex((prev) => (prev + 1) % dotArray.length);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-[375px] md:w-[768px] xl:w-[1280px] flex flex-col justify-center items-center text-center gap-4 py-10">
      <Text variant="body1" color="label-normal">
        편지를 저장하고 있어요!
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
          alt="편지 저장하는 중"
          fill
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>
    </section>
  );
};

export default LoadingSaveLetter;

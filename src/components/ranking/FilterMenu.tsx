'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import React from 'react';
import {
  CHART_FILTER_EMOTION,
  CHART_FILTER_TOPIC
} from '@/constants/ranking/Line';

const FilterMenu = () => {
  const pathName = usePathname();
  const isTopic = pathName === '/ranking';
  const isEmotion = pathName === '/ranking/emotions-rank';

  return (
    <div className="w-[335px]">
      <div className="relative flex h-10 rounded-full bg-label-disable overflow-hidden">
        {/* 애니메이션 바 */}
        <motion.div
          layout
          layoutId="tabHighlight"
          className="absolute top-0 h-full w-1/2 rounded-full bg-primary-4"
          initial={false}
          animate={{
            left: isEmotion ? '50%' : '0%'
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
        <div className="relative z-10 flex w-full text-sm font-semibold">
          <Link href="/ranking" className="w-1/2">
            <div
              className={`flex justify-center items-center w-full h-full rounded-full transition-all duration-200 ${
                isTopic ? 'text-backgroundSet-normal' : 'text-label-alternative'
              }`}
            >
              {CHART_FILTER_TOPIC}
            </div>
          </Link>

          <Link href="/ranking/emotions-rank" className="w-1/2">
            <div
              className={`flex justify-center items-center w-full h-full rounded-full transition-all duration-200 ${
                isEmotion
                  ? 'text-backgroundSet-normal'
                  : 'text-label-alternative'
              }`}
            >
              {CHART_FILTER_EMOTION}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FilterMenu;

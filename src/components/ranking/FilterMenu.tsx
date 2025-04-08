'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { motion } from 'framer-motion';
import {
  CHART_FILTER_EMOTION,
  CHART_FILTER_TOPIC
} from '@/constants/ranking/Line';
const FilterMenu = () => {
  const pathName = usePathname();
  return (
    <div className="flex gap-15 text-black relative justify-center items-center w-full">
      <Link href="/ranking" className="relative">
        {CHART_FILTER_TOPIC}
      </Link>
      <Link href="/ranking/emotions-rank" className="relative">
        {CHART_FILTER_EMOTION}
      </Link>
      <motion.div
        className="absolute bottom-0 h-1 bg-black"
        layoutId="underline"
        initial={false}
        animate={{
          width: pathName === '/ranking' ? '2.5rem' : '2.8rem',
          x: pathName === '/ranking' ? '110%' : '118%'
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
    </div>
  );
};

export default FilterMenu;

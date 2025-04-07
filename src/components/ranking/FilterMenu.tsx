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
    <div className="flex gap-3 text-white relative">
      <Link href="/ranking" className="relative">
        {CHART_FILTER_TOPIC}
      </Link>
      <Link href="/ranking/emotions-rank" className="relative">
        {CHART_FILTER_EMOTION}
      </Link>
      <motion.div
        className="absolute inset-0 bg-black  -z-10"
        layoutId="background"
        initial={false}
        animate={{
          width: pathName === '/ranking' ? '42px' : '40px',
          x: pathName === '/ranking' ? '0%' : '138%'
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
    </div>
  );
};

export default FilterMenu;

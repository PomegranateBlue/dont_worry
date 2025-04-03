'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { motion } from 'framer-motion';
const FilterMenu = () => {
  const pathName = usePathname();
  return (
    <div className="flex gap-3 text-white relative">
      <Link href="/ranking" className="relative">
        주제별
      </Link>
      <Link href="/ranking/emotions-rank" className="relative">
        감정별
      </Link>
      <motion.div
        className="absolute bottom-0 h-1 bg-white"
        layoutId="underline"
        initial={false}
        animate={{
          width: pathName === '/ranking' ? '40px' : '40px',
          x: pathName === '/ranking' ? '0%' : '138%'
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
    </div>
  );
};

export default FilterMenu;

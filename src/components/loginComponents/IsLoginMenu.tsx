import Link from 'next/link';
import React from 'react';
import Text from '../common/Text';
import { PATHS } from '@/constants/common/paths';
import { MENU } from '@/constants/common/menu';

export const IsLoginMenu = () => {
  return (
    <div className="flex flex-col gap-1 items-start headerMd:flex-row headerMd:gap-11">
      <Link href={PATHS.NOTE} className="py-4 headerMd:py-0">
        <Text variant="title2" color="label-neutral">
          {MENU.NOTE}
        </Text>
      </Link>
      <Link href={PATHS.NOTEBOX} className="py-4 headerMd:py-0">
        <Text variant="title2" color="label-neutral">
          {MENU.NOTEBOX}
        </Text>
      </Link>
      <Link href={PATHS.RANKING} className="py-4 headerMd:py-0">
        <Text variant="title2" color="label-neutral">
          {MENU.RANKING}
        </Text>
      </Link>
      <Link href={PATHS.LETTER} className="py-4 headerMd:py-0">
        <Text variant="title2" color="label-neutral">
          {MENU.LETTER}
        </Text>
      </Link>
      <Link href={PATHS.LETTERBOX} className="py-4 headerMd:py-0">
        <Text variant="title2" color="label-neutral">
          {MENU.LETTERBOX}
        </Text>
      </Link>
    </div>
  );
};

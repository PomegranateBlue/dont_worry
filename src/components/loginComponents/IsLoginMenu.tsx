import Link from 'next/link';
import React from 'react';
import Text from '../common/Text';
import { PATHS } from '@/constants/common/paths';
import { MENU } from '@/constants/common/menu';

const menuItems = [
  { href: PATHS.NOTE, label: MENU.NOTE },
  { href: PATHS.NOTEBOX, label: MENU.NOTEBOX },
  { href: PATHS.RANKING, label: MENU.RANKING },
  { href: PATHS.LETTER, label: MENU.LETTER },
  { href: PATHS.LETTERBOX, label: MENU.LETTERBOX }
];

export const IsLoginMenu = () => {
  return (
    <div className="flex flex-col gap-1 items-start lg:flex-row lg:gap-11">
      {menuItems.map(({ href, label }) => {
        return (
          <Link key={href} href={href} className="py-4 lg:py-0">
            <Text variant="heading5" color="label-neutral">
              {label}
            </Text>
          </Link>
        );
      })}
    </div>
  );
};

'use client';

import { useRouter } from 'next/navigation';
import Text from '../common/Text';
import { showToast } from '../common/Toast';
import { MENU } from '@/constants/common/menu';

const MENU_ITEMS = [
  MENU.NOTE,
  MENU.NOTEBOX,
  MENU.RANKING,
  MENU.LETTER,
  MENU.LETTERBOX
];

export const IsNotLoginMenu = () => {
  const router = useRouter();
  const goLoginPage = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button')) {
      e.preventDefault();
      router.push('/auth/login');
      showToast('로그인 후 이용 가능합니다!', 'info');
    }
  };
  return (
    <div
      onClick={goLoginPage}
      className="flex flex-col gap-1 items-start lg:flex-row lg:gap-11"
    >
      {MENU_ITEMS.map((menuItem) => (
        <button key={menuItem} className="py-4 lg:py-0" type="button">
          <Text variant="heading5" color="label-neutral">
            {menuItem}
          </Text>
        </button>
      ))}
    </div>
  );
};

'use client';

import { useRouter } from 'next/navigation';
import Text from '../common/Text';
import { showToast } from '../common/Toast';
import { MENU } from '@/constants/common/menu';

export const IsNotLoginMenu = () => {
  const router = useRouter();
  const goLoginPage = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button')) {
      e.preventDefault();
      // alert('로그인 후 이용 가능합니다!');
      router.push('/auth/login');
      showToast('로그인 후 이용 가능합니다!', 'info');
    }
  };
  return (
    <div
      onClick={goLoginPage}
      className="flex flex-col gap-1 items-start headerMd:flex-row headerMd:gap-11"
    >
      <button className="py-4 headerMd:py-0">
        <Text variant="title2" color="label-neutral">
          {MENU.NOTE}
        </Text>
      </button>
      <button className="py-4 headerMd:py-0">
        <Text variant="title2" color="label-neutral">
          {MENU.NOTEBOX}
        </Text>
      </button>
      <button className="py-4 headerMd:py-0">
        <Text variant="title2" color="label-neutral">
          {MENU.RANKING}
        </Text>
      </button>
      <button className="py-4 headerMd:py-0">
        <Text variant="title2" color="label-neutral">
          {MENU.LETTER}
        </Text>
      </button>
      <button className="py-4 headerMd:py-0">
        <Text variant="title2" color="label-neutral">
          {MENU.LETTERBOX}
        </Text>
      </button>
    </div>
  );
};

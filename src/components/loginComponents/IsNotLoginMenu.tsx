'use client';

import { useRouter } from 'next/navigation';
import Text from '../common/Text';
import { showToast } from '../common/Toast';

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
          걱정작성
        </Text>
      </button>
      <button className="py-4 headerMd:py-0">
        <Text variant="title2" color="label-neutral">
          걱정보관함
        </Text>
      </button>
      <button className="py-4 headerMd:py-0">
        <Text variant="title2" color="label-neutral">
          통계
        </Text>
      </button>
      <button className="py-4 headerMd:py-0">
        <Text variant="title2" color="label-neutral">
          미래편지
        </Text>
      </button>
    </div>
  );
};

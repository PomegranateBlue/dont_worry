'use client';

import Text from '../common/Text';
import { useRouter } from 'next/navigation';

const StartButtonBottom = () => {
  const router = useRouter();
  return (
    <button
      className="flex items-center justify-center rounded-[8px] w-auto h-[48px] bg-primary-4 px-5 py-4 "
      onClick={() => router.push('/note')}
    >
      <Text variant="title2" color="white">
        걱정 작성하러 가기
      </Text>
    </button>
  );
};

export default StartButtonBottom;

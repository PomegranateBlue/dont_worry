'use client';

import Text from '../common/Text';
import { useRouter } from 'next/navigation';

const StartButton = () => {
  const router = useRouter();
  return (
    <button
      className="flex items-center justify-center rounded-[8px] w-[180px] h-[48px] bg-primary-1  "
      onClick={() => router.push('/note')}
    >
      <div className=" px-5 py-4 whitespace-nowrap">
        <Text variant="title2" color="primary4">
          걱정 작성하러 가기
        </Text>
      </div>
    </button>
  );
};

export default StartButton;

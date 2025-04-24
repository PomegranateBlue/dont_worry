'use client';

import Text from '../common/Text';
import { useStartNote } from '@/hooks/introHooks/useStartNote';
const StartButtonBottom = () => {
  const handleStartNote = useStartNote();
  return (
    <button
      className="flex items-center justify-center rounded-[8px] w-auto h-[48px] bg-primary-4 px-5 py-4 xl:px-[24px]"
      onClick={() => handleStartNote()}
    >
      <Text variant="title2" color="white">
        걱정 작성하러 가기
      </Text>
    </button>
  );
};

export default StartButtonBottom;

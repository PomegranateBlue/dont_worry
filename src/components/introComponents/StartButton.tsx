'use client';

import Text from '../common/Text';
import { useStartNote } from '@/hooks/introHooks/useStartNote';
const StartButton = () => {
  const handleStartNote = useStartNote();
  return (
    <button
      className="flex items-center justify-center rounded-[8px] w-[180px] h-[48px] bg-primary-1  "
      onClick={() => handleStartNote()}
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

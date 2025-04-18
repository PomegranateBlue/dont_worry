'use client';

import Image from 'next/image';
import { EMOTION_CATEGORIES } from '@/constants/openai/category';
import { useNoteStore } from '@/store/note/noteStore';
import Text from '../common/Text';
const EmotionCategoryForm = () => {
  const { selectedEmotions, toggleEmotion } = useNoteStore();
  return (
    <div>
      <div className="flex flex-col px-5 py-2 gap-y-2">
        <Text variant="heading3" color="label-normal">
          오늘의 감정을 골라보세요
        </Text>
        <Text variant="body3" color="label-alternative">
          복수 선택 가능 (최대 3개)
        </Text>
      </div>

      <div className="grid grid-cols-3 p-5 ">
        {EMOTION_CATEGORIES.map(({ label, emoji }) => {
          const isSelected = selectedEmotions.includes(label);
          return (
            <div key={label} className="flex justify-items-center">
              <button
                onClick={() => toggleEmotion(label)}
                className={`w-full aspect-square  rounded-xl font-bold text-label-normal mt-3 flex flex-col items-center justify-center space-y-[12px]
                ${
                  !isSelected
                    ? 'bg-none text-white border-black'
                    : 'bg-primary-3  text-black border-gray-400'
                }
              `}
              >
                <Image src={emoji} width={56} height={56} alt={label} />
                <span className="text-label-normal text-[16px] ">{label}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EmotionCategoryForm;

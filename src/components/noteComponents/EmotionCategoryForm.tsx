'use client';

import Image from 'next/image';
import { EMOTION_CATEGORIES } from '@/constants/openai/category';
import { useNoteStore } from '@/store/note/noteStore';
import Text from '../common/Text';
const EmotionCategoryForm = () => {
  const { selectedEmotions, toggleEmotion } = useNoteStore();
  return (
    <section>
      <main className="flex flex-col  gap-y-2 max-w-[648px]">
        <div className="flex flex-col  h-auto px-5 py-2 gap-[12px]">
          <Text variant="heading3" variant2="title1" color="label-normal">
            오늘의 감정을 골라보세요
          </Text>
          <Text variant="body3" variant2="body2" color="label-alternative">
            복수 선택 가능 (최대 3개)
          </Text>
        </div>
      </main>

      <div className="grid grid-cols-3 p-5 ">
        {EMOTION_CATEGORIES.map(({ label, emoji }) => {
          const isSelected = selectedEmotions.includes(label);
          return (
            <div
              key={label}
              className={`flex items-center justify-center px-[27px] py-3  ${
                !isSelected
                  ? 'bg-none text-white border-black '
                  : 'bg-primary-3  text-black border-gray-400 rounded-[8px]'
              }`}
            >
              <button
                onClick={() => toggleEmotion(label)}
                className={`w-full    rounded-xl font-bold text-label-normal  flex flex-col items-center justify-center space-y-[12px] gap-3

              `}
              >
                <Image src={emoji} width={56} height={56} alt={label} />
                <Text variant="body2" color="label-normal">
                  {label}
                </Text>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default EmotionCategoryForm;

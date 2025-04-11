'use client';

import { EMOTION_CATEGORIES } from '@/constants/openai/category';
import { useNoteStore } from '@/store/noteStore';
const EmotionCategoryForm = () => {
  const { selectedEmotions, toggleEmotion } = useNoteStore();
  return (
    <div className="p-4">
      <p className="text-xl font-semibold mb-4">
        여러 감정이 들으셨을것 같네요
      </p>
      <div className="grid grid-cols-3 gap-4">
        {EMOTION_CATEGORIES.map((emotion) => {
          const isSelected = selectedEmotions.includes(emotion);
          return (
            <button
              key={emotion}
              onClick={() => toggleEmotion(emotion)}
              className={`w-full aspect-square rounded-xl font-bold text-sm border-2 flex flex-col items-center justify-center
                ${
                  isSelected
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-black border-gray-400'
                }
              `}
            >
              {emotion}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default EmotionCategoryForm;

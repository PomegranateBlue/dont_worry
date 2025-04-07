'use client';

import { EMOTION_CATEGORIES } from '@/constants/openai/category';
import { useNoteStore } from '@/store/noteStore';
const EmotionCategoryForm = () => {
  const { selectedEmotions, toggleEmotion } = useNoteStore();
  return (
    <div>
      <p className="text-xl font-semibold p-4">여러 감정이 들으셨을것 같네요</p>
      <div className="p-4 flex flex-wrap gap-2">
        {EMOTION_CATEGORIES.map((emotion) => {
          const isSelected = selectedEmotions.includes(emotion);
          return (
            <button
              key={emotion}
              onClick={() => toggleEmotion(emotion)}
              className={`px-4 py-2 border-[2px] font-bold rounded-3xl
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

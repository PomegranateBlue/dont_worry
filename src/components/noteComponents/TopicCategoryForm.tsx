'use client';

import {
  TOPIC_CATEGORIES,
  EMOTION_CATEGORIES
} from '@/constants/openai/category';
import { useNoteStore } from '@/store/noteStore';
const CategoryForm = () => {
  const { selectedTopic, toggleTopic, selectedEmotions, toggleEmotion } =
    useNoteStore();
  return (
    <div>
      <p className="text-xl font-semibold p-4">무엇이 고민이신가요?</p>
      <div className="p-4 flex flex-wrap gap-2">
        {TOPIC_CATEGORIES.map((topic) => {
          const isTopic = selectedTopic === topic;
          return (
            <button
              key={topic}
              onClick={() => toggleTopic(topic)}
              className={`px-4 py-2 border-black border-[2px] font-bold rounded-3xl
                ${!isTopic ? 'bg-white text-black' : 'bg-black text-white'}
              `}
            >
              {topic}
            </button>
          );
        })}
      </div>

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

export default CategoryForm;

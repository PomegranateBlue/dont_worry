'use client';

import { TOPIC_CATEGORIES } from '@/constants/openai/category';
import { useNoteStore } from '@/store/noteStore';
const TopicCategoryForm = () => {
  const { selectedTopic, toggleTopic } = useNoteStore();
  return (
    <div className="p-4">
      <p className="text-xl font-semibold mb-4">무엇이 고민이신가요?</p>
      <div className="grid grid-cols-3 gap-4">
        {TOPIC_CATEGORIES.map((topic) => {
          const isTopic = selectedTopic === topic;
          return (
            <button
              key={topic}
              onClick={() => toggleTopic(topic)}
              className={`w-full aspect-square rounded-xl font-bold text-sm border-2 flex flex-col items-center justify-center
                ${!isTopic ? 'bg-white text-black' : 'bg-black text-white'}
              `}
            >
              {topic}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TopicCategoryForm;

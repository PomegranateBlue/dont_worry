'use client';

import { TOPIC_CATEGORIES } from '@/constants/openai/category';
import { useNoteStore } from '@/store/noteStore';
const TopicCategoryForm = () => {
  const { selectedTopic, toggleTopic } = useNoteStore();
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
    </div>
  );
};

export default TopicCategoryForm;

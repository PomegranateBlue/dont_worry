'use client';

import { TOPIC_CATEGORIES } from '@/constants/openai/category';
import { useNoteStore } from '@/store/note/noteStore';

interface Props {
  onSelectCategory: (topic: string) => void;
}

const TopicCategoryForm = ({ onSelectCategory }: Props) => {
  const { selectedTopic } = useNoteStore();
  return (
    <div className="p-5">
      <p className="text-[22px] font-semibold p-5">
        걱정은 어디에서 왔나요?
        <br />
        어떤 주제인가요?
      </p>

      <div className="flex flex-wrap gap-2 p-5">
        {TOPIC_CATEGORIES.map((topic) => {
          const isTopic = selectedTopic === topic;
          return (
            <button
              key={topic}
              onClick={() => onSelectCategory(topic)}
              className={`px-3 py-[6px] rounded-full text-label-normal text-[16px] gap-1 border-[1px] border-line-normal  flex flex-col items-center justify-center
                ${!isTopic ? 'bg-white text-black' : 'bg-primary-3 text-white'}
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

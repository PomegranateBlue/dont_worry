'use client';

import { TOPIC_CATEGORIES } from '@/constants/openai/category';
import { useNoteStore } from '@/store/note/noteStore';
import Text from '../common/Text';
interface Props {
  onSelectCategory: (topic: string) => void;
}

const TopicCategoryForm = ({ onSelectCategory }: Props) => {
  const { selectedTopic } = useNoteStore();
  return (
    <div className="flex flex-col justify-center items-center max-w-[648px]">
      <div className="flex  w-full h-auto px-5 py-2 ">
        <Text variant="heading3" color="label-normal">
          걱정은 어디에서 왔나요? 어떤 주제인가요?
        </Text>
      </div>
      <div className=" p-5 h-[300px]">
        <div className="flex flex-wrap gap-2 xl:gap-[24px] py-[24px] xl:grid xl:grid-cols-4 ">
          {TOPIC_CATEGORIES.map((topic) => {
            const isTopic = selectedTopic === topic;
            return (
              <button
                key={topic}
                onClick={() => onSelectCategory(topic)}
                className={`  px-3 py-[6px] rounded-[16px]  border-[1px] border-line-normal  flex flex-col items-center justify-center xl:px-[12px] xl:py-[6px] 
                ${!isTopic ? 'bg-white text-black' : 'bg-primary-3 text-white'}
              `}
              >
                <Text variant="body2" color="label-neutral">
                  {topic}
                </Text>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopicCategoryForm;

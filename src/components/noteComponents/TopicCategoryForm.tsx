'use client';

import { TOPIC_CATEGORIES } from '@/constants/openai/category';
import { useNoteStore } from '@/store/note/noteStore';
import Text from '../common/Text';
interface Props {
  onSelectCategory: (topic: string) => void;
}

const TopicCategoryForm = ({ onSelectCategory }: Props) => {
  const { selectedTopics } = useNoteStore();
  return (
    <section className="flex flex-col justify-center items-center max-w-[648px] xl:pb-[80px]">
      <article className="flex flex-col  w-full h-auto px-5 py-2 gap-[12px] ">
        <Text variant="heading3" variant2="title1" color="label-normal">
          걱정은 어디에서 왔나요? 어떤 주제인가요?
        </Text>
        <Text variant="body3" variant2="body2" color="label-alternative">
          복수 선택 가능 (최대 3개)
        </Text>
      </article>
      <article className=" p-5 h-[300px] ">
        <div className="w-full flex flex-wrap gap-2 xl:gap-[24px] py-[24px] xl:grid xl:grid-cols-4 xl:items-start xl:justify-start">
          {TOPIC_CATEGORIES.map((topic) => {
            const isTopic = selectedTopics.includes(topic);
            return (
              <button
                key={topic}
                onClick={() => onSelectCategory(topic)}
                className={`  px-3 py-[6px] rounded-[16px]  border-[1px] border-line-normal  flex flex-col items-center justify-center xl:px-[12px] xl:py-[6px] xl:w-[120px] xl:h-[56px]
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
      </article>
    </section>
  );
};

export default TopicCategoryForm;

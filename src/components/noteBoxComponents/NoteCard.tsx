import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { EMOTION_CATEGORIES } from '@/constants/openai/category';
import Image from 'next/image';
import Text from '../common/Text';
interface NoteCardProps {
  content: string;
  created_at: string;
  note_id: string;
  topic_category: string | null;
  emotion_category: string[] | null;
}

const NoteCard = ({
  content,
  created_at,
  note_id,
  topic_category,
  emotion_category
}: NoteCardProps) => {
  const formattedDate = new Date(created_at).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short'
  });
  const [showAnswer, setShowAnswer] = useState(false);

  const userNote = JSON.parse(content);
  const message = userNote.Question;
  const answer = userNote.Answer;
  console.log('emotion_category:', emotion_category);

  return (
    <div id={note_id} className="bg-[#FFFFFF] p-4 rounded-xl shadow-[]">
      <div className="flex flex-wrap gap-2 items-center">
        {emotion_category?.map((emotionLabel) => {
          const emotionData = EMOTION_CATEGORIES.find(
            (emotion) => emotion.label === emotionLabel
          );

          return (
            emotionData && (
              <div
                key={emotionLabel}
                className="flex rounded-[16px] border-[1px] gap-1 px-3 py-[6px]  "
              >
                <Image
                  src={emotionData.emoji}
                  width={24}
                  height={24}
                  alt={emotionData.label}
                  unoptimized
                />
                <Text variant="body3" color="label-neutral" as="p">
                  {emotionData.label}
                </Text>
              </div>
            )
          );
        })}
        <div className="ml-1 px-3 py-[6px]  bg-backgroundSet-normal border-line-normal border-[1px]  rounded-full gap-2">
          <Text color="label-neutral" as="p" variant="body3">
            {topic_category}
          </Text>
        </div>
      </div>

      <div className="text-md  text-gray-500 mt-1">
        <Text color="label-alternative" variant="label1" as="p">
          {formattedDate}
        </Text>
      </div>

      <div className="mt-2 text-sm leading-relaxed text-gray-800 whitespace-pre-wrap line-clamp-5">
        <Text variant="body3" color="label-neutral" as="p">
          {message}
        </Text>
      </div>

      {showAnswer && (
        <div className="flex flex-col mt-2 p-3  bg-[#FFFFFF]   rounded   whitespace-pre-wrap">
          <Text variant="body3" color="label-normal" className="ml-auto py-2">
            {} 님께 드리는 걱숭이의 답장 이미지
          </Text>
          <Text variant="body3" color="label-neutral" as="p">
            {answer}
          </Text>
        </div>
      )}

      <div className="px-2 py-4">
        <button
          onClick={() => setShowAnswer(!showAnswer)}
          className="mt-2 text-sm text-gray-600 flex ml-auto "
        >
          {showAnswer ? (
            <div className="flex px-2 py-4 gap-2">
              <Text as="p" color="label-alternative" variant="body3">
                접기
              </Text>
              <ChevronUp className="text-label-alternative" />
            </div>
          ) : (
            <div className="flex px-2 py-4 gap-2">
              <Text as="p" color="label-alternative" variant="body3">
                답장
              </Text>
              <ChevronDown className="text-label-alternative" />
            </div>
          )}
        </button>
      </div>
    </div>
  );
};
export default NoteCard;

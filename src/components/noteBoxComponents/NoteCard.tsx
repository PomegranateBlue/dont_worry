import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { EMOTION_CATEGORIES } from '@/constants/openai/category';
import Image from 'next/image';
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
    <div id={note_id} className="bg-[#FFFFFF] p-4 rounded-xl shadow-xl">
      <div className="flex items-center">
        {emotion_category?.map((emotionLabel) => {
          const emotionData = EMOTION_CATEGORIES.find(
            (emotion) => emotion.label === emotionLabel
          );

          return (
            emotionData && (
              <div key={emotionLabel}>
                <Image
                  src={emotionData.emoji}
                  width={40}
                  height={40}
                  alt={emotionData.label}
                  unoptimized
                />
              </div>
            )
          );
        })}
        <div className="ml-1 px-3 py-1 text-sm bg-white border-gray-400 border-[1px] text-black rounded-full">
          {topic_category}
        </div>
      </div>

      <div className="text-md  text-gray-500 mt-1">{formattedDate}</div>

      <div className="mt-2 text-sm leading-relaxed text-gray-800 whitespace-pre-wrap line-clamp-5">
        {message}
      </div>

      <button
        onClick={() => setShowAnswer(!showAnswer)}
        className="mt-2 text-sm text-gray-600 flex ml-auto "
      >
        {showAnswer ? (
          <div className="flex">
            접기 <ChevronUp />
          </div>
        ) : (
          <div className="flex">
            답장 <ChevronDown />
          </div>
        )}
      </button>

      {showAnswer && (
        <div className="flex flex-col mt-2 p-3  bg-[#FFFFFF]   rounded text-sm text-gray-700 whitespace-pre-wrap">
          <p className="ml-auto font-semibold">{} 님께 드리는 걱숭이의 답장</p>
          {answer}
        </div>
      )}
    </div>
  );
};
export default NoteCard;

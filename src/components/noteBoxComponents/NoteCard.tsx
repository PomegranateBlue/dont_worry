'use client';

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
  isEdit: boolean;
  isChecked?: boolean;
  onToggleCheck?: (id: string) => void;
}

// const emotionBgClassMap: Record<string, string> = {
//   slpeum: 'bg-mind-slpeum_bg',
//   bulkuea: 'bg-mind-bulkuea_bg',
//   apbak: 'bg-mind-apbak_bg',
//   boolan: 'bg-mind-boolan_bg',
//   honran: 'bg-mind-honran_bg',
//   bunno: 'bg-mind-bunno_bg',
//   woowool: 'bg-mind-woowool_bg',
//   zzazeung: 'bg-mind-zzazeung_bg',
//   huhuea: 'bg-mind-huhuea_bg',
//   yoerowooum: 'bg-mind-yoerowooum_bg',
//   moogiryeok: 'bg-mind-moogiryeok_bg'
// };

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

  return (
    <div
      id={note_id}
      className="relative flex flex-col gap-2 bg-backgroundSet-normal p-5 rounded-[8px] drop-shadow-lg"
    >
      <div className="flex flex-wrap gap-2 items-center">
        {emotion_category?.map((emotionLabel) => {
          const emotionData = EMOTION_CATEGORIES.find(
            (emotion) => emotion.label === emotionLabel
          );
          if (!emotionData) return null;

          const bgClass = `bg-mind-${emotionData.bgcolor}`;
          return (
            emotionData && (
              <div
                key={emotionLabel}
                className={`flex rounded-[16px] h-[32px] border-label-alternative border-[1px] gap-1 px-3 py-[6px] ${bgClass}`}
              >
                <Image
                  src={emotionData.emoji}
                  width={24}
                  height={24}
                  alt={emotionData.label}
                  unoptimized
                  className="aspect-square"
                />
                <Text variant="body3" color="label-neutral" as="p">
                  {emotionData.label}
                </Text>
              </div>
            )
          );
        })}
        <div className="flex px-3 py-[6px]  bg-backgroundSet-normal border-line-normal border-[1px]  rounded-[16px] ">
          <Text color="label-neutral" as="p" variant="body3">
            {topic_category}
          </Text>
        </div>
      </div>

      <div className="flex ">
        <Text color="label-alternative" variant="label1" as="p">
          {formattedDate}
        </Text>
      </div>
      <div className="flex my-2 w-[295px] h-[1px] bg-[#E0E0E2]"></div>
      <div className="flex   leading-relaxed  whitespace-pre-wrap line-clamp-5">
        <Text variant="body3" color="label-neutral" as="p">
          {message}
        </Text>
      </div>

      {showAnswer && (
        <div className="flex flex-col   bg-[#FFFFFF]   rounded   whitespace-pre-wrap">
          <div className="flex px-2 gap-2">
            <Text
              variant="body3"
              color="label-normal"
              className="flex text-right"
            >
              {} 님께 드리는 돈워리의 답장
            </Text>
            <div className="flex p-1">
              <div className="w-[30px] h-[30px]">이미지</div>
            </div>
          </div>

          <div>
            <Text variant="body3" color="label-neutral" as="p">
              {answer}
            </Text>
          </div>
        </div>
      )}

      <div className="px-2 py-4">
        <button
          onClick={() => setShowAnswer(!showAnswer)}
          className="mt-2   flex ml-auto "
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

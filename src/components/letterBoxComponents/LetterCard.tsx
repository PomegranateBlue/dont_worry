'use client';

import { Separator } from '@radix-ui/react-separator';
import Image from 'next/image';
import React, { useState } from 'react';
import Text from '../common/Text';
import { formatDate } from '@/app/utils/letterbox/dateUtils';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

// 타입 정의
interface Letter {
  letter_id: string;
  content: string;
  img_url?: string | null;
  send_at?: string | null;
}

interface LetterCardProps {
  letter: Letter;
  isEdit: boolean;
  isSelected: boolean;
  onCheckboxChange: () => void;
}

const LetterCard = ({
  letter,
  isEdit,
  isSelected,
  onCheckboxChange
}: LetterCardProps) => {
  const [showFullContent, setShowFullContent] = useState(false);

  // 더보기/접기 버튼 클릭 핸들러
  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  return (
    <main className="flex gap-2 self-stretch">
      {/* 체크박스 */}
      {isEdit && (
        <div className="flex items-start">
          <button
            onClick={onCheckboxChange}
            className={`  ${
              isSelected
                ? ' text-white bg-primary-4 border-[2px] border-primary-4 rounded-full '
                : 'border-label-alternative border-[2px] text-label-alternative rounded-full'
            }`}
          >
            <Check className="w-[16px] h-[16px]" />
          </button>
        </div>
      )}
      <div
        className={`flex flex-col items-center gap-4 p-5 border rounded-[8px] bg-backgroundSet-normal shadow w-full ${
          isEdit ? 'max-w-[303px] md:max-w-[576px] xl:max-w-[600px]' : ''
        }`}
      >
        {/* 카드내용 */}
        <nav className="flex items-center gap-2 self-stretch">
          <Text variant="label1" color="label-neutral">
            도착 예정일 {formatDate(letter.send_at)}
          </Text>
        </nav>
        <Separator className="w-full h-[1px] bg-line-normal" />
        <article className="flex items-center gap-3 self-stretch">
          <div className="min-w-[72px] h-[72px] rounded-[4px] bg-gray-100 flex items-center justify-center">
            {letter.img_url && (
              <Image
                width={80}
                height={80}
                src={letter.img_url}
                alt="편지 이미지"
                className="w-[72px] h-[72px] rounded-[4px] object-cover"
              />
            )}
          </div>
          <figure className="flex flex-col justify-between items-start flex-1 self-stretch overflow-hidden">
            <Text variant="label1" color="label-alternative">
              {formatDate(letter.send_at)} 작성
            </Text>

            {/* 본문 내용 */}
            <div className="w-full overflow-hidden">
              <Text
                variant="label1"
                color="label-neutral"
                className={`block w-full break-words overflow-wrap-anywhere ${
                  showFullContent ? '' : 'line-clamp-4'
                }`}
              >
                {letter.content}
              </Text>
            </div>

            {/* 더보기/접기 버튼 */}
            {letter.content.length > 100 && (
              <div className="flex justify-end w-full lg:hidden">
                <button
                  onClick={toggleContent}
                  className="mt-2 flex items-center text-label-alternative"
                >
                  <Text as="p" variant="label1" color="label-neutral">
                    {showFullContent ? '접기' : '더보기'}
                  </Text>
                  {showFullContent ? (
                    <ChevronUp className="text-label-alternative" size={18} />
                  ) : (
                    <ChevronDown className="text-label-alternative" size={18} />
                  )}
                </button>
              </div>
            )}
          </figure>
        </article>
      </div>
    </main>
  );
};

export default LetterCard;

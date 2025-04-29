'use client';

import { Separator } from '@radix-ui/react-separator';
import Image from 'next/image';
import React from 'react';
import Text from '../common/Text';
import { formatDate } from '@/app/utils/letterbox/dateUtils';

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
  return (
    <main className="flex gap-2 self-stretch">
      {/* 체크박스 */}
      {isEdit && (
        <label className="flex cursor-pointer">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onCheckboxChange}
            className="sr-only peer" // 기본 체크박스 숨기기
          />
          <div className="w-5 h-5 aspect-square rounded-full border-2 border-[#E0E0E2] peer-checked:bg-[#8573C9] peer-checked:border-[#8573C9] transition-all"></div>
        </label>
      )}
      <div
        className={`flex flex-col items-center gap-4 p-5 border rounded-[8px] bg-backgroundSet-normal shadow w-full ${
          isEdit ? 'max-w-[303px] xl:max-w-[600px]' : ''
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
          <figure className="flex flex-col justify-between items-start flex-[1_0_0] self-stretch">
            <Text variant="label1" color="label-alternative">
              {formatDate(letter.send_at)} 작성
            </Text>
            <div className="h-[38px] self-stretch">
              <Text variant="label1" color="label-neutral">
                {letter.content}
              </Text>
            </div>
          </figure>
        </article>
      </div>
    </main>
  );
};

export default LetterCard;

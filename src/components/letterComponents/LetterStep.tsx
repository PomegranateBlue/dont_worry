import Text from '../common/Text';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { ChevronLeft, ImagePlus } from 'lucide-react';
import { LETTER_ERROR_KEYS, LetterError } from '@/constants/error/letterError';
import { saveLetter } from '@/app/utils/supabase/db';
import { useImageUpload } from '@/hooks/letterHooks/useImageUpload';
import { showToast } from '../common/Toast';

type LetterStepProps = {
  sendAt: string;
  content: string;
  setContent: (val: string) => void;
  imageFile: File | null;
  imagePreview: string | null;
  onBack: () => void;
  userId: string | null;
  setStep: (step: 'calendar' | 'letter' | 'check') => void;
  isDesktop: boolean;
};

const LetterStep = ({
  sendAt,
  content,
  setContent,
  onBack,
  userId,
  setStep,
  isDesktop
}: LetterStepProps) => {
  const { imageFile, imagePreview, handleImageChange, uploadImageAndGetUrl } =
    useImageUpload(userId);

  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 편지 제출
  const handleLetterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ 날짜 선택 여부 먼저 검사
    if (!sendAt) {
      showToast('날짜를 선택해주세요 📅', 'error');
      return;
    }

    if (isLoading) return;
    setIsLoading(true);

    let imageUrl = '';
    if (imageFile) {
      try {
        imageUrl = await uploadImageAndGetUrl(imageFile);
        showToast('편지를 저장하고 있어요 💌', 'info');
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
        throw new LetterError(LETTER_ERROR_KEYS.IMAGE_INSERT_FAILED);
      }
    }

    try {
      // 편지 저장
      await saveLetter(userId, content, sendAt, imageUrl);
      setStep('check'); // 성공 후 check스텝으로 이동
      setIsLoading(false);
    } catch (error) {
      console.error('편지 저장 실패:', error);
      showToast('편지를 저장하는 데 실패했어요 😢', 'error');
      setIsLoading(false);
      return;
    }
  };

  // 이미지 선택용 트리거
  const triggerFileInput = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    inputRef.current?.click();
  };

  return (
    <section className="w-full">
      {!isDesktop && (
        <nav className="relative flex h-[56px] px-[6px] justify-center items-center gap-[20px] self-stretch xl:hidden">
          {/* 뒤로가기 버튼 */}
          <div className="flex w-12 h-12 px-[6px] py-[2px] gap-2 absolute left-0">
            <button type="button" onClick={onBack} className="flex items-start">
              <ChevronLeft />
            </button>
          </div>

          {/* 중앙 텍스트 */}
          <Text variant="title1" color="label-normal" className="text-center">
            미래 편지 작성
          </Text>
        </nav>
      )}
      <form
        onSubmit={handleLetterSubmit}
        className="flex flex-col items-center px-5 md:max-w-[510px] md:mx-auto xl:max-w-[648px] bg-backgroundSet-normal "
      >
        <div className="flex flex-col w-full items-center xl:gap-6 xl:self-stretch">
          <nav className="flex justify-center items-center py-2 gap-2 mb-2 xl:py-[8px] xl:gap-[8px] self-stretch">
            <div className="w-full">
              <Text variant="heading3" color="label-normal">
                미래의 나에게 하고 싶은 말을
                <br />
                작성해보세요
              </Text>
            </div>
          </nav>

          <div className="flex flex-col w-full h-72 justify-between px-4 py-3 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-stone-300 xl:max-w-[648px] xl:h-[300px] xl:p-[12px_16px] xl:items-start xl:self-stretch">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={300}
              placeholder="편지를 작성해주세요"
              required
              className="w-full h-full resize-none text-base text-stone-900 placeholder-stone-300 font-medium focus:outline-none font-['Pretendard']"
            />
            <div className="text-right text-xs text-stone-300">
              {content.length}/300
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full mt-6 justify-center items-center mb-[28px] xl:mb-[26px]">
          <label className="w-full items-start xl:py-2 xl:px-0 xl:gap-2 xl:self-stretch">
            <Text
              variant="title2"
              color="default"
              className="mb-2 inline-block text-left"
            >
              사진 선택
            </Text>
          </label>

          {/* 숨긴 input */}
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={handleImageChange}
            className="hidden"
          />
          {/* 클릭 영역 */}
          <div
            onClick={triggerFileInput}
            className="relative w-full aspect-[3/2] xl:max-w-[648px] xl:max-h-[300px] flex justify-center items-center mt-3 rounded-lg overflow-hidden bg-transparent-check bg-check-small bg-check-position"
          >
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt="미리보기"
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-6 h-6 flex items-center justify-center rounded">
                <ImagePlus />
              </div>
            )}
          </div>
        </div>

        <div className="relative w-full justify-center items-center gap-2 flex-shrink-0 xl:max-w-[648px] xl:max-h-[96px] xl:px-5">
          <button type="submit" className="w-full h-12 bg-primary-4 rounded-lg">
            <Text variant="title2" color="white">
              편지 보내기
            </Text>
          </button>
        </div>
      </form>
    </section>
  );
};

export default LetterStep;

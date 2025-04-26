import { getImageUrl, uploadImage } from '@/app/utils/letter/imageAction';
import Text from '../common/Text';
import browserClient from '@/app/utils/supabase/client';
import Image from 'next/image';
import React, { useRef } from 'react';
import { ChevronLeft, ImagePlus } from 'lucide-react';

type LetterStepProps = {
  sendAt: string;
  setSendAt: (date: string) => void;
  content: string;
  setContent: (val: string) => void;
  imageFile: File | null;
  setImageFile: (file: File | null) => void;
  imagePreview: string | null;
  setImagePreview: (url: string | null) => void;
  onBack: () => void;
  setMessage: (msg: string) => void;
  userId: string | null;
  setStep: (step: 'calendar' | 'letter' | 'check') => void;
  isDesktop: boolean;
};

const LetterStep = ({
  sendAt,
  setSendAt,
  content,
  setContent,
  imageFile,
  setImageFile,
  imagePreview,
  setImagePreview,
  onBack,
  setMessage,
  userId,
  setStep,
  isDesktop
}: LetterStepProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const handleLetterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      setMessage('로그인 후 이용해주세요.');
      return;
    }

    let imageUrl = '';

    if (imageFile) {
      const rawFileName = `${userId}_${Date.now()}.png`;
      const encodedPath = `letters/${rawFileName}`;
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('path', encodedPath);

      try {
        await uploadImage(formData);
        imageUrl = getImageUrl(encodedPath);
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
        setMessage('이미지 업로드에 실패했습니다.');
        return;
      }
    }

    const { error } = await browserClient
      .from('letter')
      .insert([
        {
          user_id: userId,
          content,
          send_at: sendAt,
          img_url: imageUrl,
          isSent: false
        }
      ])
      .select();

    if (error) {
      console.error('편지 저장 실패', error);
      setMessage('저장에 실패했습니다.');
      return;
    }

    setStep('check');
    setContent('');
    setSendAt('');
    setImageFile(null);
    setImagePreview(null);
  };
  const triggerFileInput = () => {
    inputRef.current?.click();
  };

  return (
    <section className="xl:flex xl:flex-col xl:items-start xl:gap-[24px] xl:self-stretch">
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
        className="flex flex-col items-center px-5 xl:w-[648px] xl:h-[375px] bg-backgroundSet-normal"
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
              maxLength={150}
              placeholder="편지를 작성해주세요"
              required
              className="w-full h-full resize-none text-base text-stone-900 placeholder-stone-300 font-medium focus:outline-none font-['Pretendard']"
            />
            <div className="text-right text-xs text-stone-300">
              {content.length}/150
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

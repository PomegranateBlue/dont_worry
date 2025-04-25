import { getImageUrl, uploadImage } from '@/app/utils/letter/imageAction';
import Text from '../common/Text';
import browserClient from '@/app/utils/supabase/client';
import Image from 'next/image';
import React from 'react';
import { ChevronLeft } from 'lucide-react';
// import dayjs from 'dayjs';

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
  setStep
}: LetterStepProps) => {
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

    // const scheduledTime = dayjs().add(5, 'minute').toISOString();

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

    try {
      const res = await fetch('/api/crontest');
      const result = await res.json();

      if (res.ok) {
        setStep('check');
      } else {
        console.error('crontest 호출 실패:', result);
        setMessage('편지는 저장했지만 이메일 전송에 실패했습니다.');
      }
    } catch (err) {
      console.error('API 호출 중 오류:', err);
      setMessage('편지는 저장했지만 이메일 전송 중 오류가 발생했습니다.');
    }

    setContent('');
    setSendAt('');
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <section>
      <nav className="flex h-[56px] px-[6px] justify-center items-center gap-[20px] self-stretch">
        <div className="w-96">
          <button type="button" onClick={onBack} className="absolute left p-2">
            <ChevronLeft />
          </button>

          <Text
            variant="title1"
            color="label-normal"
            className="text-center font-pretendard text-[20px] font-semibold leading-[135%]"
          >
            미래 편지 작성
          </Text>
        </div>
      </nav>
      <form
        onSubmit={handleLetterSubmit}
        className="w-96 h-[954px] flex flex-col justify-between items-center bg-backgroundSet-normal mx-auto px-5 py-8"
      >
        <div className="flex flex-col items-center w-full">
          <nav className="flex px-5 py-2 justify-center items-center gap-2 self-stretch">
            <div className="w-full">
              <Text
                variant="heading3"
                color="label-normal"
                className="font-ibm text-[22px] font-medium leading-[135%] text-left"
              >
                미래의 나에게 하고 싶은 말을
                <br />
                작성해보세요
              </Text>
            </div>
          </nav>
          <div className="w-full">
            <div className="w-full h-72 flex flex-col justify-between px-4 py-3 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-stone-300 ">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                maxLength={100}
                placeholder="플레이스 홀더"
                required
                className="w-full h-full resize-none text-base text-stone-900 placeholder-stone-300 font-medium focus:outline-none font-['Pretendard']"
              />
              <div className="text-right text-xs text-stone-300">
                {content.length}/150
              </div>
            </div>
          </div>

          <div className="w-full mt-6">
            <label className="text-lg font-semibold text-neutral-900 mb-2 inline-block font-['Pretendard']">
              사진 선택
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
            <div className="w-full h-56 mt-3 relative rounded-lg overflow-hidden bg-[url('https://placehold.co/335x220')] bg-center bg-cover flex justify-center items-center">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="미리보기"
                  width={335}
                  height={220}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-6 h-6 bg-zinc-300 flex items-center justify-center rounded">
                  <div className="w-4 h-4 bg-neutral-900" />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full mt-10">
          <button
            type="submit"
            className="w-full h-12 bg-primary-4 text-white text-lg rounded-lg"
          >
            편지 보내기
          </button>
        </div>
      </form>
    </section>
  );
};

export default LetterStep;

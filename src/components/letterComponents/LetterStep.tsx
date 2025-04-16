import { getImageUrl, uploadImage } from '@/actions/storageActions';
import browserClient from '@/app/utils/supabase/client';
import Image from 'next/image';
import React from 'react';

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
  userId
}: LetterStepProps) => {
  // 이미지 파일 선택
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };
  //편지 제출 핸들러
  const handleLetterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      setMessage('로그인 후 이용해주세요.');
      return;
    }

    let imageUrl = '';

    // 이미지가 선택된 경우 → Storage에 업로드하고 public URL 받기
    if (imageFile) {
      const rawFileName = `${Date.now()}_${imageFile.name}`;
      //파일명 인코딩해서 한글이나 특수문자형식의 파일명도 쓸 수 있도록 처리
      const encodedPath = `letters/${encodeURIComponent(rawFileName)}`;

      // storage에 업로드할 데이터를 FormData로 구성
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('path', encodedPath);

      try {
        await uploadImage(formData);
        imageUrl = getImageUrl(encodedPath); // 여기도 인코딩된 path 사용
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
        setMessage('이미지 업로드에 실패했습니다.');
        return;
      }
    }
    // letter 테이블에 데이터 저장하기
    const { data, error } = await browserClient
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

    // 저장 성공 후 → crontest API 호출
    try {
      const res = await fetch('/api/crontest');
      const result = await res.json();

      if (res.ok) {
        console.log('저장 성공=>', data);
        setMessage('편지를 저장하고 이메일을 보냈습니다!');
      } else {
        console.error('crontest 호출 실패:', result);
        setMessage('편지는 저장했지만 이메일 전송에 실패했습니다.');
      }
    } catch (err) {
      console.error('API 호출 중 오류:', err);
      setMessage('편지는 저장했지만 이메일 전송 중 오류가 발생했습니다.');
    }
    //저장 했으면 입력 필드 초기화
    setContent('');
    setSendAt('');
    setImageFile(null);
    setImagePreview(null);
    onBack();
  };
  return (
    <form onSubmit={handleLetterSubmit} className="space-y-4">
      <label className="block text-sm">미래의 나에게 보내는 편지 내용</label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border rounded px-3 py-2 h-32"
        required
      />

      <label className="block text-sm">사진 선택</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full"
      />
      {imagePreview && (
        <div className="mt-2">
          <Image
            src={imagePreview}
            alt="미리보기"
            width={200}
            height={200}
            className="object-cover"
          />
        </div>
      )}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onBack}
          className="border px-4 py-2 rounded w-1/2"
        >
          이전으로
        </button>
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded w-1/2"
        >
          편지 보내기
        </button>
      </div>
    </form>
  );
};

export default LetterStep;

'use client';

import { getImageUrl, uploadImage } from '@/actions/storageActions';
import browserClient from '@/app/utils/supabase/client';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const LetterForm = () => {
  //useState를 이용해 사용자가 입력한 값 상태관리
  const [content, setContent] = useState('');
  const [sendAt, setSendAt] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    //로그인된 사용자 정보 가져오기
    const fetchUser = async () => {
      const {
        data: { user },
        error
      } = await browserClient.auth.getUser();

      if (user) {
        setUserId(user.id);
      } else {
        console.error('사용자 정보를 불러오는데 실패했습니다.', error);
      }
    };
    fetchUser();
  }, []);

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
        { user_id: userId, content, send_at: sendAt, img_url: imageUrl }
      ]);
    if (error) {
      console.error('편지 저장 실패', error);
      setMessage('저장에 실패했습니다.');
    } else {
      console.log('저장된 편지 =>', data);
      setMessage('편지를 저장했습니다!');
      //저장 했으면 입력 필드 초기화
      setContent('');
      setSendAt('');
      setImageFile(null);
      setImagePreview(null);
    }
  };
  return (
    <section>
      <header>
        <h1>미래의 나에게 하고싶은 말을 작성해보세요!</h1>
      </header>

      <form onSubmit={handleLetterSubmit}>
        <article>
          <label>날짜 선택</label>
          <input
            type="date"
            value={sendAt}
            onChange={(e) => setSendAt(e.target.value)}
            required
          />
        </article>
        <article>
          <label>미래의 나에게 보내는 편지</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 h-32"
          />
        </article>
        <article>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreview && (
            <section className="mt-2">
              <Image
                src={imagePreview}
                alt="이미지 미리보기"
                width={200}
                height={200}
                className="object-cover"
              />
            </section>
          )}
        </article>
        <button type="button" onClick={handleLetterSubmit}>
          전송
        </button>
      </form>
      {message && (
        <p className="mt-4 text-center text-sm text-red-500">{message}</p>
      )}
    </section>
  );
};

export default LetterForm;

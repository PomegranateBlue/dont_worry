'use client';

import { supabase } from '@/app/utils/supabase/supabase';
import { useUserStore } from '@/store/store';
import { useState } from 'react';

const LetterForm = () => {
  //useState를 이용해 사용자가 입력한 값 상태관리
  const [content, setContent] = useState('');
  const [sendAt, setSendAt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');

  const { user } = useUserStore();
  console.log('사용자!!!!', user);

  //편지 제출 핸들러
  const handleLetterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //유저 정보 가져오기

    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();
    //console.log('사용자정보=>', user);
    //로그인하지 않은 경우, 제출 방지
    if (!user || userError) {
      setMessage('로그인 후 이용해주세요.');
      return;
    }

    //supabase에 편지 데이터 저장
    const userId = user.id;

    const { data, error } = await supabase
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
      setImageUrl('');
    }
  };
  return (
    <section>
      <header>
        {' '}
        <h1>미래의 나에게 하고싶은 말을 작성해보세요!</h1>
      </header>

      <form>
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
          />
        </article>
        <article>
          <label>이미지 선택</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
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

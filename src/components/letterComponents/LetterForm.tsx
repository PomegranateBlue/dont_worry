'use client';

import browserClient from '@/app/utils/supabase/client';
import { useState, useEffect } from 'react';
import CalendarStep from './CalendarStep';
import LetterStep from './LetterStep';

const LetterForm = () => {
  //useState를 이용해 사용자가 입력한 값 상태관리
  const [content, setContent] = useState('');
  const [sendAt, setSendAt] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [step, setStep] = useState<'calendar' | 'letter'>('calendar');

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
        setMessage('로그인 상태를 확인할 수 없습니다. 다시 로그인해주세요.');
      }
    };
    fetchUser();
  }, []);

  return (
    <section className="max-w-sm mx-auto px-4 py-6">
      <header>
        <h1 className="text-xl font-semibold text-center mb-4">
          미래의 나에게 하고싶은 말
        </h1>
      </header>
      {step === 'calendar' ? (
        <CalendarStep
          sendAt={sendAt}
          setSendAt={setSendAt}
          onNext={() => setStep('letter')}
        />
      ) : (
        <LetterStep
          sendAt={sendAt}
          setSendAt={setSendAt}
          content={content}
          setContent={setContent}
          imageFile={imageFile}
          setImageFile={setImageFile}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
          onBack={() => setStep('calendar')}
          setMessage={setMessage}
          userId={userId}
        />
      )}

      {message && (
        <p className="mt-4 text-center text-sm text-red-500">{message}</p>
      )}
    </section>
  );
};

export default LetterForm;

'use client';

import browserClient from '@/app/utils/supabase/client';
import { useState, useEffect } from 'react';
import CalendarStep from './CalendarStep';
import LetterStep from './LetterStep';
import CheckStep from './CheckStep';
import useMediaQuery from '@/hooks/letterHooks/useMediaQuery';

const LetterForm = () => {
  //useState를 이용해 사용자가 입력한 값 상태관리
  const [content, setContent] = useState('');
  const [sendAt, setSendAt] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [step, setStep] = useState<'calendar' | 'letter' | 'check'>('calendar');
  const isDesktop = useMediaQuery('(min-width: 1280px)'); // xl 기준

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
    <main>
      {isDesktop ? (
        // 데스크탑: step에 따라 조건부 렌더링
        <div>
          {step !== 'check' && (
            <article className="w-[648px] mx-auto">
              <CalendarStep
                sendAt={sendAt}
                setSendAt={setSendAt}
                onNext={() => setStep('letter')}
                isDesktop
              />
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
                setStep={setStep}
                isDesktop
              />
            </article>
          )}
          <article className="w-[648px] mx-auto">
            {step === 'check' && <CheckStep />}
          </article>
        </div>
      ) : (
        // 모바일: 기존 step 로직 유지
        <>
          {step === 'calendar' && (
            <CalendarStep
              sendAt={sendAt}
              setSendAt={setSendAt}
              onNext={() => setStep('letter')}
              isDesktop={false}
            />
          )}
          {step === 'letter' && (
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
              setStep={setStep}
              isDesktop={false}
            />
          )}
          {step === 'check' && <CheckStep />}
        </>
      )}

      {message && (
        <p className="mt-4 text-center text-sm text-red-500">{message}</p>
      )}
    </main>
  );
};

export default LetterForm;

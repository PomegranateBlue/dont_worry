'use client';

import { useState } from 'react';
import CalendarStep from './CalendarStep';
import LetterStep from './LetterStep';
import CheckStep from './CheckStep';
import useMediaQuery from '@/hooks/letterHooks/useMediaQuery';
import { useUserInfo } from '@/hooks/userHooks/useUserInfo';

const LetterForm = () => {
  //useState를 이용해 사용자가 입력한 값 상태관리
  const [content, setContent] = useState('');
  const [sendAt, setSendAt] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [step, setStep] = useState<'calendar' | 'letter' | 'check'>('calendar');
  const isDesktop = useMediaQuery('(min-width: 1280px)'); // xl 기준

  // useQuery로 사용자 정보 가져오기
  const { data: userInfo } = useUserInfo();

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
                userId={userInfo?.user_id ?? null}
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
        // 모바일, 테블릿: 기존 step 로직 유지
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
              userId={userInfo?.user_id ?? null}
              setStep={setStep}
              isDesktop={false}
            />
          )}
          {step === 'check' && <CheckStep />}
        </>
      )}
    </main>
  );
};

export default LetterForm;

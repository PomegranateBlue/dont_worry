'use client';

import { useRouter } from 'next/navigation';

const MessagePage = () => {
  const router = useRouter();

  return (
    <div>
      <button onClick={() => router.push('/note/result')}>제출하기</button>
    </div>
  );
};

export default MessagePage;

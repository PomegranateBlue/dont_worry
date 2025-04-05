'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
const MessagePage = () => {
  const router = useRouter();
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('content', message);
    const res = await fetch('/utils/openai', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();

    sessionStorage.setItem('gptResult', JSON.stringify(data));
    router.push('/note/result');
  };
  return (
    <div className="flex flex-col">
      <p>당신의 이야기를 듣고싶어요</p>
      <textarea
        className="text-black border-[1px] border-black"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSubmit}>완료</button>
    </div>
  );
};

export default MessagePage;

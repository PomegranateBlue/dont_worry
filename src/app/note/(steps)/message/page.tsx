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
    <div>
      <textarea
        className="text-black"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSubmit}>제출하기</button>
    </div>
  );
};

export default MessagePage;

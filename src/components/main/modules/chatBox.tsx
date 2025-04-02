'use client';
import { useState } from 'react';
import ChatForm from '../organisms/chatForm';
const ChatBox = () => {
  const [value, setValue] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userInput = value.trim();
    if (!userInput) return;

    setValue('');
    setResult(null);

    const formData = new FormData();
    formData.append('content', userInput);

    const res = await fetch('/utils/openai', {
      method: 'POST',
      body: formData
    });

    const resJson = await res.json();
    setResult(resJson.content);
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <ChatForm
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onSubmit={handleSubmit}
      />
      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded shadow">
          <p className="text-black text-sm mb-2">GPT 응답:</p>
          <p className="text-black">{result}</p>
        </div>
      )}
    </div>
  );
};

export default ChatBox;

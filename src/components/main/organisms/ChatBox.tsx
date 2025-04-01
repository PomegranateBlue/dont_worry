'use client';

import { useState } from 'react';
import InputForm from '../molecules/InputForm';

export default function ChatBox() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: input })
    });
    const data = await res.json();
    setResponse(data.reply);
  };

  return (
    <div className="p-4 border rounded bg-gray-100 ">
      <InputForm
      
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onSubmit={handleSubmit}
      />
      <div className="mt-4 whitespace-pre-line">{response}</div>
    </div>
  );
}

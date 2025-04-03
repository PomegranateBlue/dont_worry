'use client';
import React, { useState } from 'react';
import ChatForm from '../organisms/chatForm';
import MessageList from '../organisms/messageList';
const ChatBox = () => {
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState<
    { content: string; from: 'user' | 'chatBot' }[]
  >([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userInput = value.trim();
    if (!userInput) return;

    setMessages((prev) => [...prev, { content: userInput, from: 'user' }]);
    setValue('');
    setResult('');

    const formData = new FormData();
    formData.append('content', userInput);

    const res = await fetch('/utils/openai', {
      method: 'POST',
      body: formData
    });

    const resJson = await res.json();

    setMessages((prev) => [
      ...prev,
      { content: resJson.content, from: 'chatBot' }
    ]);
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <MessageList messages={messages} />
      <ChatForm
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ChatBox;

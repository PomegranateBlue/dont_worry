'use client';

import { useRef, useState } from 'react';

const HomePage = () => {
  const [value, setValue] = useState('');
  const messages = useRef<HTMLDivElement>(null);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setValue('');
    const me = document.createElement('p');
    me.textContent = value;
    messages.current?.appendChild(me);
    const formData = new FormData();
    formData.append('content', value);
    const res = await fetch('/api/openai', {
      method: 'POST',
      body: formData
    });
    const resJson = await res.json();
    const p = document.createElement('p');
    p.textContent = resJson.content;
    messages.current?.appendChild(p);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
        <button type="submit"></button>
      </form>
      <div ref={messages} className="border-2">
        <p>대화창</p>
      </div>
    </div>
  );
};

export default HomePage;

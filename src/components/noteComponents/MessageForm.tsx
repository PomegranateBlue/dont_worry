'use client';

import { useNoteStore } from '@/store/note/noteStore';
const MessageForm = () => {
  const { message, setMessage } = useNoteStore();

  return (
    <div className="relative w-full">
      <textarea
        className="p-2 border-[1px] border-black text-black resize-none w-full h-96 rounded-lg"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        maxLength={150}
        placeholder="최대 150자 입력 가능합니다"
      ></textarea>
    </div>
  );
};

export default MessageForm;

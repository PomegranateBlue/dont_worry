'use client';

import { useNoteStore } from '@/store/noteStore';

const MessageForm = () => {
  const { message, setMessage } = useNoteStore();

  return (
    <textarea
      className="border-[1px] border-black text-black resize-none"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
    ></textarea>
  );
};

export default MessageForm;

'use client';

import { useNoteStore } from '@/store/note/noteStore';
const MessageForm = () => {
  const { message, setMessage } = useNoteStore();

  return (
    <div className="p-5">
      <textarea
        className="p-5 border-[1px] border-label-assistive text-black resize-none w-[335px] h-[300px] rounded-lg"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        maxLength={150}
        placeholder="최대 150자 입력 가능합니다"
      ></textarea>
    </div>
  );
};

export default MessageForm;

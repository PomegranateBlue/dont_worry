'use client';

import { useNoteStore } from '@/store/note/noteStore';
import Text from '../common/Text';
const MessageForm = () => {
  const { message, setMessage } = useNoteStore();

  return (
    <div>
      <div className="flex px-5 py-2">
        <Text variant="heading3" color="label-normal">
          오늘 나의 걱정을 작성해보세요
        </Text>
      </div>
      <div className="flex px-4 py-3">
        <div></div>
        <textarea
          className=" border-[1px] border-label-assistive text-label-neutral resize-none w-[335px] h-[300px] rounded-[8px]"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={150}
          placeholder="최대 150자 입력 가능합니다"
        ></textarea>
      </div>
    </div>
  );
};

export default MessageForm;

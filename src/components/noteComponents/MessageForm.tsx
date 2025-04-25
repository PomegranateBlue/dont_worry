'use client';

import { useNoteStore } from '@/store/note/noteStore';
import Text from '../common/Text';
const MessageForm = () => {
  const { message, setMessage } = useNoteStore();
  const maxLength = 150;

  return (
    <section className="w-full max-w-[1200px] mx-auto ">
      <main className="w-full max-w-[648px] mx-auto ">
        <div className="flex px-5 py-2">
          <Text variant="heading3" color="label-normal">
            오늘 나의 걱정을 작성해보세요
          </Text>
        </div>

        <div className="relative flex flex-col px-4 py-3">
          <textarea
            className="max-w-[648px] border-[1px] border-label-assistive text-label-neutral resize-none w-full h-[300px] rounded-[8px] px-5 py-3"
            value={message}
            maxLength={149}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="무엇때문에 힘드셨나요?"
          ></textarea>
          <div className=" absolute text-right bottom-[12px] right-[16px] px-5 py-3">
            <Text variant="label1" color="label-assistive">
              {message.length} / {maxLength}
            </Text>
          </div>
        </div>
      </main>
    </section>
  );
};

export default MessageForm;

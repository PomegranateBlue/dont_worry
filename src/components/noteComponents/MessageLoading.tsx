'use client';

import Text from '../common/Text';

const MessageLoading = () => {
  return (
    <div className="absolute inset-0 z-50 bg-backgroundSet-offwhite flex justify-center items-center text-center">
      <Text variant="body1" color="label-normal">
        걱정이가 답장을 쓰고 있어요
        <br />
        잠시만 기다려주세요
      </Text>
    </div>
  );
};

export default MessageLoading;

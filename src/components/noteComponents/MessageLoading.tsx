'use client';

import Text from '../common/Text';

const MessageLoading = () => {
  return (
    <div className="absolute inset-0 z-50 bg-backgroundSet-offwhite flex justify-center items-center">
      <Text variant="title2" className="text-primary-4 animate-pulse">
        생성 중입니다...
      </Text>
    </div>
  );
};

export default MessageLoading;

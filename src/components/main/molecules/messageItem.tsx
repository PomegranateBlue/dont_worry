'use client';

interface MessageProps {
  message: string;
  from: 'user' | 'chatBot';
}

const MessageItem = ({ message, from = 'chatBot' }: MessageProps) => {
  return (
    <p
      className={`p-2 my-1 rounded max-w-[70%] text-black ${
        from === 'user'
          ? 'bg-blue-100 text-right self-end'
          : 'bg-gray-200 text-left self-start'
      }`}
    >
      {message}
    </p>
  );
};

export default MessageItem;

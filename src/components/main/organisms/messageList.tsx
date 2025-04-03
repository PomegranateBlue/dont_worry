'use client';
import React from 'react';
import MessageItem from '../molecules/messageItem';

interface MessageListProps {
  messages: { content: string; from: 'user' | 'chatBot' }[];
}

const MessageList = ({ messages }: MessageListProps) => {
  return (
    <div className="border-2 rounded p-4 h-80 overflow-y-auto flex flex-col gap-2 bg-white">
      <p className="text-black mb-2">대화창</p>
      {messages.map((msg, idx) => (
        <MessageItem key={idx} message={msg.content} from={msg.from} />
      ))}
    </div>
  );
};

export default MessageList;

'use client';
import React from 'react';
import InputField from '../atoms/inputField';
import SubmitButton from '../atoms/submitButton';

interface ChatFormProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ChatForm = ({ value, onChange, onSubmit }: ChatFormProps) => {
  return (
    <form onSubmit={onSubmit} className="flex mt-4">
      <InputField value={value} onChange={onChange} />
      <SubmitButton />
    </form>
  );
};

export default ChatForm;

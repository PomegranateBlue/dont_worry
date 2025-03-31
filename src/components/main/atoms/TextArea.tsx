'use client';

type TextAreaProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
};

export default function TextArea({ value, onChange, placeholder }: TextAreaProps) {
  return (
    <textarea
      className="w-full p-2 border rounded"
      rows={4}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

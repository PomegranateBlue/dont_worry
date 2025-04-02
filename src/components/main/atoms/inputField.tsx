'use client';

interface InputFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const InputField = ({ value, onChange }: InputFieldProps) => {
  return (
    <textarea
      className="text-black w-full min-h-[120px] p-4 rounded-lg border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
      placeholder="여러분의 걱정거리를 털어놔보세요"
      value={value}
      onChange={onChange}
    />
  );
};

export default InputField;

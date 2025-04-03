'use client';

interface InputFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({ value, onChange }: InputFieldProps) => {
  return (
    <input
      className="text-black"
      type="text"
      placeholder="여러분의 걱정거리를 털어놔보세요"
      value={value}
      onChange={onChange}
    />
  );
};

export default InputField;

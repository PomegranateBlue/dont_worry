import TextArea from '../atoms/TextArea';
import Button from '../atoms/Button';

type InputFormProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
};

export default function InputForm({ value, onChange, onSubmit }: InputFormProps) {
  return (
    <div>
      <TextArea value={value} onChange={onChange} placeholder="메시지를 입력하세요..." />
      <Button onClick={onSubmit}>보내기</Button>
    </div>
  );
}

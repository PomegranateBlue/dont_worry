import { FieldError, UseFormRegister } from 'react-hook-form';
import Text from '../common/Text';

interface InputFormProps {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  required: boolean;
  register: UseFormRegister<any>;
  error?: { message?: string };
  helperText: string;
}
export const InputForm = ({
  label,
  type,
  name,
  placeholder,
  required,
  register,
  error,
  helperText
}: InputFormProps) => {
  return (
    <div>
      <label className="space-y-2">
        <Text variant="body2" color="label-normal">
          {label}
        </Text>
        <input
          {...register(name, { required })}
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          className={`w-full p-4 border-[1px] rounded-md focus:outline-none placeholder-label-assistive ${
            error ? 'border-error' : 'border-label-assistive'
          }`}
        />
        {error ? (
          <Text variant="label1" color="error">
            {error.message}
          </Text>
        ) : (
          <Text variant="label1" color="label-assistive">
            {helperText}
          </Text>
        )}
      </label>
    </div>
  );
};

import { FieldValues } from 'react-hook-form';
import Text from '../common/Text';
import { InputFormProps } from '@/types/auth/auth';

export const InputForm = <T extends FieldValues>({
  label,
  type,
  name,
  placeholder,
  required,
  register,
  error,
  infoText
}: InputFormProps<T>) => {
  return (
    <div>
      <label className="space-y-2">
        <Text variant="body2" color="label-normal">
          {label}
        </Text>
        {infoText && infoText}
        <input
          {...register(name, { required })}
          type={type}
          name={String(name)}
          id={String(name)}
          placeholder={placeholder}
          className={`w-full p-4 border-[1px] rounded-md focus:outline-none placeholder-label-assistive ${
            error ? 'border-error' : 'border-label-assistive'
          }`}
        />
        {error && (
          <Text variant="label1" color="error">
            {error.message}
          </Text>
        )}
      </label>
    </div>
  );
};

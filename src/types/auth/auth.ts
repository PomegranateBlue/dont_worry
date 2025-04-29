import { ReactNode } from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

export interface LoginFormProps {
  mode: string;
}

export interface AuthFormValues {
  email: string;
  password: string;
  fullName?: string;
}

export interface InputFormProps<T extends FieldValues> {
  label: string;
  type: string;
  name: Path<T>;
  placeholder: string;
  required: boolean;
  register: UseFormRegister<T>;
  error?: { message?: string };
  infoText?: ReactNode;
}

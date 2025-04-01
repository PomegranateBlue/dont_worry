'use client';
import { login } from '../action';
import { FieldValues, useForm } from 'react-hook-form';

export default function LoginPage() {
  const { register, handleSubmit, formState } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = (value: FieldValues) => {
    console.log(value);
    // login(value);
  };

  console.log('에러', formState.errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Email:
        <input
          {...register('email', {
            required: {
              value: true,
              message: '이메일을 입력해 주세요.'
            },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: '유효한 이메일 주소가 아닙니다.'
            }
          })}
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          required
        />
      </label>
      {formState.errors.email && <span>{formState.errors.email.message}</span>}
      <label>
        Password:
        <input
          {...register('password', {
            required: true
          })}
          type="password"
          name="password"
          placeholder="Password"
          required
        />
      </label>
      {formState.errors.email && <span>{formState.errors.email.message}</span>}
      <button formAction={login}>Log in</button>
      {/* <button formAction={signup}>Sign up</button> */}
    </form>
  );
}

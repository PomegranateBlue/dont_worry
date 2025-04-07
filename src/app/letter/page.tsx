import LetterForm from '@/components/LetterForm';
import { supabase } from '../utils/supabase/supabase';

interface LetterProps {
  user: string;
}

const LetterPage = async ({ user }: LetterProps) => {
  const { user, error } = await supabase.auth.signUp({
    email: 'user@example.com',
    password: 'yourpassword'
  });

  if (error) {
    console.error('회원가입 실패:', error.message);
  } else {
    console.log('회원가입 성공:', user);
  }

  return (
    <div>
      <h1>편지페이지</h1>
      <LetterForm />
    </div>
  );
};

export default LetterPage;

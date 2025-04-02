import { supabase } from '../utils/supabase/supabase';

type LetterProps = {
  userId: string;
  content: string;
  sendAt: string;
  imageUrl: string;
};

const LetterPage = async ({
  userId,
  content,
  sendAt,
  imageUrl
}: LetterProps) => {
  const { data, error } = await supabase
    .from('letters')
    .insert([{ user_id: userId, content, send_at: sendAt, img_url: imageUrl }]);
  if (error) {
    console.error('편지 저장 실패', error);
  }
  return data;
};

export default LetterPage;

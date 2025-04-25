import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { TablesInsert } from '../../../../database.types';
import { NoteError } from '@/constants/error/noteError';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { message, result, topic, emotions, userId } = body;

    if (!userId) {
      return NextResponse.json({ error: '로그인 정보 없음' }, { status: 401 });
    }

    if (!message) {
      throw new NoteError('NOT_ENOUGH_TEXT');
    }

    const note: TablesInsert<'users_note'> = {
      content: JSON.stringify({
        Question: message,
        Answer: result.content
      }),
      topic_category: topic,
      emotion_category: emotions.join(','),
      created_at: new Date().toISOString(),
      note_img: null,
      user_id: userId
    };

    const { error } = await supabase.from('users_note').insert([note]);

    if (error) {
      throw new NoteError('CANT_UPLOAD_USER_WORRIES');
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    throw new NoteError('CANT_UPLOAD_USER_WORRIES');
  }
};

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { TablesInsert } from '../../../../database.types';
import { NOTE_ERROR_KEYS,NOTE_ERROR_MESSAGE } from '@/constants/error/noteError';

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
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("서버 저장 실패",error)
    return NextResponse.json(
      { error: '수파베이스 저장 실패' },
      { status: 500 }
    );
  }
};

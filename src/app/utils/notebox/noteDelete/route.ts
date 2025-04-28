import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { SupabaseError } from '@/constants/error/supabaseErrorKeys';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const DELETE = async (req: Request) => {
  try {
    const body = await req.json();
    const { noteIds } = body;

    const { error } = await supabase
      .from('users_note')
      .delete()
      .in('note_id', noteIds);

    if (error) {
      console.error(error);
      throw new SupabaseError('SUPABASE_DELETE_FAILED');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    throw new SupabaseError('SUPABASE_DELETE_FAILED');
  }
};

import { supabase } from '@/app/utils/supabase/supabase';
import browserClient from '@/app/utils/supabase/client';

import {
  isSupabaseErrorResponse,
  SUPABASE_ERROR_KEYS,
  SUPABASE_ERROR_MESSAGE
} from '@/constants/error/supabaseErrorKeys';
import { NextResponse } from 'next/server';
import { parseAndSort } from './stringUtils';

export const fetchExistingSolution = async (
  userId: string,
  keywords: string
): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from('user_statistics')
      .select('comment, top_three, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase 에러 발생:', error);
      return null;
    }

    const matchingEntry = data?.find((entry) => {
      return entry.top_three && parseAndSort(entry.top_three) === keywords;
    });

    return matchingEntry ? matchingEntry.comment : null;
  } catch (error) {
    console.error('기존 솔루션 조회 중 오류:', error);
    return null;
  }
};

export const saveSolutionToDatabase = async (
  userId: string,
  solution: string,
  keywords: string
) => {
  try {
    const { data: existing } = await browserClient
      .from('user_statistics')
      .select('id')
      .eq('user_id', userId)
      .eq('top_three', keywords)
      .maybeSingle();

    if (existing) {
      return { success: true };
    }

    const { error: insertError } = await browserClient
      .from('user_statistics')
      .insert([
        {
          user_id: userId,
          comment: solution,
          top_three: keywords,
          created_at: new Date().toISOString()
        }
      ]);

    if (insertError) {
      console.error('삽입 에러:', insertError);
      return NextResponse.json(
        isSupabaseErrorResponse(SUPABASE_ERROR_KEYS.SUPABASE_INSERT_FAILED),
        { status: SUPABASE_ERROR_MESSAGE.SUPABASE_INSERT_FAILED.status }
      );
    }

    return { success: true };
  } catch (error) {
    console.error('솔루션 저장 중 오류:', error);
    return { success: false, error };
  }
};

import { supabase } from '../supabase/supabase';
import { UserNote } from '@/types/ranking/types';

export const fetchUserNotes = async (
  year: number,
  month: number,
  week: number
) => {
  try {
    const startDate = new Date(year, month - 1, (week - 1) * 7 + 1);
    const endDate = new Date(year, month - 1, (week - 1) * 7 + 7);

    const startDateStr = startDate.toISOString().split('T')[0];
    const endDateStr = endDate.toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('users_note')
      .select('*')
      .gte('created_at', startDateStr)
      .lte('created_at', endDateStr);

    if (error) {
      throw error;
    }

    return data as UserNote[];
  } catch (err) {
    console.error('데이터 조회 오류:', err);
    throw new Error('데이터를 불러오는 중 오류가 발생했습니다.');
  }
};

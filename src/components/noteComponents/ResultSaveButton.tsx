'use client';

import { useNoteStore } from '@/store/noteStore';
import { supabase } from '@/app/utils/supabase/supabase';
import { useState } from 'react';
import { TablesInsert } from '../../../database.types';
import { useUserStore } from '@/store/store';
import { useUserData } from '@/hooks/useMyPageQueries';

const ResultSaveButton = () => {
  const { selectedTopic, selectedEmotions, result } = useNoteStore();
  const { user } = useUserStore();
  const [isSaved, setIsSaved] = useState(false);
  const loginUser = useUserData();

  console.log(loginUser);

  const handleSaveMessage = async () => {
    console.log('저장되었습니다');
    console.log(result);
    console.log(user);
    const note: TablesInsert<'users_note'> = {
      content: result,
      topic_category: selectedTopic,
      emotion_category: selectedEmotions.join(','),
      created_at: new Date().toISOString(),
      note_img: null,
      id: user!
    };

    // console.log('111111111111111', selectedTopic);
    // console.log('222222222222222222', selectedEmotions);
    // console.log('33333333333333333333', result);

    console.log('#############', note);
    const { error } = await supabase.from('users_note').insert([note]);

    if (error) {
      console.error('저장 실패:', error);
    } else {
      setIsSaved(true);
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleSaveMessage}
        className="px-4 py-2 bg-black text-white rounded"
      >
        저장하기
      </button>
      {isSaved && <p className="text-green-600 mt-2">저장되었습니다!</p>}
    </div>
  );
};

export default ResultSaveButton;

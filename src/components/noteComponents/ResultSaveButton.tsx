'use client';

import { useNoteStore } from '@/store/noteStore';
import { supabase } from '@/app/utils/supabase/supabase';
import { useUserInfo } from '@/hooks/useMyPageQueries';
import { useState } from 'react';
import { TablesInsert } from '../../../database.types';

const ResultSaveButton = () => {
  const { selectedTopic, selectedEmotions, result } = useNoteStore();
  const { data: user } = useUserInfo();
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveMessage = async () => {
    if (!user || !result) return;

    const note: TablesInsert<'users_note'> = {
      content: result,
      topic_category: selectedTopic,
      emotion_category: selectedEmotions.join(','),
      created_at: new Date().toISOString(),
      note_img: null
    };

    const { error } = await supabase.from('users_note').insert(note);

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

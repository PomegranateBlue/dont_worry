'use client';

import { useNoteStore } from '@/store/noteStore';
import { supabase } from '@/app/utils/supabase/supabase';
import { useState } from 'react';
import { TablesInsert } from '../../../database.types';
import { useUserStore } from '@/store/store';
import { ThumbsUp } from 'lucide-react';
// import { useUserData } from '@/hooks/useMyPageQueries';

const ResultSaveButton = () => {
  const { selectedTopic, selectedEmotions, message, result } = useNoteStore();
  const { user } = useUserStore();
  const [isSaved, setIsSaved] = useState(false);
  // const loginUser = useUserData();

  // console.log(loginUser);

  const handleSaveMessage = async () => {
    console.log('저장되었습니다');
    console.log(message);
    console.log(result);
    // console.log(user);

    if (!user) {
      return;
    }
    const note: TablesInsert<'users_note'> = {
      content: JSON.stringify({ Question: message, Answer: result }),
      topic_category: selectedTopic,
      emotion_category: selectedEmotions.join(','),
      created_at: new Date().toISOString(),
      note_img: null,
      id: user
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
    <button onClick={handleSaveMessage} disabled={isSaved}>
      <ThumbsUp
        className={`w-5 h-5 ${
          isSaved ? 'text-purple-500' : 'text-gray-500 hover:text-purple-500'
        }`}
      />
    </button>
  );
};

export default ResultSaveButton;

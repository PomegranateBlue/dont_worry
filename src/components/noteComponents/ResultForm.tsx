import { useNoteStore } from '@/store/noteStore';
// import { useUserData } from '@/hooks/useMyPageQueries';
import { useUserInfo } from '@/hooks/useMyPageQueries';

const ResultForm = () => {
  const { selectedTopic, selectedEmotions, message, result } = useNoteStore();

  const handleSaveMessage = async (note: TablesInsert<'users_note'>) => {
    const { data, error } = await supabase.from('users_note').insert(note);

    if (error) throw error;

    return data;
  };

  return (
    <div>
      <h2>걱숭이의 답변은?</h2>
      <p>{result || '...같이 고민하는 중'}</p>
      <button onClick={handleSaveMessage}>저장하기</button>
    </div>
  );
};

export default ResultForm;

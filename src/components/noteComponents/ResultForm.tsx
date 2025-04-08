import { useNoteStore } from '@/store/noteStore';
import ResultSaveButton from './ResultSaveButton';
const ResultForm = () => {
  const { result } = useNoteStore();

  return (
    <div>
      <h2>걱숭이의 답변은?</h2>
      <p>{result || '...같이 고민하는 중'}</p>
      <ResultSaveButton />
    </div>
  );
};

export default ResultForm;

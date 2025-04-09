'use client';

import { useNoteStore } from '@/store/noteStore';
const ResultForm = () => {
  const { result } = useNoteStore();
  console.log(result);
  return (
    <div>
      <h2>걱숭이의 답변은?</h2>
      <p>{result || '...같이 고민하는 중'}</p>
    </div>
  );
};

export default ResultForm;

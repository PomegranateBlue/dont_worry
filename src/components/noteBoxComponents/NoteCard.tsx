import { useState } from 'react';

interface NoteCardProps {
  content: string;
  created_at: string;
  note_id: string;
  topic_category: string;
  emotion_category: string;
}

const NoteCard = ({
  content,
  created_at,
  note_id,
  topic_category,
  emotion_category
}: NoteCardProps) => {
  const formattedDate = new Date(created_at).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short'
  });
  const [showAnswer, setShowAnswer] = useState(false);

  console.log('content Props', content); //string

  const userNote = JSON.parse(content);

  // console.log('유저 노트부분', userNote);
  const message = userNote.Question;
  const answer = userNote.Answer;

  // console.log('user Input', message);
  // console.log('gpt answer', answer);

  return (
    <div id={note_id} className="bg-gray-100 p-4 rounded-xl">
      <div className="flex items-center">
        <div className="text-sm px-3 py-1 font-semibold bg-gray rounded-full border-black border-[1px]">
          {emotion_category}
        </div>
        <div className="ml-1 px-3 py-1 text-sm bg-black text-white rounded-full">
          {topic_category}
        </div>
      </div>

      <div className="text-xs text-gray-500 mt-1">{formattedDate}</div>

      <div className="mt-2 text-sm leading-relaxed text-gray-800 whitespace-pre-wrap line-clamp-5">
        {message}
      </div>

      <button
        onClick={() => setShowAnswer(!showAnswer)}
        className="mt-2 text-sm text-blue-600 underline"
      >
        {showAnswer ? '답변 숨기기' : 'GPT 답변 보기'}
      </button>

      {showAnswer && (
        <div className="mt-2 p-3 bg-white border rounded text-sm text-gray-700 whitespace-pre-wrap">
          {answer}
        </div>
      )}
    </div>
  );
};
export default NoteCard;

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
  return (
    <div id={note_id} className="bg-gray-100 p-4 rounded-xl">
      <div className="flex">
        {/* <span>이모티콘</span> */}
        <div className="text-sm px-3 py-1 font-semibold bg-gray rounded-full border-black border-[1px]">
          {emotion_category}
        </div>
        <div className="ml-1 px-3 py-1 text-sm bg-black text-white rounded-full">
          {topic_category}
        </div>
      </div>

      <div className="text-xs text-gray-500 mt-1">{formattedDate}</div>
      <div className="mt-2 text-sm leading-relaxed">{content}</div>
    </div>
  );
};
export default NoteCard;

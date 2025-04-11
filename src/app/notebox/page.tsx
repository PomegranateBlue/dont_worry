'use client';
import { useState, useEffect } from 'react';
import FilterModal from '@/components/noteBoxComponents/FilterModal';
import FilterBar from '@/components/noteBoxComponents/FilterBar';
import { fetchUser, fetchUserWorries } from '../utils/supabase/db';
import NoteCard from '@/components/noteBoxComponents/NoteCard';
import { useNoteListStore } from '@/store/notebox/filterStore';

const NotePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { notes, setNotes } = useNoteListStore();
  console.log('note pages', notes);

  useEffect(() => {
    const getUserNotes = async () => {
      try {
        const userId = await fetchUser(); // 로그인한 사용자 ID
        const userWorries = await fetchUserWorries(userId); // 걱정 노트 목록
        setNotes(userWorries);
      } catch (error) {
        console.error(' 에러 발생:', error);
      }
    };
    getUserNotes();
  }, [setNotes]);

  return (
    <div className="w-full max-w-[375px] mx-auto min-h-screen bg-white flex flex-col">
      <h1 className="text-xl font-bold text-center p-4">걱정 보관함</h1>
      <FilterBar />
      <main className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
        {notes.map((note) => (
          <NoteCard
            key={note.note_id}
            content={note.content}
            created_at={note.created_at}
            note_id={note.note_id}
            topic_category={note.topic_category}
            emotion_category={note.emotion_category}
          />
        ))}
      </main>

      {isModalOpen && (
        <FilterModal isOpen onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default NotePage;

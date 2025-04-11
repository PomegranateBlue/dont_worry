'use client';
import { useEffect } from 'react';
import FilterBar from '@/components/noteBoxComponents/FilterBar';
import { fetchUser, fetchUserWorries } from '../utils/supabase/db';
import NoteCard from '@/components/noteBoxComponents/NoteCard';
import { useNoteListStore } from '@/store/notebox/filterStore';
import { useQuery } from '@tanstack/react-query';
import { Tables } from '../../../database.types';

const NotePage = () => {
  const { notes, setNotes } = useNoteListStore();
  console.log('note pages', notes);

  const userQuery = useQuery<string | null, Error>({
    queryKey: ['user'],
    queryFn: fetchUser,
    staleTime: Infinity
  });

  const userNotesQuery = useQuery<Tables<'users_note'>[], Error>({
    queryKey: ['userNotes', userQuery.data],
    queryFn: () => fetchUserWorries(userQuery.data),
    enabled: !!userQuery.data
  });

  useEffect(() => {
    if (userNotesQuery.data) {
      setNotes(userNotesQuery.data);
    }
  }, [userNotesQuery.data, setNotes]);

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
    </div>
  );
};

export default NotePage;

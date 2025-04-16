'use client';
import { useEffect, useState } from 'react';
import FilterBar from '@/components/noteBoxComponents/FilterBar';
import FilterModal from '@/components/noteBoxComponents/FilterModal';
import { fetchUser, fetchUserWorries } from '../utils/supabase/db';
import NoteCard from '@/components/noteBoxComponents/NoteCard';
import { useNoteListStore } from '@/store/notebox/noteboxStore';
import { useQuery } from '@tanstack/react-query';
import { Tables } from '../../../database.types';

const NotePage = () => {
  const { notes, setNotes } = useNoteListStore();

  const [filterType, setFilterType] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState<'최신순' | '과거순'>(
    '최신순'
  );

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

  const filteredNotes = notes
    .filter((note) => {
      if (filterType === '주제별') {
        return (
          selectedTopics.length === 0 ||
          selectedTopics.includes(note.topic_category!)
        );
      }
      if (filterType === '감정별') {
        const emotions = note.emotion_category
          ? note.emotion_category.split(',').map((emotion) => emotion.trim())
          : [];
        return (
          selectedEmotions.length === 0 ||
          selectedEmotions.some((selected) => emotions.includes(selected))
        );
      }
      return true;
    })
    .sort((a, b) => {
      return selectedSort === '최신순'
        ? new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        : new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    });

  return (
    <div className="w-full max-w-[375px] mx-auto min-h-screen bg-white flex flex-col">
      <h1 className="text-xl font-bold text-center p-4">걱정 보관함</h1>

      <FilterBar
        onClickFilter={(label) => {
          setFilterType(label);
          setIsModalOpen(true);
        }}
      />

      {isModalOpen && (
        <FilterModal
          selectedOption={filterType}
          setSelectedOption={setFilterType}
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
          selectedTopics={selectedTopics}
          setSelectedTopics={setSelectedTopics}
          selectedEmotions={selectedEmotions}
          setSelectedEmotions={setSelectedEmotions}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      <main className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
        {filteredNotes.map((note) => (
          <NoteCard
            key={note.note_id}
            content={note.content}
            created_at={note.created_at}
            note_id={note.note_id}
            topic_category={note.topic_category}
            emotion_category={
              note.emotion_category
                ? note.emotion_category
                    ?.split(',')
                    .map((emotion) => emotion.trim())
                : null
            }
          />
        ))}
      </main>
    </div>
  );
};

export default NotePage;

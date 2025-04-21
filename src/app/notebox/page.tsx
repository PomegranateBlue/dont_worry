'use client';

import { useEffect, useState } from 'react';
import FilterBar from '@/components/noteBoxComponents/FilterBar';
import FilterModal from '@/components/noteBoxComponents/FilterModal';
import { fetchUser, fetchUserWorries } from '../utils/supabase/db';
import NoteCard from '@/components/noteBoxComponents/NoteCard';
import { useNoteListStore } from '@/store/notebox/noteboxStore';
import { useQuery } from '@tanstack/react-query';
import { Tables } from '../../../database.types';
import Text from '@/components/common/Text';
import { supabase } from '../utils/supabase/supabase';
import EditBar from '@/components/noteBoxComponents/EditBar';

const NotePage = () => {
  const { notes, setNotes } = useNoteListStore();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedNoteIds, setSelectedNoteIds] = useState<string[]>([]);
  const [filterType, setFilterType] = useState<string | null>('주제별');
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

  // 선택된 필터 제거
  const handleRemoveFilter = (
    type: '정렬순' | '주제별' | '감정별',
    value: string
  ) => {
    if (type === '주제별') {
      setSelectedTopics([]);
    } else if (type === '감정별') {
      setSelectedEmotions((prev) => prev.filter((v) => v !== value));
    } else if (type === '정렬순') {
      setSelectedSort('최신순');
    }
  };

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

  const onToggleEdit = () => {
    setIsEdit((prev) => !prev);
    setSelectedNoteIds([]); // 체크된 항목 초기화
  };
  const handleDeleteNote = async () => {
    if (selectedNoteIds.length === 0) return;

    const confirmDelete = window.confirm('정말 삭제하시겠습니까?');
    if (!confirmDelete) return;

    const { error } = await supabase
      .from('users_note')
      .delete()
      .in('note_id', selectedNoteIds);

    if (error) {
      console.error('삭제 실패:', error.message);
      return;
    }

    setNotes(notes.filter((note) => !selectedNoteIds.includes(note.note_id)));
    setSelectedNoteIds([]);
    setIsEdit(false);
  };
  return (
    <div className="w-full max-w-[375px] mx-auto min-h-screen bg-white flex flex-col">
      <div className="flex justify-center items-center px-[6px] py-[15px]">
        <Text variant="title2" color="label-normal" className=" text-center">
          걱정 보관함
        </Text>
      </div>

      <div className="sticky top-0 z-10 bg-backgroundSet-normal">
        <FilterBar
          onClickFilter={(label) => {
            setFilterType(label);
            setIsModalOpen(true);
          }}
          selectedOption={filterType}
          selectedTopic={selectedTopics[0] || ''}
          selectedEmotions={selectedEmotions}
          selectedSort={selectedSort}
          onRemoveFilter={handleRemoveFilter}
        />
        <EditBar
          isEdit={isEdit}
          selectedNoteIds={selectedNoteIds}
          onToggleEdit={onToggleEdit}
          onDelete={handleDeleteNote}
        />
      </div>

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

      <main className="flex-1 overflow-y-auto px-5 py-2 space-y-4">
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
            isEdit={isEdit}
            isChecked={selectedNoteIds.includes(note.note_id)}
            onToggleCheck={(id: string) => {
              setSelectedNoteIds((item) =>
                item.includes(id)
                  ? item.filter((cardId) => cardId !== id)
                  : [...item, id]
              );
            }}
          />
        ))}
      </main>
    </div>
  );
};

export default NotePage;

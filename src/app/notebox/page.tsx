'use client';

import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import FilterBar from '@/components/noteBoxComponents/FilterBar';
import FilterModal from '@/components/noteBoxComponents/FilterModal';
import { useNoteListStore } from '@/store/notebox/noteboxStore';
import Text from '@/components/common/Text';
import EditBar from '@/components/noteBoxComponents/EditBar';
import { useNoteDelete } from '@/hooks/noteboxHooks/useNoteDelete';
import { useUserWorries } from '@/hooks/noteboxHooks/useUserWorries';
import NoteList from '@/components/noteBoxComponents/NoteList';
import { FilterProps, SortProps } from '@/constants/filter/filterProps';

const NotePage = () => {
  const { notes, setNotes } = useNoteListStore();
  const searchParams = useSearchParams();

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedNoteIds, setSelectedNoteIds] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [filterType, setFilterType] = useState<FilterProps>(FilterProps.TOPIC);
  const [selectedSort, setSelectedSort] = useState<SortProps>(SortProps.LATEST);
  
  const { mutateAsync: deleteNote } = useNoteDelete();
  const { data: userNotes } = useUserWorries();

  useEffect(() => {
    if (userNotes) {
      setNotes(userNotes);
    }
  }, [userNotes, setNotes]);

  useEffect(() => {
    const category = searchParams.get('category');
    const categoryType = searchParams.get('categoryType');

    if (category && categoryType) {
      if (categoryType === 'topic') {
        setFilterType(FilterProps.TOPIC);
        setSelectedTopics([category]);
      } else if (categoryType === 'emotion') {
        setFilterType(FilterProps.EMOTION);
        setSelectedEmotions([category]);
      }
    }
  }, [searchParams]);

  const handleRemoveFilter = (type: FilterProps, value: string) => {
    if (type === FilterProps.TOPIC) {
      setSelectedTopics([]);
    } else if (type === FilterProps.EMOTION) {
      setSelectedEmotions((prev) => prev.filter((v) => v !== value));
    } else if (type === FilterProps.SORT) {
      setSelectedSort(SortProps.LATEST);
    }
  };

  const filteredNotes = useMemo(() => {
    return notes
      .filter((note) => {
        if (filterType === FilterProps.TOPIC) {
          return (
            selectedTopics.length === 0 ||
            selectedTopics.includes(note.topic_category!)
          );
        }
        if (filterType === FilterProps.EMOTION) {
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
      .sort((a, b) =>
        selectedSort === SortProps.LATEST
          ? new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          : new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
  }, [notes, filterType, selectedTopics, selectedEmotions, selectedSort]);

  const onToggleEdit = () => {
    setIsEdit((prev) => !prev);
    setSelectedNoteIds([]);
  };

  const handleDeleteNote = async () => {
    if (selectedNoteIds.length === 0) return;

    selectedNoteIds.forEach((id) => {
      deleteNote({ noteId: id });
    });
    setNotes(notes.filter((note) => !selectedNoteIds.includes(note.note_id)));
    setSelectedNoteIds([]);
    setIsEdit(false);
  };

  return (
    <section className="flex max-w-[1200px] mx-auto">
      <article className="w-full max-w-[648px] mx-auto pb-20 bg-backgroundSet-normal flex flex-col">
        <div className="flex justify-center items-center px-[6px] py-[15px]">
          <Text
            variant="title2"
            variant2="heading1"
            color="label-normal"
            className="text-center"
          >
            걱정 보관함
          </Text>
        </div>

        <div className="flex flex-1 justify-between items-center sticky top-0 z-10 bg-backgroundSet-normal">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide whitespace-nowrap">
            <FilterBar
              onClickFilter={(label) => {
                setFilterType(label);
                setIsModalOpen(true);
              }}
              selectedOption={filterType}
              selectedTopics={selectedTopics}
              selectedEmotions={selectedEmotions}
              selectedSort={selectedSort}
              onRemoveFilter={handleRemoveFilter}
            />
          </div>

          <div className="pr-[10px] whitespace-nowrap">
            <EditBar
              isEdit={isEdit}
              selectedNoteIds={selectedNoteIds}
              onToggleEdit={onToggleEdit}
              onDelete={handleDeleteNote}
            />
          </div>
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

        <NoteList
          notes={filteredNotes}
          isEdit={isEdit}
          selectedNoteIds={selectedNoteIds}
          onToggleCheck={(id: string) => {
            setSelectedNoteIds((note) =>
              note.includes(id) ? note.filter((i) => i !== id) : [...note, id]
            );
          }}
        />
      </article>
    </section>
  );
};

export default NotePage;

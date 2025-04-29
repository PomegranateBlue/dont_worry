import React from 'react';
import NoteCard from './NoteCard';
import { Check } from 'lucide-react';
import { Tables } from '../../../database.types';

interface Props {
  notes: Tables<'users_note'>[];
  isEdit: boolean;
  selectedNoteIds: string[];
  onToggleCheck: (id: string) => void;
}

const NoteList = ({ notes, isEdit, selectedNoteIds, onToggleCheck }: Props) => {
  return (
    <section className="flex-1 px-5 py-2 space-y-4">
      {notes.map((note) => {
        const isChecked = selectedNoteIds.includes(note.note_id);
        return (
          <div className="flex w-full items-start gap-2" key={note.note_id}>
            {isEdit && (
              <button
                onClick={() => onToggleCheck(note.note_id)}
                className={`flex items-center justify-center mt-1  p-1 ${
                  isChecked
                    ? ' text-white bg-primary-4 border-[2px] border-primary-4 rounded-full '
                    : 'border-label-alternative border-[2px] text-label-alternative rounded-full'
                }`}
              >
                <Check className="w-[16px] h-[16px]" />
              </button>
            )}
            <div className="flex-1 min-w-0">
              <NoteCard
                content={note.content}
                created_at={note.created_at}
                note_id={note.note_id}
                topic_category={
                  note.topic_category
                    ? note.topic_category?.split(',').map((e) => e.trim())
                    : null
                }
                emotion_category={
                  note.emotion_category
                    ? note.emotion_category.split(',').map((e) => e.trim())
                    : null
                }
                isEdit={isEdit}
                isChecked={isChecked}
                onToggleCheck={onToggleCheck}
              />
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default React.memo(NoteList);

'use client';
import { useState, useEffect } from 'react';
import FilterModal from '@/components/noteBoxComponents/FilterModal';
import FilterBar from '@/components/noteBoxComponents/FilterBar';
import { useUserData } from '@/hooks/useMyPageQueries';
import {
  fetchUserInfo,
  fetchUser,
  fetchUserWorries
} from '../utils/supabase/db';
import NoteCard from '@/components/noteBoxComponents/NoteCard';

const NotePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: loginUser } = useUserData();
  const [notes, setNotes] = useState<any[]>([]);
  console.log('사용자 노트', notes);
  
  console.log('스토어 유저', loginUser);
  useEffect(() => {
    const getUserNotes = async () => {
      try {
        const userId = await fetchUser(); // 로그인한 사용자 ID
        // console.log('✅ 로그인된 사용자 ID:', userId);

        const userInfo = await fetchUserInfo(userId); // 사용자 정보
        console.log('✅ 사용자 정보:', userInfo);

        const userWorries = await fetchUserWorries(userId); // 걱정 노트 목록
        setNotes(userWorries);
        // console.log('✅ 걱정 노트:', userWorries);
      } catch (error) {
        console.error('🚨 에러 발생:', error);
      }
    };

    getUserNotes();
  }, []);

  // console.log('notebox 페이지에서의 로그인 유저', loginUser);
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

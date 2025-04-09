'use client';

import NicknameEditModal from '@/components/mypage/NicknameEditModal';

import ProfileImage from '@/components/mypage/ProfileImage';
import {
  useUpdateUserInfo,
  useUserData,
  useUserInfo,
  useUserLetters,
  useUserWorries
} from '@/hooks/useMyPageQueries';
import { useUserStore } from '@/store/store';
import { ChevronRight, PencilLine } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { uploadProfileImage } from '../utils/supabase/db';
import { useQueryClient } from '@tanstack/react-query';
import LogOutButton from '@/components/loginComponents/LogOutButton';

const MyPage = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, setUser } = useUserStore();
  const { mutateAsync: updateUserInfo } = useUpdateUserInfo();
  const { data: letters, isLoading: lettersLoading } = useUserLetters();
  const { data: userInfo, isLoading: userDataLoading } = useUserInfo();
  const { data: userWorries, isLoading: userWorriesLoading } = useUserWorries();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleUpload = async (file: File) => {
    try {
      if (!user) return;
      const url = await uploadProfileImage(file, user);
      await updateUserInfo({ profile_img: url });
    } catch (err) {
      alert('이미지 업로드 실패 ');
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      await updateUserInfo({ profile_img: null });
      queryClient.invalidateQueries({ queryKey: ['userinfo', user] });
    } catch (err) {
      alert('이미지 삭제 실패 ');
      console.log(err);
    }
  };

  const {
    data: userid,
    isPending: isUserPending,
    isError: isUserError
  } = useUserData();

  // userid가 로드되면 스토어에 저장
  useEffect(() => {
    if (userid) {
      setUser(userid);
    }
  }, [userid, setUser]);

  const isLoading =
    userDataLoading || lettersLoading || isUserPending || userWorriesLoading;
  console.log('page.tsx userInfo$$', userInfo);

  if (isUserError) {
    return <div>사용자 정보를 가져오는 중 오류가 발생했습니다.</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-4 pb-20">
      {/* 프로필 섹션 */}
      <div className="flex flex-col items-center py-6">
        <ProfileImage
          imageUrl={userInfo?.profile_img || undefined}
          onUpload={handleUpload}
          onDelete={handleDelete}
        />

        {/* 닉네임 */}
        <div className="flex items-center gap-1 mt-4">
          <span className="text-lg font-semibold">{userInfo?.nickname}</span>
          <button onClick={openModal}>
            <PencilLine color="gray" size={16} />
          </button>
          <NicknameEditModal isOpen={isModalOpen} onClose={closeModal} />
        </div>

        {/* 이메일 */}
        <span className="text-sm text-gray-500">{userInfo?.email}</span>
      </div>

      {/* 작성글/편지 정보 */}
      <div className="flex justify-center items-center rounded-2xl bg-gray-50 py-4 mb-6">
        <div className="flex-1 text-center">
          <Link href="/notebox">
            <p className="text-lg font-semibold">
              {/* 걱정 갯수 넣기 */}
              {userWorries?.length || 0}개
            </p>
            <p className="text-xs text-gray-500">작성한 걱정</p>
          </Link>
        </div>
        <div className="w-px h-10 bg-gray-200" />
        <div className="flex-1 text-center">
          <Link href="/letter">
            <p className="text-lg font-semibold">{letters?.length || 0}개</p>
            <p className="text-xs text-gray-500">미래 편지</p>
          </Link>
        </div>
      </div>
      <div className="border-t border-b pb-16 pt-4 text-sm text-gray-700 space-y-4">
        {[
          ['공지사항', '/mypage/notice'],
          ['이용약관', '/mypage/terms'],
          ['챗봇 문의', '/mypage/chat'],
          ['버전', '/mypage/version']
        ].map(([label, link], idx) => (
          <Link
            key={idx}
            href={link}
            className="flex justify-between items-center"
          >
            <span>{label}</span>
            <ChevronRight size={16} color="gray" />
          </Link>
        ))}
      </div>
      <div className='flex flex-row justify-center gap-12 mt-4 text-gray-500'>
        <LogOutButton/>
        <p>회원탈퇴</p>
      </div>
    </div>
  );
};

export default MyPage;

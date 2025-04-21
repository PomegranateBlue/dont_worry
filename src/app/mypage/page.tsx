'use client';

import LogOutButton from '@/components/loginComponents/LogOutButton';
import NicknameEditModal from '@/components/mypage/NicknameEditModal';
import ProfileImage from '@/components/mypage/ProfileImage';
import { useUserWorries } from '@/hooks/noteboxHooks/useUserWorries';
import { useUserInfo } from '@/hooks/userHooks/useUserInfo';
import { useUserLetters } from '@/hooks/letterHooks/useUserLetters';
import { useUpdateUserInfo } from '@/hooks/mypageHooks/useProfileUpdate';
import { useUserStore } from '@/store/auth/store';
import { useQueryClient } from '@tanstack/react-query';
import { ChevronRight, Pencil } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { uploadProfileImage } from '../utils/supabase/db';
import DeleteAccountButton from '@/components/mypage/DeleteAccountButton';
import Text from '@/components/common/Text';

const MyPage = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUserStore();
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
      queryClient.invalidateQueries({ queryKey: ['userinfo', user] });
      return url;
    } catch (err) {
      console.error('이미지 업로드 실패:', err);
      alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
      throw err;
    }
  };

  const handleDelete = async () => {
    try {
      await updateUserInfo({ profile_img: null });
      queryClient.invalidateQueries({ queryKey: ['userinfo', user] });
      return true;
    } catch (err) {
      console.error('이미지 삭제 실패:', err);
      alert('이미지 삭제에 실패했습니다. 다시 시도해주세요.');
      throw err;
    }
  };

  const isLoading = userDataLoading || lettersLoading || userWorriesLoading;
  console.log('page.tsx userInfo$$', userInfo);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-4 pb-20 xl:px-[350px] xl:pt-12">
      {/* 프로필 섹션 */}
      <Text variant="title1" className="text-center py-4 xl:hidden">
        마이페이지
      </Text>
      <div className="flex flex-col items-center py-3 xl:flex-row xl:items-center xl:gap-6 xl:justify-center">
        <ProfileImage
          imageUrl={userInfo?.profile_img || undefined}
          onUpload={handleUpload}
          onDelete={handleDelete}
        />

        {/* 닉네임 & 이메일 영역 */}
        <div className="mt-4 mb-2 text-center xl:mt-0 xl:text-left">
          <div className="flex items-center justify-center gap-1 xl:justify-start">
            <Text as="span" variant="title1" color="label-normal">
              {userInfo?.nickname}
            </Text>
            <button onClick={openModal}>
              <Pencil color="gray" size={16} />
            </button>
            <NicknameEditModal isOpen={isModalOpen} onClose={closeModal} />
          </div>
          <Text variant="label1" color="label-alternative">
            {userInfo?.email}
          </Text>
        </div>
      </div>

      {/* 작성글/편지 정보 */}
      <div className="flex justify-center items-center rounded-md bg-backgroundSet-card py-4 mb-6">
        <div className="flex-1 text-center">
          <Link href="/notebox">
            <Text variant="title2">
              {/* 걱정 갯수 넣기 */}
              {userWorries?.length || 0}개
            </Text>
            <Text variant="body3" color="label-alternative">
              작성한 걱정
            </Text>
          </Link>
        </div>
        <div className="w-px h-10 bg-line-normal" />
        <div className="flex-1 text-center">
          <Link href="/letter">
            <Text variant="title2">{letters?.length || 0}개</Text>
            <Text variant="body3" className="text-label-alternative">
              미래 편지
            </Text>
          </Link>
        </div>
      </div>
      <div className="border-t-8 border-b pb-6 pt-10 text-sm text-gray-700 space-y-5 w-full">
        <Text variant="body2" className="text-label-alternative">
          고객지원
        </Text>
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
            <Text variant="title2">{label}</Text>
            <ChevronRight size={18} color="gray" />
          </Link>
        ))}
      </div>
      <div className="flex flex-row justify-center gap-12 mt-5 ">
        <LogOutButton />
        <DeleteAccountButton />
      </div>
    </div>
  );
};

export default MyPage;

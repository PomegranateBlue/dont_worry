'use client';

import Text from '@/components/common/Text';
import LogOutButton from '@/components/loginComponents/LogOutButton';
import DeleteAccountButton from '@/components/mypage/DeleteAccountButton';
import NicknameEditModal from '@/components/mypage/NicknameEditModal';
import ProfileImage from '@/components/mypage/ProfileImage';
import { PATHS } from '@/constants/common/paths';
import { MypageError } from '@/constants/error/mypageError';
import { useUserLetters } from '@/hooks/letterboxHooks/useUserLetters';
import { useUpdateUserInfo } from '@/hooks/mypageHooks/useProfileUpdate';
import { useUserWorries } from '@/hooks/noteboxHooks/useUserWorries';
import { useUserInfo } from '@/hooks/userHooks/useUserInfo';
import { useUserStore } from '@/store/auth/store';
import { useQueryClient } from '@tanstack/react-query';
import { ChevronRight, Pencil } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { uploadProfileImage } from '../utils/supabase/db';

const MyPage = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUserStore();
  const { mutateAsync: updateUserInfo } = useUpdateUserInfo();
  const { data: letters, isLoading: lettersLoading } = useUserLetters(null);
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
      throw new MypageError('CANT_UPLOAD_PROFILEIMG');
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
      throw new MypageError('CANT_DELETE_PROFILEIMG');
    }
  };

  const isLoading = userDataLoading || lettersLoading || userWorriesLoading;

  if (isLoading) {
    return (
      <main className="flex justify-center items-center h-screen">
        Loading...
      </main>
    );
  }

  return (
    <main className="px-4 pb-20 xl:px-[316px] md:px-[60px]">
      <header>
        <Text
          variant="title1"
          variant2="heading2"
          color="label-normal"
          className="text-center py-4"
        >
          마이페이지
        </Text>
      </header>

      <section className="flex flex-col items-center py-3 xl:flex-row xl:items-center xl:gap-6 xl:justify-center">
        <ProfileImage
          imageUrl={userInfo?.profile_img || undefined}
          onUpload={handleUpload}
          onDelete={handleDelete}
        />

        <div className="mt-4 mb-2 text-center xl:mt-0 xl:text-left">
          <div className="flex items-center justify-center gap-2 xl:justify-start">
            <Text
              as="h2"
              variant="title1"
              variant2="heading3"
              color="label-normal"
            >
              {userInfo?.nickname}
            </Text>
            <button onClick={openModal} aria-label="닉네임 수정">
              <Pencil className="text-label-neutral" size={16} />
            </button>
            <NicknameEditModal isOpen={isModalOpen} onClose={closeModal} />
          </div>
          <Text variant="label1" variant2="body3" color="label-alternative">
            {userInfo?.email}
          </Text>
        </div>
      </section>

      <section
        className="flex justify-center items-center rounded-lg bg-backgroundSet-card py-4 mb-6"
        aria-label="사용자 활동 요약"
      >
        <article className="flex-1 text-center">
          <Link href={PATHS.NOTEBOX}>
            <Text variant="title2" variant2="heading3" color="label-normal">
              {userWorries?.length || 0}개
            </Text>
            <Text variant="body3" variant2="body2" color="label-alternative">
              작성한 걱정
            </Text>
          </Link>
        </article>
        <div className="w-px h-10 bg-line-normal" role="separator" />
        <article className="flex-1 text-center">
          <Link href={PATHS.LETTERBOX}>
            <Text variant="title2" variant2="heading3" color="label-normal">
              {letters?.length || 0}개
            </Text>
            <Text
              variant="body3"
              variant2="body2"
              className="text-label-alternative"
            >
              미래 편지
            </Text>
          </Link>
        </article>
      </section>

      <nav
        className="border-t-8 border-b pb-6 pt-10 space-y-5 w-full"
        aria-label="고객지원 메뉴"
      >
        <Text
          variant="body2"
          variant2="title2"
          className="text-label-alternative"
        >
          고객지원
        </Text>
        {[
          ['공지사항', '/mypage/notice'],
          ['이용약관', '/mypage/terms'],
          ['챗봇 문의', '/mypage/chat'],
          ['버전', '/mypage/version'],
          [`TEAM DON'T WORRY`, '/mypage/team']
        ].map(([label, link], idx) => (
          <Link
            key={idx}
            href={link}
            className="flex justify-between items-center"
          >
            <Text variant="title2" variant2="body1" color="label-neutral">
              {label}
            </Text>
            <ChevronRight size={18} color="gray" aria-hidden="true" />
          </Link>
        ))}
      </nav>

      <footer className="flex flex-row justify-center gap-12 mt-5">
        <LogOutButton
          textVariant="body3"
          textColor="label-alternative"
          className="underline"
        />
        <DeleteAccountButton />
      </footer>
    </main>
  );
};

export default MyPage;

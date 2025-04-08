'use client';

import NicknameEditModal from '@/components/mypage/NicknameEditModal';
import {
  useUserData,
  useUserInfo,
  useUserLetters,
  useUserWorries
} from '@/hooks/useMyPageQueries';
import { useUserStore } from '@/store/store';
import { PencilLine } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const MyPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setUser } = useUserStore();
  const { data: letters, isLoading: lettersLoading } = useUserLetters();
  const { data: userInfo, isLoading: userDataLoading } = useUserInfo();
  const { data: userWorries, isLoading: userWorriesLoading } = useUserWorries();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
  console.log('page.tsx userData$$', userInfo);

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
        {userInfo?.profile_img && (
          <div className="relative w-28 h-28 rounded-full overflow-hidden">
            <Image
              src={userInfo.profile_img}
              alt="프로필 이미지"
              fill
              className="object-cover"
              sizes="112px"
            />
          </div>
        )}
        {/* 프로필 이미지 */}
        <div className="relative w-28 h-28 rounded-full bg-gray-200 border overflow-hidden">
          {/* 수정 아이콘 */}
          <div className="absolute bottom-0 right-0 bg-black w-8 h-8 rounded-full flex items-center justify-center">
            <PencilLine color="gray" size={16} />
          </div>
        </div>

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
          <p className="text-lg font-semibold">
            {/* 걱정 갯수 넣기 */}
            {userWorries?.length || 0}개
          </p>
          <p className="text-xs text-gray-500">작성한 걱정</p>
        </div>
        <div className="w-px h-10 bg-gray-200" />
        <div className="flex-1 text-center">
          <Link href="/letter">
            <p className="text-lg font-semibold">{letters?.length || 0}개</p>
            <p className="text-xs text-gray-500">미래 편지</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyPage;

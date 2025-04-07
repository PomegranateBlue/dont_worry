'use client';

import {
  useUserData,
  useUserInfo,
  useUserLetters
} from '@/hooks/useMyPageQueries';
import { useUserStore } from '@/store/store';
import { useEffect } from 'react';

const MyPage = () => {
  const { setUser } = useUserStore();

  const {
    data: userid,
    isPending: isUserPending,
    isError: isUserError
  } = useUserData(); // 작동함

  // userid가 로드되면 스토어에 저장
  useEffect(() => {
    if (userid) {
      setUser(userid);
    }
  }, [userid, setUser]);

  const { data: letters, isLoading: lettersLoading } = useUserLetters();
  const { data: userData, isLoading: userDataLoading } = useUserInfo(); // 작동 함 Rls 문제

  const isLoading = userDataLoading || lettersLoading || isUserPending;
  console.log('page.tsx userData$$', userData);

  if (isUserError) {
    return <div>사용자 정보를 가져오는 중 오류가 발생했습니다.</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log('userid:', userid);

  return (
    <div>
      <h1>마이페이지</h1>
      <p>나야 유저{userid}</p>
      {userData && (
        <div>
          <p>이메일: {userData.email}</p>
          <p>닉네임: {userData.nickname}</p>
        </div>
      )}
    </div>
  );
};

export default MyPage;

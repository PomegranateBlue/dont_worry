'use client';

// import { useAuth } from '@/hooks/useAuth';
import {
  useUserData,
  useUserInfo,
  useUserLetters
} from '@/hooks/useMyPageQueries';

const MyPage = () => {
  // const { user, loading: authLoading } = useAuth();
  const {
    data: userid,
    isPending: isUserPending,
    isError: isUserError
  } = useUserData();
  const { data: letters, isLoading: lettersLoading } = useUserLetters();
  const { data: userData, isLoading: userDataLoading } = useUserInfo();

  const isLoading = userDataLoading || lettersLoading || isUserPending;

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log('userid:', userid);

  return (
    <div>
      <h1>마이페이지</h1>
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

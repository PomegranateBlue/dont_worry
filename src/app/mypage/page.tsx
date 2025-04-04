import { useUserInfo, useUserLetters } from '@/hooks/useMyPageQueries';

const MyPage = () => {
  const { data: letters, isLoading: lettersLoading } = useUserLetters();
  const { data, isLoading } = useUserInfo();

  if (lettersLoading) {
    return <div>Loading...</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>MyPage</div>;
};

export default MyPage;

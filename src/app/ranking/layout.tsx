import FilterMenu from '@/components/ranking/FilterMenu';
import RankingHeader from '@/components/ranking/RankingHeader';

const RankingLayout = ({
  children
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <RankingHeader />
      <FilterMenu />
      {children}
    </>
  );
};

export default RankingLayout;

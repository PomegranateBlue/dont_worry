import FilterMenu from '@/components/ranking/FilterMenu';
import WeekNavigator from '@/components/ranking/WeekNavigator';

const RankingLayout = ({
  children
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <WeekNavigator />
      <FilterMenu />
      {children}
    </>
  );
};

export default RankingLayout;

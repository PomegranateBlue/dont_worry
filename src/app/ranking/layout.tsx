import FilterMenu from '@/components/ranking/FilterMenu';
import WeekNavigator from '@/components/ranking/WeekNavigator';
import { CHART_PAGE_TITLE } from '@/constants/ranking/Line';

const RankingLayout = ({
  children
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <h1>{CHART_PAGE_TITLE}</h1>
      <WeekNavigator />
      <FilterMenu />
      {children}
    </>
  );
};

export default RankingLayout;

import FilterMenu from '@/components/ranking/FilterMenu';
import MWNavigator from '@/components/ranking/FusionComp/MWNavigator';
import MWreportCard from '@/components/ranking/FusionComp/MWreportCard';
import MWFilter from '@/components/ranking/MWFilter';

import { CHART_PAGE_TITLE } from '@/constants/ranking/Line';

const RankingLayout = ({
  children
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="h-100">
      <h1>{CHART_PAGE_TITLE}</h1>
      <MWFilter />
      <MWNavigator />
      <FilterMenu />
      <main className="">{children}</main>
      <MWreportCard />
    </div>
  );
};

export default RankingLayout;

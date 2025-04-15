// import MWNavigator from '@/components/ranking/FusionComp/MWNavigator';
// import MWreportCard from '@/components/ranking/FusionComp/MWreportCard';
// import TimeFilterGroup from '@/components/ranking/FusionComp/TimeFilterGroup';
// import MWFilter from '@/components/ranking/MWFilter';

import { CHART_PAGE_TITLE } from '@/constants/ranking/Line';

const RankingLayout = ({
  children
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="h-100">
      <h1 className="text-center text-2xl text-label-normal font-bold  border-gray-200 pb-4 pt-6">
        {CHART_PAGE_TITLE}
      </h1>
      {/* <MWFilter /> */}
      {/*todo: 삭제 예정 */}
      {/* <MWNavigator /> */}
      {/*todo: 삭제 예정 및 드롭다운 리스트 형식으로 변경*/}
      {/* <TimeFilterGroup /> */}

      {children}
    </div>
  );
};

export default RankingLayout;

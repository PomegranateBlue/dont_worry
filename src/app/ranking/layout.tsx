import { CHART_PAGE_TITLE } from '@/constants/ranking/Line';

const RankingLayout = ({
  children
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="h-100">
      <h1 className="text-center text-2xl text-label-normal font-bold  border-gray-200 pb-4 pt-6">
        {CHART_PAGE_TITLE}
      </h1>
      {children}
    </div>
  );
};

export default RankingLayout;

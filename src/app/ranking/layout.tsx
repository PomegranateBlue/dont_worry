import Text from '@/components/common/Text';
import TimeFilterGroup from '@/components/ranking/FusionComp/TimeFilterGroup';
import { CHART_PAGE_TITLE } from '@/constants/ranking/Line';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DONT WORRY | 걱정 통계 리포트',
  description:
    '당신의 고민과 감정을 바탕으로 분석된 통계 리포트를 확인하세요. 어떤 고민이 가장 많았을까요?',
  openGraph: {
    title: 'DONT WORRY 통계 리포트',
    description:
      '이번 달, 당신의 감정과 고민은 어떤 주제로 가장 많았을까요? 시각화된 차트로 쉽게 확인하세요!',
    url: 'https://dontworry.io.kr/ranking',
    images: [
      {
        url: 'https://dontworry.io.kr/images/Thumbnail2.png',
        width: 1200,
        height: 630,
        alt: 'DONT WORRY 감정·주제 통계'
      }
    ],
    type: 'website'
  }
};

const RankingLayout = ({
  children
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="w-full flex justify-center">
      <div className="xl:bg-backgroundSet-normal">
        {/*마지막 3개의 속성을 루트에서 적용시켜야함*/}
        <div className="pr-[6px] pl-[6px] h-14 flex items-center justify-center sticky top-0 z-10 bg-backgroundSet-normal">
          <Text
            as="h1"
            variant="title1"
            color="label-normal"
            className="text-center border-gray-200 w-full"
          >
            {CHART_PAGE_TITLE}
          </Text>
        </div>
        <div className="py-5 xl:py-6 xl:flex xl:gap-4 xl:h-16 xl:justify-center xl:items-center bg-backgroundSet-card">
          <TimeFilterGroup />
        </div>
        {children}
      </div>
    </div>
  );
};

export default RankingLayout;

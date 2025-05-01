'use client';

import React, { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import {
  TOPIC_FILTER_DESCRIPTION,
  TOPIC_FILTER_DESCRIPTION2
} from '@/constants/ranking/line';

import Text from '../common/Text';
import {
  CHART_LABEL,
  topicBackgroundColor,
  topicBorderColor
} from '@/constants/ranking/chartOptions';

// 컴포넌트 외부로 ChartJS 등록 옮기기
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface ChartProps {
  topTopics: { name: string; count: number }[];
}

// areEqual 함수 구현으로 불필요한 리렌더링 방지
function areEqual(prevProps: ChartProps, nextProps: ChartProps) {
  if (prevProps.topTopics.length !== nextProps.topTopics.length) {
    return false;
  }

  return prevProps.topTopics.every(
    (topic, index) =>
      topic.name === nextProps.topTopics[index]?.name &&
      topic.count === nextProps.topTopics[index]?.count
  );
}

const TopicChart = React.memo(({ topTopics }: ChartProps) => {
  // 차트 데이터와 총합 계산을 메모이제이션 - 불필요한 반환값 제거
  const { total, topicChartData } = useMemo(() => {
    const labels = topTopics.map((topic) => topic.name);
    const data = topTopics.map((topic) => topic.count);
    const sum = data.reduce((acc, cur) => acc + cur, 0);

    const chartData: ChartData<'doughnut'> = {
      labels,
      datasets: [
        {
          label: CHART_LABEL,
          data,
          backgroundColor: topicBackgroundColor,
          borderColor: topicBorderColor,
          borderWidth: 2
        }
      ]
    };

    return {
      total: sum,
      topicChartData: chartData
    };
  }, [topTopics]);

  // 차트 옵션 메모이제이션
  const options: ChartOptions<'doughnut'> = useMemo(() => {
    return {
      responsive: true,
      maintainAspectRatio: false, // 명시적으로 설정하여 레이아웃 변경 시 성능 향상
      plugins: {
        legend: {
          position: 'bottom',
          display: false
        },
        datalabels: {
          color: '#171719',
          font: {
            weight: 'bold',
            size: 10
          },
          formatter: (value, context) => {
            const label = context.chart.data.labels?.[context.dataIndex];
            const percent = ((value / total) * 100).toFixed(0);
            return `${label}\n (${percent}%)`;
          },
          align: 'center',
          textAlign: 'center',
          clip: false
        }
      }
    };
  }, [total]);

  return (
    <>
      <div className="flex w-[258px] flex-col items-center gap-2">
        <Text
          as="h2"
          variant="heading3"
          variant2="heading1"
          color="primary4"
          className="text-center leading-[135%]"
        >
          {TOPIC_FILTER_DESCRIPTION}
        </Text>
        <Text
          variant="body3"
          color="label-alternative"
          className="text-center leading-[150%] w-[260px] h-[21px]"
        >
          {TOPIC_FILTER_DESCRIPTION2}
        </Text>
      </div>

      <div className="w-[217.8px] h-[220px] xl:w-[255px] xl:h-[255px] flex justify-center items-center xl:gap-3 md:w-[217.8px]">
        <Doughnut options={options} data={topicChartData} />
      </div>
    </>
  );
}, areEqual);

// 컴포넌트 디스플레이 이름 설정
TopicChart.displayName = 'TopicChart';

export default TopicChart;

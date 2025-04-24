'use client';

import React from 'react';
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
} from '@/constants/ranking/Line';
import {
  CHART_LABEL,
  topicBackgroundColor,
  topicBorderColor
} from '@/constants/ranking/ChartOptions';
import Text from '../common/Text';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface ChartProps {
  topTopics: { name: string; count: number }[];
}

const TopicChart = ({ topTopics }: ChartProps) => {
  const topicLabels = topTopics.map((topic) => topic.name);
  const topicData = topTopics.map((topic) => topic.count);
  const total = topicData.reduce((acc, cur) => acc + cur, 0); // 총합

  const topicChartData: ChartData<'doughnut'> = {
    labels: topicLabels,
    datasets: [
      {
        label: CHART_LABEL,
        data: topicData,
        backgroundColor: topicBackgroundColor,
        borderColor: topicBorderColor,
        borderWidth: 2
      }
    ]
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
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
};

export default TopicChart;

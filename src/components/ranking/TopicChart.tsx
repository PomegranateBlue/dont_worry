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

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface ChartProps {
  topTopics: { name: string; count: number }[];
}

const TopicChart: React.FC<ChartProps> = ({ topTopics }) => {
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
          size: 12
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
      <div className="flex w-[258px] flex-col items-center gap-[12px]">
        <h2 className="text-primary-4 text-center text-[22px] font-medium leading-[135%]">
          {TOPIC_FILTER_DESCRIPTION}
        </h2>
        <p className="text-label-normal text-center text-[14px] font-medium leading-[150%]">
          {TOPIC_FILTER_DESCRIPTION2}
        </p>
      </div>

      <div className="w-[217.8px] h-[198px] sm:w-[320px] sm:h-[320px]">
        <Doughnut options={options} data={topicChartData} />
      </div>
    </>
  );
};

export default TopicChart;

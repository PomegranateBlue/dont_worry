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
import { backgroundColor, borderColor } from '@/constants/ranking/ChartOptions';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ChartProps {
  topTopics: { name: string; count: number }[];
}

const TopicChart: React.FC<ChartProps> = ({ topTopics }) => {
  const topicLabels = topTopics.map((topic) => topic.name);
  const topicData = topTopics.map((topic) => topic.count);

  // 주제별 차트 데이터
  const topicChartData: ChartData<'doughnut'> = {
    labels: topicLabels,
    datasets: [
      {
        label: 'Top Topics',
        data: topicData,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 2
      }
    ]
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  return (
    <div>
      <h1>주제별 분석 차트</h1>
      <div style={{ width: 400, height: 400 }}>
        <Doughnut options={options} data={topicChartData} />
      </div>
    </div>
  );
};

export default TopicChart;

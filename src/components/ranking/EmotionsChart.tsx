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

interface EmotionChartProps {
  topEmotions: { name: string; count: number }[];
}

const EmotionChart: React.FC<EmotionChartProps> = ({ topEmotions }) => {
  const emotionLabels = topEmotions.map((emotion) => emotion.name);
  const emotionData = topEmotions.map((emotion) => emotion.count);

  // 감정별 차트 데이터
  const emotionChartData: ChartData<'doughnut'> = {
    labels: emotionLabels,
    datasets: [
      {
        label: 'Top Emotions',
        data: emotionData,
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
      <h1>감정별 분석 차트</h1>
      <div style={{ width: 400, height: 400 }}>
        <Doughnut options={options} data={emotionChartData} />
      </div>
    </div>
  );
};

export default EmotionChart;

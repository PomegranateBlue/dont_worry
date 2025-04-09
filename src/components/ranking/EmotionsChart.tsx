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
import {
  EMOTION_FILTER_DESCRIPTION,
  EMOTION_FILTER_DESCRIPTION2
} from '@/constants/ranking/Line';

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
        position: 'bottom',
        display: false
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto my-6 p-6 bg-white rounded-2xl flex flex-col items-center">
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold text-gray-900">
          {EMOTION_FILTER_DESCRIPTION}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {EMOTION_FILTER_DESCRIPTION2}
        </p>
      </div>
      <div className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px]">
        <Doughnut options={options} data={emotionChartData} />
      </div>
    </div>
  );
};

export default EmotionChart;

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
  EMOTION_FILTER_DESCRIPTION,
  EMOTION_FILTER_DESCRIPTION2
} from '@/constants/ranking/Line';

import Text from '../common/Text';
import {
  CHART_LABEL,
  emotionBackgroundColor,
  emotionBorderColor
} from '@/constants/ranking/ChartOptions';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface EmotionChartProps {
  topEmotions: { name: string; count: number }[];
}

const EmotionChart = ({ topEmotions }: EmotionChartProps) => {
  const emotionLabels = topEmotions.map((emotion) => emotion.name);
  const emotionData = topEmotions.map((emotion) => emotion.count);
  const total = emotionData.reduce((acc, cur) => acc + cur, 0);

  const emotionChartData: ChartData<'doughnut'> = {
    labels: emotionLabels,
    datasets: [
      {
        label: CHART_LABEL,
        data: emotionData,
        backgroundColor: emotionBackgroundColor,
        borderColor: emotionBorderColor,
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
          return `${label}\n(${percent}%)`;
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
          {EMOTION_FILTER_DESCRIPTION}
        </Text>
        <Text
          variant="body3"
          color="label-alternative"
          className="text-center leading-[150%] w-[260px] h-[21px]"
        >
          {EMOTION_FILTER_DESCRIPTION2}
        </Text>
      </div>
      <div className="w-[217.8px] h-[220px] xl:w-[255px] xl:h-[255px] flex justify-center items-center xl:gap-3">
        <Doughnut options={options} data={emotionChartData} />
      </div>
    </>
  );
};

export default EmotionChart;

'use client';

import React from 'react';
import { Doughnut } from 'react-chartjs-2'; //원하는 차트 형태를 임포트
import {
  Chart as ChartJS, //chart.js의 핵심 객체(필수)
  ChartOptions, //옵션 타입
  ChartData, //데이터 타입
  ArcElement, //도넛 차트에서 각 조각ㅇ르 그리는 요소
  Tooltip,//마우스를 올렸을때 나오는 메타데이터?임
  Legend//각 조각들에 대한 범례라고함(궁금할경우 담당자에게 문의)
} from 'chart.js'; //chart.js에서 차트를 만들때 필요한 모둘을 가져옴

// 도넛 그래프에 필요한 요소 등록(필요 요소가 부족하면 그래프가 그려지지 않을 수 있음)
ChartJS.register(ArcElement, Tooltip, Legend);

const options: ChartOptions<'doughnut'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom'
    }
  }
};

const labels = ['React', 'Angular', 'Vue']; //실제 구현시 여기에 자주 언급된 카테괼 top10이 들어가게됨

const data: ChartData<'doughnut'> = {
  //차트에 들어가는 각각의 비율을 정의하는 부분
  labels,
  datasets: [
    {
      label: 'Usage Percentage',
      data: [60, 25, 15], // 도넛 차트는 비율(%) 형태의 데이터가 적합
      backgroundColor: ['#0CD3FF', '#a6120d', '#FFCA29'],
      borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF'],
      borderWidth: 2
    }
  ]
};

const RankingPage = () => {
  return (
    <div>
      <h1>Doughnut Chart</h1>
      <div style={{ width: 400, height: 400 }}>
        <Doughnut options={options} data={data} />
      </div>
    </div>
  );
};

export default RankingPage;

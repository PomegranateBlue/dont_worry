import { ScriptableContext } from 'chart.js';

export const topicBackgroundColor = [
  '#F3F0FF',
  '#E8E2FF',
  '#D1C9F2',
  '#C1B8E5',
  '#ADA2D7',
  '#A092D7'
];

export const topicBorderColor = () => {
  return '#fff';
};

export const emotionBackgroundColor = (
  context: ScriptableContext<'doughnut'>
) => {
  const label = context.chart.data.labels?.[context.dataIndex];
  if (label === '혼란') return '#CAADC6';
  if (label === '무기력') return '#E7DDF2';
  if (label === '슬픔') return '#CCD5DD';
  if (label === '우울') return '#ACBCE5';
  if (label === '외로움') return '#81A2B8';
  if (label === '불안') return '#AFC1B8';
  if (label === '후회') return '#D4DFCD';
  if (label === '짜증') return '#EAF9E0';
  if (label === '분노') return '#E3BFA2';
  if (label === '불쾌') return '#F0ECAE';
  if (label === '압박') return '#EBB6C8';
};

export const emotionBorderColor = () => {
  return '#fff';
};

export const CHART_LABEL = '고민 수';

import { TopSixItem } from '@/components/ranking/Solution';

//상위 3개 항목을 정렬
export const stringifyTopSix = (list: TopSixItem[]): string => {
  return list
    .map((item) => item.name)
    .sort()
    .join(',');
};

//순서에 상관없이 항목이 겹치는 여부만 확인하기 위한 정렬 함수
export const parseAndSort = (str: string): string => {
  return str
    .split(',')
    .map((s) => s.trim())
    .sort()
    .join(',');
};

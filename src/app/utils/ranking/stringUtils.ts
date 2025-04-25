import { TopThreeItem } from '@/components/ranking/Solution';

export const stringifyTopThree = (list: TopThreeItem[]): string => {
  return list
    .map((item) => item.name)
    .sort()
    .join(',');
};

export const parseAndSort = (str: string): string => {
  return str
    .split(',')
    .map((s) => s.trim())
    .sort()
    .join(',');
};

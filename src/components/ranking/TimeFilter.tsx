import { ALL } from '@/constants/ranking/line';
import {
  FIFTH_WEEK,
  FIRST_WEEK,
  FOURTH_WEEK,
  SECOND_WEEK,
  SIXTH_WEEK,
  THIRD_WEEK
} from '@/constants/ranking/weekConstants';

import { ChevronDown } from 'lucide-react';

type Props = {
  type: 'year' | 'month' | 'week';
  options: (number | string)[];
  onChange: (type: 'year' | 'month' | 'week', value: number | string) => void;
  selected: number | string;
};

const getLabel = (type: 'year' | 'month' | 'week', value: number | string) => {
  if (type === 'month' && typeof value === 'number') {
    return `${value}월`;
  }
  if (type === 'week') {
    if (value === ALL) return ALL;
    const weekLabels = [
      FIRST_WEEK,
      SECOND_WEEK,
      THIRD_WEEK,
      FOURTH_WEEK,
      FIFTH_WEEK,
      SIXTH_WEEK
    ];
    return weekLabels[Number(value) - 1] || `${value}주차`;
  }
  return value;
};

const TimeFilter = ({ type, options, onChange, selected }: Props) => {
  return (
    <div className="relative inline-block">
      <select
        value={selected}
        onChange={(e) =>
          onChange(
            type,
            isNaN(+e.target.value) ? e.target.value : +e.target.value
          )
        }
        className="appearance-none h-[32px] px-[16px] py-[6px] border border-line-normal rounded-[16px] text-label-neutral focus:outline-none focus:ring-2 focus:ring-primary-3 pr-[32px] text-center"
      >
        {options.map((opt) => (
          <option key={opt} value={opt} className="text-center">
            {getLabel(type, opt)}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-[12px] pointer-events-none">
        <ChevronDown size={16} className="text-gray-400" />
      </div>
    </div>
  );
};

export default TimeFilter;

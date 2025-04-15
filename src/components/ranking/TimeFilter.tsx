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
    if (value === '전체') return '전체';
    const weekLabels = [
      '첫째주',
      '둘째주',
      '셋째주',
      '넷째주',
      '다섯째주',
      '여섯째주'
    ];
    return weekLabels[Number(value) - 1] || `${value}주차`;
  }
  return value;
};

const TimeFilter = ({ type, options, onChange, selected }: Props) => {
  return (
    <select
      value={selected}
      onChange={(e) =>
        onChange(
          type,
          isNaN(+e.target.value) ? e.target.value : +e.target.value
        )
      }
      className="flex justify-center items-center h-[32px] px-[12px] py-[6px] gap-[4px] border border-line-noraml rounded-[16px] text-center text-label-neutral focus:outline-none focus:ring-2 focus:ring-purple-400"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {getLabel(type, opt)}
        </option>
      ))}
    </select>
  );
};

export default TimeFilter;

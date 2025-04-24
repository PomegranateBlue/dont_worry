'use client';

import { ChevronDown, X } from 'lucide-react';
import Text from '../common/Text';

interface FilterBarProps {
  onClickFilter: (label: string) => void;
  selectedOption: string | null;
  selectedTopic: string;
  selectedEmotions: string[];
  selectedSort: string;
  onRemoveFilter: (type: '주제별' | '감정별' | '정렬순', value: string) => void;
}

const FilterBar = ({
  onClickFilter,
  selectedOption,
  selectedTopic,
  selectedEmotions,
  selectedSort,
  onRemoveFilter
}: FilterBarProps) => {
  const handleFilterOption = (label: string) => {
    onClickFilter(label);
  };

  const getFilterLabel = (type: '주제별' | '감정별') => {
    if (type === '주제별' && selectedTopic.length > 0) {
      const [first, ...rest] = selectedTopic;
      return rest.length > 0 ? `${first} 외 ${rest.length}` : first;
    }

    if (type === '감정별' && selectedEmotions.length > 0) {
      const [first, ...rest] = selectedEmotions;
      return rest.length > 0 ? `${first} 외 ${rest.length}` : first;
    }

    return null;
  };

  return (
    <header className="w-full flex items-center justify-between p-5">
      <div className="flex-1 whitespace-nowrap scrollbar-hide overflow-x-auto flex pr-4 gap-2">
        {/* 정렬순 탭 */}
        <button
          className={`flex items-center px-3 py-[6px] h-[32px] rounded-[16px] border  xl:rounded-[20px] xl:px-[16px]${
            selectedOption === '정렬순'
              ? 'border-primary-4 bg-primary-1'
              : 'border-line-normal'
          }`}
          onClick={() => handleFilterOption('정렬순')}
        >
          <Text color="label-neutral" variant="body3" as="p">
            {selectedSort}
          </Text>
          <ChevronDown className="w-4 h-4 ml-1" />
        </button>

        {/* 주제별 or 뱃지 */}
        {getFilterLabel('주제별') ? (
          <FilterBadge
            label={getFilterLabel('주제별')!}
            onRemove={() => onRemoveFilter('주제별', selectedTopic)}
            onClick={() => handleFilterOption('주제별')}
          />
        ) : (
          <FilterTab
            label="주제별"
            selected={selectedOption === '주제별'}
            onClick={() => handleFilterOption('주제별')}
          />
        )}

        {/* 감정별 or 뱃지 */}
        {getFilterLabel('감정별') ? (
          <FilterBadge
            label={getFilterLabel('감정별')!}
            onRemove={() =>
              selectedEmotions.forEach((emotion) =>
                onRemoveFilter('감정별', emotion)
              )
            }
            onClick={() => handleFilterOption('감정별')}
          />
        ) : (
          <FilterTab
            label="감정별"
            selected={selectedOption === '감정별'}
            onClick={() => handleFilterOption('감정별')}
          />
        )}
      </div>
    </header>
  );
};

export default FilterBar;

//기본 탭
const FilterTab = ({
  label,
  selected,
  onClick
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) => (
  <button
    className={`flex items-center px-3 h-[32px] rounded-full border  ${
      selected ? 'border-primary-4 bg-primary-1' : 'border-line-normal'
    }`}
    onClick={onClick}
  >
    <Text color="label-neutral" variant="body3" as="p">
      {label}
    </Text>
    <ChevronDown className="w-4 h-4 ml-1" />
  </button>
);

//  카테고리 선택 시의 UI 렌더링
const FilterBadge = ({
  label,
  onRemove,
  onClick
}: {
  label: string;
  onRemove: () => void;
  onClick: () => void;
}) => (
  <div
    className="flex items-center bg-[#7B61FF] text-white font-medium px-3 h-8 rounded-full whitespace-nowrap text-sm cursor-pointer"
    onClick={onClick}
  >
    {label}
    <button
      onClick={(e) => {
        e.stopPropagation();
        onRemove();
      }}
      className="ml-2 w-5 h-5 flex items-center justify-center bg-white rounded-full"
    >
      <X className="w-[10px] h-[10px] text-[#7B61FF]" strokeWidth={2} />
    </button>
  </div>
);

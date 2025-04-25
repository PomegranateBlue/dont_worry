'use client';

import { ChevronDown, X } from 'lucide-react';
import Text from '../common/Text';
import { FilterProps } from '@/app/notebox/page';



interface FilterBarProps {
  onClickFilter: (label: FilterProps) => void;
  selectedOption: FilterProps | null;
  selectedTopics: string[];
  selectedEmotions: string[];
  selectedSort: string;
  onRemoveFilter: (type: FilterProps, value: string) => void;
}

const FilterBar = ({
  onClickFilter,
  selectedOption,
  selectedTopics,
  selectedEmotions,
  selectedSort,
  onRemoveFilter
}: FilterBarProps) => {
  const handleFilterOption = (label: FilterProps) => {
    onClickFilter(label);
  };

  const getFilterLabel = (type: FilterProps.TOPIC | FilterProps.EMOTION) => {
    if (type === FilterProps.TOPIC && selectedTopics.length > 0) {
      const [first, ...rest] = selectedTopics;
      return rest.length > 0 ? `${first} 외 ${rest.length}` : first;
    }

    if (type === FilterProps.EMOTION && selectedEmotions.length > 0) {
      const [first, ...rest] = selectedEmotions;
      return rest.length > 0 ? `${first} 외 ${rest.length}` : first;
    }

    return null;
  };

  return (
    <header className="w-full flex items-center justify-between p-5 xl:max-w-[648px]">
      <nav className="flex-1 whitespace-nowrap scrollbar-hide overflow-x-auto flex pr-4 gap-2">
        <button
          className={`flex items-center px-3 py-[6px]  xl:py-[12px] h-[32px] rounded-[16px] border  xl:rounded-[20px] xl:px-[16px] ${
            selectedOption === FilterProps.SORT
              ? 'border-primary-4 bg-primary-1'
              : 'border-line-normal'
          }`}
          onClick={() => handleFilterOption(FilterProps.SORT)}
        >
          <Text color="label-neutral" variant="body3" variant2="body1" as="p">
            {selectedSort}
          </Text>
          <ChevronDown className="w-4 h-4 ml-1" />
        </button>

        {getFilterLabel(FilterProps.TOPIC) ? (
          <div
            className="flex items-center bg-primary-4 text-white font-medium px-3 h-8 rounded-full whitespace-nowrap  cursor-pointer"
            onClick={() => handleFilterOption(FilterProps.TOPIC)}
          >
            <Text color="white" variant="body3" variant2="body1">
              {getFilterLabel(FilterProps.TOPIC)}
            </Text>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemoveFilter(FilterProps.TOPIC, selectedTopics[0]);
              }}
              className="ml-2 w-5 h-5 flex items-center justify-center bg-backgroundSet-normal rounded-full"
            >
              <X className="w-[10px] h-[10px] text-primary-4" strokeWidth={2} />
            </button>
          </div>
        ) : (
          <button
            className={`flex items-center px-3 h-[32px] rounded-full border  ${
              selectedOption === FilterProps.TOPIC
                ? 'border-primary-4 bg-primary-1'
                : 'border-line-normal'
            }`}
            onClick={() => handleFilterOption(FilterProps.TOPIC)}
          >
            <Text color="label-neutral" variant="body3" variant2="body1" as="p">
              {FilterProps.TOPIC}
            </Text>
            <ChevronDown className="w-4 h-4 ml-1" />
          </button>
        )}

        {getFilterLabel(FilterProps.EMOTION) ? (
          <div
            className="flex items-center bg-primary-4 text-white font-medium px-3 h-8 rounded-full whitespace-nowrap  cursor-pointer"
            onClick={() => handleFilterOption(FilterProps.EMOTION)}
          >
            <Text color="white" variant="body3" variant2="body1">
              {getFilterLabel(FilterProps.EMOTION)}
            </Text>
            <button
              onClick={(e) => {
                e.stopPropagation();
                selectedEmotions.forEach((emotion) =>
                  onRemoveFilter(FilterProps.EMOTION, emotion)
                );
              }}
              className="ml-2 w-5 h-5 flex items-center justify-center bg-backgroundSet-normal rounded-full"
            >
              <X className="w-[10px] h-[10px] text-primary-4" strokeWidth={2} />
            </button>
          </div>
        ) : (
          <button
            className={`flex items-center px-3 h-[32px] rounded-full border  ${
              selectedOption === FilterProps.EMOTION
                ? 'border-primary-4 bg-primary-1'
                : 'border-line-normal'
            }`}
            onClick={() => handleFilterOption(FilterProps.EMOTION)}
          >
            <Text color="label-neutral" variant="body3" variant2="body1" as="p">
              {FilterProps.EMOTION}
            </Text>
            <ChevronDown className="w-4 h-4 ml-1" />
          </button>
        )}
      </nav>
    </header>
  );
};

export default FilterBar;

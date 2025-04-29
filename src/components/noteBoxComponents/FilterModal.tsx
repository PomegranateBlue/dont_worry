import {
  TOPIC_CATEGORIES,
  EMOTION_CATEGORIES
} from '@/constants/openai/category';
import { useState, useEffect } from 'react';
import { RotateCw } from 'lucide-react';
import Text from '../common/Text';
import { FilterProps, SortProps } from '@/constants/filter/filterProps';

interface FilterModalProps {
  selectedOption: FilterProps | null;
  setSelectedOption: (option: FilterProps) => void;

  selectedSort: SortProps;
  setSelectedSort: React.Dispatch<React.SetStateAction<SortProps>>;

  selectedTopics: string[];
  setSelectedTopics: React.Dispatch<React.SetStateAction<string[]>>;

  selectedEmotions: string[];
  setSelectedEmotions: React.Dispatch<React.SetStateAction<string[]>>;

  onClose: () => void;
}

const sortTabs: FilterProps[] = [
  FilterProps.SORT,
  FilterProps.TOPIC,
  FilterProps.EMOTION
];

const sortOptions: SortProps[] = [SortProps.LATEST, SortProps.OLDEST];

const FilterModal = ({
  selectedOption,
  setSelectedOption,
  selectedSort,
  setSelectedSort,
  selectedTopics,
  setSelectedTopics,
  selectedEmotions,
  setSelectedEmotions,
  onClose
}: FilterModalProps) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  useEffect(() => {
    if (selectedOption === FilterProps.SORT) {
      setSelectedValues([selectedSort]);
    } else if (selectedOption === FilterProps.TOPIC) {
      setSelectedValues(selectedTopics);
    } else if (selectedOption === FilterProps.EMOTION) {
      setSelectedValues(selectedEmotions);
    } else {
      setSelectedValues([]);
    }
  }, [selectedOption, selectedSort, selectedTopics, selectedEmotions]);

  const handleToggle = (value: string) => {
    if (selectedOption === FilterProps.SORT) {
      setSelectedValues([value]);
    } else {
      setSelectedValues((prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value]
      );
    }
  };

  const getOptions = () => {
    switch (selectedOption) {
      case FilterProps.SORT:
        return sortOptions;
      case FilterProps.TOPIC:
        return TOPIC_CATEGORIES;
      case FilterProps.EMOTION:
        return EMOTION_CATEGORIES.map(({ label }) => label);
      default:
        return [];
    }
  };

  const handleApply = () => {
    if (selectedOption === FilterProps.SORT) {
      if (selectedValues[0] === SortProps.LATEST)
        setSelectedSort(SortProps.LATEST);
      else if (selectedValues[0] === SortProps.OLDEST)
        setSelectedSort(SortProps.OLDEST);
    } else if (selectedOption === FilterProps.TOPIC) {
      setSelectedTopics(selectedValues);
    } else if (selectedOption === FilterProps.EMOTION) {
      setSelectedEmotions(selectedValues);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-end">
      <section
        className="xl:max-w-[648px] bg-backgroundSet-normal w-full rounded-tl-[20px] rounded-tr-[20px] p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="w-full flex justify-center mb-4 cursor-pointer"
          onClick={onClose}
        >
          <div className="w-[36px] h-[5px] rounded-[2.5px] bg-label-assistive" />
        </div>

        <nav className="flex items-center justify-between w-full py-6">
          {sortTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedOption(tab)}
              className={`flex-1 text-center h-[48px] p-2 border-b-2 ${
                selectedOption === tab
                  ? 'text-primary-4 border-primary-4'
                  : 'text-primary-4 border-label-disable'
              }`}
            >
              <Text
                variant="title2"
                as="p"
                className={`transition-colors duration-200 ${
                  selectedOption === tab ? 'text-primary-4' : 'text-gray-400'
                }`}
              >
                {tab}
              </Text>
            </button>
          ))}
        </nav>

        <fieldset className="flex flex-wrap pb-6 h-[150px] overflow-y-auto gap-2">
          {getOptions().map((option) => {
            const isSelected = selectedValues.includes(option);
            return (
              <button
                key={option}
                onClick={() => handleToggle(option)}
                className={`whitespace-nowrap flex gap-2 justify-center items-center rounded-[16px] px-3 py-[6px] border h-[32px] ${
                  isSelected ? 'bg-primary-4' : 'bg-backgroundSet-normal'
                }`}
              >
                <Text
                  variant="body3"
                  color="label-neutral"
                  className={
                    isSelected
                      ? 'text-backgroundSet-normal'
                      : 'text-label-neutral'
                  }
                >
                  {option}
                </Text>
              </button>
            );
          })}
        </fieldset>

        <section className="flex gap-x-2 w-full justify-between">
          <button
            onClick={() => setSelectedValues([])}
            className="flex items-center px-5 py-3 bg-[#F4F4F5] bg-opacity-50 rounded-[8px]"
          >
            <RotateCw className="text-label-disable" />
            <Text color="label-alternative" variant="title2">
              초기화
            </Text>
          </button>

          <button
            onClick={handleApply}
            className={`flex flex-1 justify-center items-center px-5 py-4 rounded-[8px] h-12 ${
              selectedValues.length === 0 ? 'bg-label-disable' : 'bg-primary-4'
            }`}
          >
            <Text variant="title2" color="white">
              {selectedValues.length}개 결과보기
            </Text>
          </button>
        </section>
      </section>
    </div>
  );
};

export default FilterModal;

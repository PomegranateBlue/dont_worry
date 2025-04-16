'use client';

import {
  TOPIC_CATEGORIES,
  EMOTION_CATEGORIES
} from '@/constants/openai/category';
import { useState, useEffect } from 'react';
import { RotateCw } from 'lucide-react';
import Text from '../common/Text';
interface FilterModalProps {
  selectedOption: string | null;
  setSelectedOption: (option: string | null) => void;

  selectedSort: '최신순' | '과거순';
  setSelectedSort: React.Dispatch<React.SetStateAction<'최신순' | '과거순'>>;

  selectedTopics: string[];
  setSelectedTopics: React.Dispatch<React.SetStateAction<string[]>>;

  selectedEmotions: string[];
  setSelectedEmotions: React.Dispatch<React.SetStateAction<string[]>>;

  onClose: () => void;
}

const sortTabs = ['정렬순', '주제별', '감정별'];
const sortOptions = ['최신순', '오래된순', '가나다순'];

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
    if (selectedOption === '정렬순') {
      setSelectedValues([selectedSort === '최신순' ? '최신순' : '오래된순']);
    } else if (selectedOption === '주제별') {
      setSelectedValues(selectedTopics);
    } else if (selectedOption === '감정별') {
      setSelectedValues(selectedEmotions);
    } else {
      setSelectedValues([]);
    }
  }, [selectedOption]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleToggle = (value: string) => {
    if (selectedOption === '정렬순') {
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
      case '정렬순':
        return sortOptions;
      case '주제별':
        return TOPIC_CATEGORIES;
      case '감정별':
        return EMOTION_CATEGORIES.map(({ label }) => label);
      default:
        return [];
    }
  };

  const handleApply = () => {
    if (selectedOption === '정렬순') {
      if (selectedValues[0] === '최신순') setSelectedSort('최신순');
      else if (selectedValues[0] === '오래된순') setSelectedSort('과거순');
    } else if (selectedOption === '주제별') {
      setSelectedTopics(selectedValues);
    } else if (selectedOption === '감정별') {
      setSelectedEmotions(selectedValues);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-end">
      <div
        className="bg-backgroundSet-normal w-full   rounded-tl-[20px] rounded-tr-[20px] rounded-br-[0px] rounded-bl-[0px] p-5 "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between w-full py-6   ">
          {sortTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedOption(tab)}
              className={`flex-1 text-center  h-[48px] p-2 border-b-2 ${
                selectedOption === tab
                  ? 'text-primary-4  border-primary-4 '
                  : 'text-primary-4 border-label-disable'
              }`}
            >
              <Text
                variant="title2"
                as="p"
                className={`transition-colors duration-200 ${
                  selectedOption === tab ? 'text-primary-4  ' : 'text-gray-400 '
                }`}
              >
                {tab}
              </Text>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap pb-6 h-[150px] ">
          <div className=" overflow-y-auto flex flex-wrap gap-2">
            {getOptions().map((option) => {
              const isSelected = selectedValues.includes(option);
              return (
                <button
                  key={option}
                  onClick={() => handleToggle(option)}
                  className={`whitespace-nowrap flex  gap-2 justify-center items-center rounded-[16px] px-3 py-[6px] border h-[32px] ${
                    isSelected ? 'bg-primary-4  ' : 'bg-backgroundSet-normal'
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
          </div>
        </div>

        <div className="flex gap-x-2 w-full justify-between ">
          <button
            onClick={() => setSelectedValues([])}
            className="flex items-center w-auto justify-center   px-5 py-3 bg-[#F4F4F5] bg-opacity-50 rounded-[8px]  "
          >
            <RotateCw className="text-label-disable" />
            <Text color="label-alternative" variant="title2">
              초기화
            </Text>
          </button>

          <button
            onClick={handleApply}
            className={`flex flex-1 justify-center  items-center px-5 py-4 rounded-[8px] w-auto h-12 ${
              selectedValues.length === 0 ? 'bg-label-disable' : 'bg-primary-4'
            }`}
          >
            <Text variant="title2" color="white">
              {selectedValues.length}개 결과보기
            </Text>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;

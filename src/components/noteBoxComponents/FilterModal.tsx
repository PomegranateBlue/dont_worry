'use client';

import {
  TOPIC_CATEGORIES,
  EMOTION_CATEGORIES
} from '@/constants/openai/category';
import { useState, useEffect } from 'react';
import { RotateCw } from 'lucide-react';

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
        return EMOTION_CATEGORIES;
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
      <div className="bg-white w-full max-w-md rounded-t-2xl p-4 pb-6">
        <div className="flex justify-between mb-4 border-b-[1px]">
          {sortTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedOption(tab)}
              className={`flex-1 text-center pb-2 text-lg font-semibold ${
                selectedOption === tab
                  ? 'text-primary-4 border-b-2 border-primary-4'
                  : 'text-gray-400'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 h-[200px] overflow-y-auto mb-6">
          {getOptions().map((option) => (
            <button
              key={option}
              onClick={() => handleToggle(option)}
              className={`min-w-10 max-h-8 px-3 py-1 rounded-xl border text-md ${
                selectedValues.includes(option)
                  ? 'bg-primary-4 text-white border-primary-4'
                  : 'border-gray-300 text-gray-700'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center px-1">
          <button
            onClick={() => setSelectedValues([])}
            className="flex items-center gap-4 px-4 py-3 bg-label-alternative bg-opacity-50 rounded-md text-label-alternative text-xl"
          >
            <RotateCw />
            초기화
          </button>
          <button
            onClick={handleApply}
            className={`text-white text-xl px-8 py-3 rounded-md ${
              selectedValues.length === 0 ? 'bg-gray-300' : 'bg-purple-600'
            }`}
          >
            {selectedValues.length}개 결과보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;

'use client';

import React from 'react';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterModal = ({ isOpen, onClose }: FilterModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-semibold mb-4">필터 모달</h2>
        <p>여기에 필터 내용을 넣으면 됩니다.</p>
        <button
          className="mt-4 px-4 py-2 bg-black text-white rounded-md"
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default FilterModal;

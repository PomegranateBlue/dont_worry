'use client';

import FilterLetter from '@/components/letterBoxComponents/FilterLetter';
import LetterCard from '@/components/letterBoxComponents/LetterCard';
import React, { useState } from 'react';

const LetterBoxPage = () => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  return (
    <div>
      <FilterLetter
        selectedFilter={selectedFilter}
        onToggleFilter={(label) => setSelectedFilter(label || null)}
      />
      <LetterCard selectedFilter={selectedFilter} />
    </div>
  );
};

export default LetterBoxPage;

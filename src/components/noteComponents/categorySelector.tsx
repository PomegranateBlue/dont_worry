'use client';

import {
  TOPIC_CATEGORIES,
  EMOTION_CATEGORIES
} from '@/constants/openai/category';
import { useState } from 'react';
const CategorySelector = () => {
  const [topicCategory, setTopicCategory] = useState<string | null>(null);

  return (
    <div>
      <div>
        {TOPIC_CATEGORIES.map((topic) => (
          <button
            key={topic}
            onClick={() => setTopicCategory(topic)}
            className="px-4 py-2 border rounded text-white"
          >
            {topic}
          </button>
        ))}
      </div>
      <div>
        {EMOTION_CATEGORIES.map((emotion) => (
          <button key={emotion} className="px-4 py-2 border rounded text-white">
            {emotion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;

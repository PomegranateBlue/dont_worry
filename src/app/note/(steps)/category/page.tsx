'use client';

import { useRouter } from 'next/navigation';
import CategorySelector from '@/components/noteComponents/categorySelector';
const CategorySelectPage = () => {
  const router = useRouter();

  return (
    <div>
      <button onClick={() => router.push('/note/message')}>
        카테고리 선택
      </button>
      <CategorySelector />
    </div>
  );
};

export default CategorySelectPage;

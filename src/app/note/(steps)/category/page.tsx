'use client';

import { useRouter } from 'next/navigation';

const CategorySelectPage = () => {
  const router = useRouter();

  return (
    <div>
      <button onClick={() => router.push('/note/message')}>
        카테고리 선택
      </button>
    </div>
  );
};

export default CategorySelectPage;

'use client';

import { useRouter } from 'next/navigation';
import CategorySelector from '@/components/noteComponents/categorySelector';

const CategorySelectPage = () => {
  const router = useRouter();

  return (
    <div>
      <CategorySelector />
      <button
        className="flex justify-center items-center mx-auto m-6 bg-black text-white text-xl font-bold w-4/6 h-[60px]"
        onClick={() => router.push('/note/message')}
      >
        다음으로
      </button>
    </div>
  );
};

export default CategorySelectPage;

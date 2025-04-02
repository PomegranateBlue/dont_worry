'use client';

import { useRouter } from 'next/navigation';

const CategorySelectPage = () => {
  const router = useRouter();
  const handleSelect = (category: string) => {
    router.push('/message?category=${category}');
  };


  return (
    <div>
        
    </div>
  )
};

export default CategorySelectPage;

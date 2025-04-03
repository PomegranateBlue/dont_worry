'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const NotePage = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace('/note/category');
  }, [router]);
  return null;
};

export default NotePage;

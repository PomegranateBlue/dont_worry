import Link from 'next/link';
import React from 'react';

const VersionPage = () => {
  return (
    <div>
      <h1 className="text-xl m-4 text-center">version 0.2.8</h1>
      <Link href="/mypage" className="border rounded-md p-2 mt-4 mb-4">
        뒤로가기
      </Link>
    </div>
  );
};

export default VersionPage;

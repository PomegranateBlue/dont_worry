'use client';

import { useEffect, useState } from 'react';
const ResultPage = () => {
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    const res = sessionStorage.getItem('gptResult');
    setResult(res);
  }, []);
  return (
    <div>
      <p>This is Result Page</p>
      <p>{result}</p>
    </div>
  );
};

export default ResultPage;

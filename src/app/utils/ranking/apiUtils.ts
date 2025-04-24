export const fetchGptSolution = async (keywords: string): Promise<string> => {
  try {
    const res = await fetch('/utils/rankingSolution', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keywords })
    });

    if (!res.ok) {
      throw new Error(`서버 오류: ${res.status}`);
    }

    const gptData = await res.json();

    if (typeof gptData === 'string') {
      return gptData;
    } else {
      return '예상하지 못한 GPT 응답 형식입니다.';
    }
  } catch (error) {
    console.error('GPT 솔루션 생성 중 오류:', error);
    throw new Error('솔루션을 생성하는 중 오류가 발생했습니다.');
  }
};

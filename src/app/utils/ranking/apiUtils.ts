import { AI_ERROR_MESSAGE } from '@/constants/error/aiErrorKeys';

export const fetchGptSolution = async (keywords: string): Promise<string> => {
  try {
    const res = await fetch('/utils/rankingSolution', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keywords })
    });

    if (!res.ok) {
      throw new Error(AI_ERROR_MESSAGE.UNKNOWN.message);
    }

    const gptData = await res.json();

    if (typeof gptData === 'string') {
      return gptData;
    } else {
      throw new Error(AI_ERROR_MESSAGE.UNKNOWN.message);
    }
  } catch (error) {
    console.error('GPT 솔루션 생성 중 오류:', error);
    throw new Error(AI_ERROR_MESSAGE.GPT_GENERATION_FAIL.message);
  }
};

import { AIError } from '@/constants/error/aiErrorKeys';

export const fetchGptSolution = async (keywords: string): Promise<string> => {
  try {
    const res = await fetch('/utils/rankingSolution', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keywords })
    });

    if (!res.ok) {
      throw new AIError('GPT_GENERATION_FAIL');
    }

    const gptData = await res.json();

    if (typeof gptData === 'string') {
      return gptData;
    } else {
      throw new AIError('UNKNOWN');
    }
  } catch (error) {
    console.error('GPT 솔루션 생성 중 오류:', error);
    throw new AIError('UNKNOWN');
  }
};

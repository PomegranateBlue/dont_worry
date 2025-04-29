import { useState, useRef, useCallback } from 'react';
import { TopSixItem } from '@/components/ranking/Solution';
import { stringifyTopSix } from '@/app/utils/ranking/stringUtils';
import {
  fetchExistingSolution,
  saveSolutionToDatabase
} from '@/app/utils/ranking/solutionFetch';
import { fetchGptSolution } from '@/app/utils/ranking/apiUtils';
import { AIError } from '@/constants/error/aiErrorKeys';

export const useSolutionGenerator = () => {
  const [solution, setSolution] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const prevKeywordsRef = useRef<string | null>(null);

  const generateSolution = useCallback(
    async (topSix: TopSixItem[], userId: string) => {
      const keywords = stringifyTopSix(topSix);

      if (prevKeywordsRef.current === keywords) {
        return;
      }

      prevKeywordsRef.current = keywords;
      setIsLoading(true);

      try {
        const existingSolution = await fetchExistingSolution(userId, keywords);
        if (existingSolution) {
          setSolution(existingSolution);
          setIsLoading(false);
          return;
        }

        const gptSolution = await fetchGptSolution(keywords);
        setSolution(gptSolution);

        await saveSolutionToDatabase(userId, gptSolution, keywords);
      } catch (error) {
        setSolution('걱정거리를 불러오는 중 오류가 발생했습니다.');
        console.error('솔루션 생성 중 오류 발생:', error);
        throw new AIError('GPT_GENERATION_FAIL');
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { solution, generateSolution, isLoading };
};

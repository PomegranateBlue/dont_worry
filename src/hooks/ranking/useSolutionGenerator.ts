import { useState, useRef, useCallback } from 'react';
import { TopThreeItem } from '@/components/ranking/Solution';
import { stringifyTopThree } from '@/app/utils/ranking/stringUtils';
import {
  fetchExistingSolution,
  saveSolutionToDatabase
} from '@/app/utils/ranking/solutionFetch';
import { fetchGptSolution } from '@/app/utils/ranking/apiUtils';
import { NextResponse } from 'next/server';
import {
  AI_ERROR_KEYS,
  AI_ERROR_MESSAGE,
  isAIErrorResponse
} from '@/constants/error/aiErrorKeys';

export const useSolutionGenerator = () => {
  const [solution, setSolution] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const prevKeywordsRef = useRef<string | null>(null);

  const generateSolution = useCallback(
    async (topThree: TopThreeItem[], userId: string) => {
      const keywords = stringifyTopThree(topThree);

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
        return NextResponse.json(
          isAIErrorResponse(AI_ERROR_KEYS.GPT_GENERATION_FAIL),
          {
            status: AI_ERROR_MESSAGE.GPT_GENERATION_FAIL.status
          }
        );
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { solution, generateSolution, isLoading };
};

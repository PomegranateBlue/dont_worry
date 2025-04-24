export const AI_ERROR_KEYS = {
  UNKNOWN: 'UNKNOWN',
  INVALID_INPUT: 'INVALID_INPUT',
  MISSING_INPUT: 'MISSING_INPUT',
  NOT_ENOUGH_TOPICS: 'NOT_ENOUGH_TOPIC',
  NOT_ENOUGH_EMOTIONS: 'NOT_ENOUGH_EMOTIONS',
  SUPABASE_INSERT_FAILED: 'SUPABASE_INSERT_FAILED',
  GPT_GENERATION_FAIL: 'GPT_GENERATION_FAIL',
  GPT_PARSE_FAIL: 'GPT_PARSE_FAIL'
} as const;

export const AI_ERROR_MESSAGE = {
  UNKNOWN: {
    status: 500,
    message: '알 수 없는 오류가 발생했습니다.',
    action: '잠시 후 다시 시도해주세요.'
  },
  INVALID_INPUT: {
    status: 400,
    message: '입력값이 잘못되었습니다.',
    action: '입력 내용을 확인해주세요.'
  },
  MISSING_INPUT: {
    status: 400,
    message: '입력값이 누락되었습니다.',
    action: '모든 필드를 입력해주세요.'
  },
  NOT_ENOUGH_TOPICS: {
    status: 422,
    message: '주제 수가 부족합니다.',
    action: '더 많은 주제를 입력해주세요.'
  },
  NOT_ENOUGH_EMOTIONS: {
    status: 422,
    message: '감정 수가 부족합니다.',
    action: '더 많은 감정을 입력해주세요.'
  },
  GPT_GENERATION_FAIL: {
    status: 500,
    message: 'AI 응답 생성에 실패했습니다.',
    action: '잠시 후 다시 시도해주세요.'
  },
  GPT_PARSE_FAIL: {
    status: 500,
    message: 'AI 분석결과를 해석하는 데 실패했습니다.',
    action: '잠시 후 다시 시도해주세요.'
  },
  SUPABASE_INSERT_FAILED: {
    status: 500,
    message: '데이터 저장에 실패했습니다.',
    action: '잠시 후 다시 시도해주세요.'
  }
};

export type AIErrorMessageType = keyof typeof AI_ERROR_MESSAGE;

export function isAIErrorResponse(key: AIErrorMessageType) {
  return {
    error: AI_ERROR_MESSAGE[key].message,
    action: AI_ERROR_MESSAGE[key].action
  };
}

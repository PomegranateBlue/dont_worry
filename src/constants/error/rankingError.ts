export const DATA_FETHCING_ERROR = '데이터를 불러오는 중 오류가 발생했습니다.';

export const ANALYZE_ERROR = '카테고리 변화를 분석하는 중 오류가 발생했습니다.';

export const DATA_FETCHING = '데이터를 불러오는 중입니다...';

export const NO_DATA = '데이터가 없습니다';

export const RANKING_ERROR_KEYS = {
  UNKNOWN: 'UNKNOWN',
  NO_USER_INFO: 'NO_USER_INFO',
  CANT_SELECT_USER_WORRIES: 'CANT_SELECT_USER_WORRIES'
} as const;

export const RANKING_ERROR_MESSAGE = {
  UNKNOWN: {
    status: 500,
    message: '알 수 없는 오류가 발생했어요.',
    action: '잠시 후 다시 시도해주세요.'
  },
  NO_USER_INFO: {
    status: 404,
    message: '사용자 정보를 찾을 수 없어요.',
    action: '로그인 상태를 확인해주세요.'
  },
  CANT_SELECT_USER_WORRIES: {
    status: 500,
    message: '걱정 데이터를 불러오는 데 실패했어요.',
    action: '잠시 후 다시 시도해주세요.'
  }
} as const;

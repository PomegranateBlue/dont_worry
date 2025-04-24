export const SUPABASE_ERROR_KEYS = {
  SUPABASE_INSERT_FAILED: 'SUPABASE_INSERT_FAILED',
  SUPABASE_UPDATE_FAILED: 'SUPABASE_UPDATE_FAILED',
  SUPABASE_DELETE_FAILED: 'SUPABASE_DELETE_FAILED',
  SUPABASE_FETCH_FAILED: 'SUPABASE_FETCH_FAILED',
  SUPABASE_AUTH_FAILED: 'SUPABASE_AUTH_FAILED'
} as const;

export const SUPABASE_ERROR_MESSAGE = {
  SUPABASE_INSERT_FAILED: {
    status: 500,
    message: '데이터 저장에 실패했습니다.',
    action: '잠시 후 다시 시도해주세요.'
  },
  SUPABASE_UPDATE_FAILED: {
    status: 500,
    message: '데이터 수정에 실패했습니다.',
    action: '다시 시도하거나 관리자에게 문의해주세요.'
  },
  SUPABASE_DELETE_FAILED: {
    status: 500,
    message: '데이터 삭제에 실패했습니다.',
    action: '잠시 후 다시 시도해주세요.'
  },
  SUPABASE_FETCH_FAILED: {
    status: 500,
    message: '데이터를 불러오지 못했습니다.',
    action: '인터넷 연결을 확인하거나 새로고침 해보세요.'
  },
  SUPABASE_AUTH_FAILED: {
    status: 401,
    message: '인증에 실패했습니다.',
    action: '다시 로그인해주세요.'
  }
};

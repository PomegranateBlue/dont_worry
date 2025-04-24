export const LETTER_ERROR_KEYS = {
  IMAGE_INSERT_FAILED: 'IMAGE_INSERT_FAILED',
  INVALID_DATE: 'INVALID_DATE',
  EMAIL_SEND_FAILED: 'EMAIL_SEND_FAILED',
  LETTER_INSERT_FAILED: 'LETTER_INSERT_FAILED',
  CANT_SELECT_LETTER: 'CANT_SELECT_LETTER',
  CANT_DELETE_LETTER: 'CANT_DELETE_LETTER',
  UNKNOWN: 'UNKNOWN',
  INVALID_INPUT: 'INVALID_INPUT'
} as const;

export const LETTER_ERROR_MESSAGE = {
  IMAGE_INSERT_FAILED: {
    status: 500,
    message: '이미지 업로드에 실패했습니다.',
    action: '잠시 후 다시 시도해주세요.'
  },
  INVALID_DATE: {
    status: 400,
    message: '유효한 날짜를 선택하지 않았습니다.',
    action: '날짜를 다시 선택해주세요.'
  },
  EMAIL_SEND_FAILED: {
    status: 500,
    message: '이메일 전송에 실패했습니다.',
    action: '잠시 후 다시 시도해주세요.'
  },
  LETTER_INSERT_FAILED: {
    status: 500,
    message: '편지 내용을 저장하는 데 실패했습니다.',
    action: '다시 시도하거나 관리자에게 문의해주세요.'
  },
  CANT_SELECT_LETTER: {
    status: 404,
    message: '편지를 조회할 수 없습니다.',
    action: '편지가 존재하는지 확인해주세요.'
  },
  CANT_DELETE_LETTER: {
    status: 403,
    message: '편지를 삭제할 수 없습니다.',
    action: '삭제 권한을 확인하거나 다시 시도해주세요.'
  },
  UNKNOWN: {
    status: 500,
    message: '알 수 없는 오류가 발생했습니다.',
    action: '잠시 후 다시 시도해주세요.'
  },
  INVALID_INPUT: {
    status: 400,
    message: '입력된 값이 유효하지 않습니다.',
    action: '입력값을 확인해주세요.'
  }
};

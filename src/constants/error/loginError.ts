export const LOGIN_ERROR_KEYS = {
  INVALID_EMAIL: 'INVALID_EMAIL', // 이메일 형식이 유효하지 않음
  INVALID_PASSWORD: 'INVALID_PASSWORD', // 비밀번호가 유효하지 않음
  USER_NOT_FOUND: 'USER_NOT_FOUND', // 존재하지 않는 사용자
  EMAIL_ALREADY_REGISTERED: 'EMAIL_ALREADY_REGISTERED', // 이미 가입된 이메일
  WRONG_PASSWORD: 'WRONG_PASSWORD', // 비밀번호 불일치
  OAUTH_FAILED: 'OAUTH_FAILED', // 소셜 로그인 실패
  SESSION_EXPIRED: 'SESSION_EXPIRED', // 세션 만료
  UNKNOWN: 'UNKNOWN' // 알 수 없는 에러
} as const;

export const LOGIN_ERROR_MESSAGE = {
  INVALID_EMAIL: {
    status: 400,
    message: '이메일 형식이 올바르지 않습니다.',
    action: '올바른 이메일 주소를 입력해주세요.'
  },
  INVALID_PASSWORD: {
    status: 400,
    message: '비밀번호 형식이 올바르지 않습니다.',
    action: '비밀번호 조건을 확인해주세요.'
  },
  USER_NOT_FOUND: {
    status: 404,
    message: '등록된 사용자가 없습니다.',
    action: '회원가입 후 다시 시도해주세요.'
  },
  EMAIL_ALREADY_REGISTERED: {
    status: 409,
    message: '이미 등록된 이메일입니다.',
    action: '로그인 또는 비밀번호 찾기를 이용해주세요.'
  },
  WRONG_PASSWORD: {
    status: 401,
    message: '비밀번호가 일치하지 않습니다.',
    action: '다시 입력하거나 비밀번호 찾기를 이용해주세요.'
  },
  OAUTH_FAILED: {
    status: 500,
    message: '소셜 로그인에 실패했습니다.',
    action: '다시 시도하거나 다른 로그인 방식을 이용해주세요.'
  },
  SESSION_EXPIRED: {
    status: 401,
    message: '로그인 세션이 만료되었습니다.',
    action: '다시 로그인해주세요.'
  },
  UNKNOWN: {
    status: 500,
    message: '알 수 없는 오류가 발생했습니다.',
    action: '잠시 후 다시 시도해주세요.'
  }
};

export type LoginErrorMessageType = keyof typeof LOGIN_ERROR_MESSAGE;

export function isLoginErrorResponse(key: LoginErrorMessageType) {
  return {
    error: LOGIN_ERROR_MESSAGE[key].message,
    action: LOGIN_ERROR_MESSAGE[key].action
  };
}

export class LoginError extends Error {
  key: LoginErrorMessageType;
  status: number;
  action: string;

  constructor(key: LoginErrorMessageType) {
    const errorInfo = LOGIN_ERROR_MESSAGE[key];
    super(errorInfo.message);
    this.name = 'LoginError';
    this.key = key;
    this.status = errorInfo.status;
    this.action = errorInfo.action;
  }
}

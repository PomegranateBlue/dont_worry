export const MYPAGE_ERROR_KEYS = {
  CANT_SELECT_USERINFO: 'CANT_SELECT_USERINFO',
  CANT_UPLOAD_USERNICK: 'CANT_UPLOAD_USERNICK',
  CANT_UPDATE_USERNICK: 'CANT_UPDATE_USERNICK',
  CANT_UPDATE_PROFILEIMG: 'CANT_UPDATE_PROFILEIMG',
  CANT_UPLOAD_PROFILEIMG: 'CANT_UPLOAD_PROFILEIMG',
  CANT_COUNT_USER_WORRIES: 'CANT_COUNT_USER_WORRIES',
  CANT_COUNT_USER_LETTERS: 'CANT_COUNT_USER_WORRIES',
  UNKONW: 'UNKONW'
};

export const MYPAGE_ERROR_MESSAGE = {
  CANT_SELECT_USERINFO: {
    status: 500,
    message: '유저 정보를 불러오는 데 실패했어요.',
    action: '다시 시도하거나 새로고침 해보세요.'
  },
  CANT_UPDATE_USERNICK: {
    status: 500,
    message: '닉네임을 변경에 실패했어요',
    action: '인터넷 연결 상태를 확인한 후 다시 시도해주세요.'
  },
  CANT_UPLOAD_USERNICK: {
    status: 400,
    message: '닉네임을 변경할 수 없어요.',
    action: '올바른 닉네임을 입력했는지 확인해주세요.'
  },
  CANT_UPDATE_PROFILEIMG: {
    status: 500,
    message: '프로필 이미지를 변경하는 데 실패했어요.',
    action: '이미지를 다시 선택해보거나 나중에 시도해주세요.'
  },
  CANT_UPLOAD_PROFILEIMG: {
    status: 500,
    message: '프로필 이미지 업로드에 실패했어요.',
    action: '인터넷 연결 상태를 확인한 후 다시 시도해주세요.'
  },
  CANT_COUNT_USER_WORRIES: {
    status: 500,
    message: '걱정 기록을 집계하는 데 실패했어요.',
    action: '잠시 후 다시 시도해주세요.'
  },
  CANT_COUNT_USER_LETTERS: {
    status: 500,
    message: '편지 기록을 집계하는 데 실패했어요.',
    action: '잠시 후 다시 시도해주세요.'
  },
  UNKNOWN: {
    status: 500,
    message: '알 수 없는 오류가 발생했습니다.',
    action: '잠시 후 다시 시도해주세요.'
  }
} as const;

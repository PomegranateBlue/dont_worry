export const NOTE_ERROR_KEYS = {
  NOT_ENOUGH_TOPICS: 'NOT_ENOUGH_TOPICS',
  NOT_ENOUGH_EMOTIONS: 'NOT_ENOUGH_EMOTIONS',
  NOT_ENOUGH_TEXT: 'NOT_ENOUGH_TEXT',
  UNKNOWN: 'UNKNOWN',
  INVALID_INPUT: 'INVALID_INPUT',
  CANT_UPLOAD_USER_WORRIES: 'CANT_UPLOADE_USER_WORRIES',
  CANT_SELECT_USER_WORRIES: 'CANT_SELECT_USER_WORRIES',
  CANT_DELETE_USER_WORRIES: 'CANT_DELETE_USER_WORRIES'
};

export const NOTE_ERROR_MESSAGE = {
  NOT_ENOUGH_TOPICS: {
    status: 400,
    message: '선택한 주제가 부족해요.',
    action: '걱정에 해당하는 주제를 더 선택해주세요.'
  },
  NOT_ENOUGH_EMOTIONS: {
    status: 400,
    message: '선택한 감정이 부족해요.',
    action: '느꼈던 감정을 더 선택해주세요.'
  },
  NOT_ENOUGH_TEXT: {
    status: 400,
    message: '걱정 내용을 더 입력해주세요.',
    action: '내용을 충분히 작성해 주세요.'
  },
  INVALID_INPUT: {
    status: 400,
    message: '입력값이 유효하지 않아요.',
    action: '필수 항목이 빠지지 않았는지 확인해주세요.'
  },
  CANT_UPLOAD_USER_WORRIES: {
    status: 500,
    message: '걱정을 업로드하는 데 실패했어요.',
    action: '잠시 후 다시 시도해주세요.'
  },
  CANT_SELECT_USER_WORRIES: {
    status: 500,
    message: '저장된 걱정을 불러오는 데 실패했어요.',
    action: '잠시 후 다시 시도해주세요.'
  },
  CANT_DELETE_USER_WORRIES: {
    status: 500,
    message: '걱정을 삭제하는 데 실패했어요.',
    action: '잠시 후 다시 시도해주세요.'
  },
  UNKNOWN: {
    status: 500,
    message: '알 수 없는 오류가 발생했어요.',
    action: '잠시 후 다시 시도해주세요.'
  }
} as const;

export type NoteErrorMessageType = keyof typeof NOTE_ERROR_MESSAGE;

export function isNoteErrorResponse(key: NoteErrorMessageType) {
  return {
    error: NOTE_ERROR_MESSAGE[key].message,
    action: NOTE_ERROR_MESSAGE[key].action
  };
}

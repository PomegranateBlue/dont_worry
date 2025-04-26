export const TOPIC_CATEGORIES = [
  { label: '학업' },
  { label: '인간관계' },
  { label: '이별' },
  { label: '경제' },
  { label: '진로' },
  { label: '가정' },
  { label: '시험' },
  { label: '연애' },
  { label: '직장' },
  { label: '건강' },
  { label: '취미' },
  { label: '자기계발' },
  { label: '이직' },
  { label: '정체성' },
  { label: '종교' }
] as const;

//카테고리 내에서만 고르도록

export const EMOTION_CATEGORIES = [
  { label: '슬픔', emoji: '/images/sad.svg', bgcolor: 'slpeum_bg' },
  { label: '불쾌', emoji: '/images/discomfort.svg', bgcolor: 'bulkuea_bg' },
  { label: '압박', emoji: '/images/stress.svg', bgcolor: 'apbak_bg' },
  { label: '불안', emoji: '/images/anxiety.svg', bgcolor: 'boolan_bg' },
  { label: '혼란', emoji: '/images/confusion.svg', bgcolor: 'honran_bg' },
  { label: '분노', emoji: '/images/anger.svg', bgcolor: 'bunno_bg' },
  { label: '우울', emoji: '/images/melancholy.svg', bgcolor: 'woowool_bg' },
  { label: '짜증', emoji: '/images/annoying.svg', bgcolor: 'zzazeung_bg' },
  { label: '후회', emoji: '/images/regret.svg', bgcolor: 'huhuea_bg' },
  { label: '외로움', emoji: '/images/lonely.svg', bgcolor: 'yoerowooum_bg' },
  { label: '무기력', emoji: '/images/lethargy.svg', bgcolor: 'moogiryeok_bg' }
] as const;

// 카테고리 내에서만 고르도록하기

export const TOPIC_CATEGORIES = [
  '학업',
  '인간관계',
  '이별',
  '경제',
  '진로',
  '가정',
  '시험',
  '연애',
  '직장',
  '건강',
  '취미',
  '자기계발',
  '이직',
  '정체성',
  '종교'
] as const;
//카테고리 내에서만 고르도록

export const EMOTION_CATEGORIES = [
  {
    label: '슬픔',
    emoji: '/images/sad.svg',
    bgcolor: 'slpeum_bg',
    borderColor: 'slpeum'
  },
  {
    label: '불쾌',
    emoji: '/images/discomfort.svg',
    bgcolor: 'bulkuea_bg',
    borderColor: 'bulkuea'
  },
  {
    label: '압박',
    emoji: '/images/stress.svg',
    bgcolor: 'apbak_bg',
    borderColor: 'apbak'
  },
  {
    label: '불안',
    emoji: '/images/anxiety.svg',
    bgcolor: 'boolan_bg',
    borderColor: 'boolan'
  },
  {
    label: '혼란',
    emoji: '/images/confusion.svg',
    bgcolor: 'honran_bg',
    borderColor: 'honran'
  },
  {
    label: '분노',
    emoji: '/images/anger.svg',
    bgcolor: 'bunno_bg',
    borderColor: 'bunno'
  },
  {
    label: '우울',
    emoji: '/images/melancholy.svg',
    bgcolor: 'woowool_bg',
    borderColor: 'woowool'
  },
  {
    label: '짜증',
    emoji: '/images/annoying.svg',
    bgcolor: 'zzazeung_bg',
    borderColor: 'zzazeung'
  },
  {
    label: '후회',
    emoji: '/images/regret.svg',
    bgcolor: 'huhuea_bg',
    borderColor: 'huhuea'
  },
  {
    label: '외로움',
    emoji: '/images/lonely.svg',
    bgcolor: 'yoerowooum_bg',
    borderColor: 'yoerowooum'
  },
  {
    label: '무기력',
    emoji: '/images/lethargy.svg',
    bgcolor: 'moogiryeok_bg',
    borderColor: 'moogiryeok'
  }
] as const;

// 카테고리 내에서만 고르도록하기

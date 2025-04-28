export const formatDate = (date?: string | null) => {
  if (!date) return '날짜 없음';

  return new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

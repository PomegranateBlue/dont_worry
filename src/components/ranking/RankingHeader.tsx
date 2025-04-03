import WeekNavigator from './WeekNavigator';

export default async function RankingHeader({ initialDate = new Date() }) {
  // 서버에서 초기 날짜 계산
  const year = initialDate.getFullYear();
  const month = initialDate.getMonth() + 1;

  // 현재 월의 주차 계산
  const getWeekOfMonth = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return Math.ceil((date.getDate() + firstDay) / 7);
  };

  const currentWeek = getWeekOfMonth(initialDate);
  const formattedDate = `${year}년 ${month}월 ${currentWeek}째주`;

  // 서버에서 데이터를 가져오는 부분 (필요한 경우)
  // const weekData = await fetchWeekData(year, month, currentWeek);

  return (
    <WeekNavigator
      initialFormattedDate={formattedDate}
      initialYear={year}
      initialMonth={month}
      initialWeek={currentWeek}
      /* 필요한 경우 서버에서 가져온 데이터 전달 */
      // weekData={weekData}
    />
  );
}

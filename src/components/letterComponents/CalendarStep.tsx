import React from 'react';
import { Calendar } from '../ui/calendar';
import dayjs from 'dayjs';

type CalendarStepProps = {
  sendAt: string;
  setSendAt: (date: string) => void;
  onNext: () => void;
};

const CalendarStep = ({ sendAt, setSendAt, onNext }: CalendarStepProps) => {
  //날짜 데이터를 -월 -일 형식의 텍스트로 변환
  const formatDateText = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return null; //날짜 유효성 검사
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}월 ${day}일`;
  };

  // string → Date (캘린더에 보여줄 값으로)
  const selectedDate = sendAt ? new Date(sendAt) : undefined;

  return (
    <section className="sm:w-[375px] h-[812px] flex flex-col bg-backgroundSet-normal overflow-hidden">
      <header className="p-4 text-xl text-center">
        <h1>{formatDateText(sendAt) ?? '미래'}의 나에게 편지를 보내요</h1>
      </header>
      <main className="px-4 flex-grow-0 pb-16">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => {
            if (date) {
              const iso = dayjs(date).format('YYYY-MM-DD');
              setSendAt(iso);
            }
          }}
          disabled={(date) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0); // 오늘 날짜의 00:00시로 설정
            return date < today; // 오늘 이전 날짜는 비활성화
          }}
          className="w-full rounded-md border shadow-lg"
        />
      </main>

      <footer className="absolute bottom-0 left-0 w-full p-4">
        <button
          type="button"
          onClick={onNext}
          className="bg-primary-4 text-white px-4 py-2 rounded-lg w-full"
          disabled={!sendAt}
        >
          다음으로
        </button>
      </footer>
    </section>
  );
};

export default CalendarStep;

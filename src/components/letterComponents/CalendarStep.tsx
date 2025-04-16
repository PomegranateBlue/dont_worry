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
    <section className="w-full flex flex-col justify-between items-center bg-backgroundSet-normal">
      <div className="w-full max-w-sm flex flex-col flex-grow">
        <header className="p-4 text-xl text-center">
          <h1>{formatDateText(sendAt) ?? '미래'}의 나에게 편지를 보내요</h1>
        </header>

        <main className="flex-grow px-4">
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
              today.setHours(0, 0, 0, 0);
              return date < today;
            }}
            className="w-full rounded-md border shadow-lg"
          />
        </main>
      </div>
      <footer className="flex absolute bottom-0 w-full px-4 py-4 items-center justify-center">
        <button
          type="button"
          onClick={onNext}
          className="bg-primary-4 text-white py-2 px-4 w-full md:w-auto rounded-lg"
          disabled={!sendAt}
        >
          다음으로
        </button>
      </footer>
    </section>
  );
};

export default CalendarStep;

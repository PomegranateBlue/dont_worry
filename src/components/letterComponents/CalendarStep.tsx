import React from 'react';

type CalendarStepProps = {
  sendAt: string;
  setSendAt: (date: string) => void;
  onNext: () => void;
};

const CalendarStep = ({ sendAt, setSendAt, onNext }: CalendarStepProps) => {
  //날짜 데이터를 -월 -일 형식의 텍스트로 변환
  const formatDateText = (dateStr: string) => {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}월 ${day}일`;
  };

  //과거 날짜 선택 못하도록 유효성 검사 추가
  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <section className="sm:w-[375px] min-h-screen relative bg-backgroundSet-normal overflow-hidden flex flex-col justify-between">
      <div className="p-4 flex flex-col items-center">
        <header className="flex justify-between items-center text-xl">
          <h1>{formatDateText(sendAt) || '미래'}</h1>의 나에게 편지를 보내요
        </header>
        <input
          type="date"
          value={sendAt}
          onChange={(e) => setSendAt(e.target.value)}
          min={todayStr}
          className="border px-3 py-2 rounded mb-6 w-full"
          required
        />
        <button
          type="button"
          onClick={onNext}
          className="bg-primary-4 text-white px-4 py-2 rounded-lg w-full"
          disabled={!sendAt}
        >
          다음으로
        </button>
      </div>
    </section>
  );
};

export default CalendarStep;

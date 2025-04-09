import React from 'react';

type CalendarStepProps = {
  sendAt: string;
  setSendAt: (date: string) => void;
  onNext: () => void;
};

const CalendarStep = ({ sendAt, setSendAt, onNext }: CalendarStepProps) => {
  return (
    <div className="flex flex-col items-center">
      <p className="text-center text-lg mb-4">
        <span className="font-bold">{sendAt || '날짜를'}</span> 선택하고
        타임캡슐을 보내세요!
      </p>
      <input
        type="date"
        value={sendAt}
        onChange={(e) => setSendAt(e.target.value)}
        min={new Date().toISOString().split('T')[0]} //과거 날짜 선택 못하도록 유효성 검사 추가
        className="border px-3 py-2 rounded mb-6 w-full"
        required
      />
      <button
        type="button"
        onClick={onNext}
        className="bg-black text-white px-4 py-2 rounded w-full"
        disabled={!sendAt}
      >
        다음으로
      </button>
    </div>
  );
};

export default CalendarStep;

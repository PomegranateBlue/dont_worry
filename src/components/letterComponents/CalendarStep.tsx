import React from 'react';
import { Calendar } from '../ui/calendar';
import dayjs from 'dayjs';
import Text from '../common/Text';

type CalendarStepProps = {
  sendAt: string;
  setSendAt: (date: string) => void;
  onNext: () => void;
};

const CalendarStep = ({ sendAt, setSendAt, onNext }: CalendarStepProps) => {
  //날짜 데이터를 -월 -일 형식의 텍스트로 변환
  // const formatDateText = (dateStr: string) => {
  //   const date = new Date(dateStr);
  //   if (isNaN(date.getTime())) return null; //날짜 유효성 검사
  //   const month = date.getMonth() + 1;
  //   const day = date.getDate();
  //   return `${month}월 ${day}일`;
  // };

  // string → Date (캘린더에 보여줄 값으로)
  const selectedDate = sendAt ? new Date(sendAt) : undefined;
  return (
    <section>
      <nav className="flex h-[56px] px-[6px] justify-center items-center gap-[20px] self-stretch">
        <div className="w-full">
          <Text
            variant="title1"
            color="label-normal"
            className="text-center font-pretendard text-[20px] font-semibold leading-[135%]"
          >
            미래 편지 작성
          </Text>
        </div>
      </nav>
      <form className="w-96 flex flex-col justify-between items-center bg-backgroundSet-normal mx-auto px-5 py-8">
        <div className="flex flex-col items-center w-full">
          <nav className="flex px-5 py-2 justify-center items-center gap-2 self-stretch">
            <div className="w-full">
              <Text
                variant="heading3"
                color="label-normal"
                className="font-ibm text-[22px] font-medium leading-[135%] text-left"
              >
                날짜를 선택하고
                <br />
                미래의 나에게 편지를 보내세요!
              </Text>
            </div>
          </nav>
          <main className="flex flex-col items-start gap-2 py-5 mb-44">
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
              className="w-[342.81px] h-[286.118px] rounded-[5.315px] shadow-lg"
            />
          </main>
        </div>
        <div className="w-full mt-10">
          <button
            type="button"
            onClick={onNext}
            className="w-full h-12 bg-primary-4 text-white text-lg font-semibold rounded-lg"
            disabled={!sendAt}
          >
            다음으로
          </button>
        </div>
      </form>
    </section>
  );
};

export default CalendarStep;

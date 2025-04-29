import React from 'react';
import { Calendar } from '../ui/calendar';
import dayjs from 'dayjs';
import Text from '../common/Text';

type CalendarStepProps = {
  sendAt: string;
  setSendAt: (date: string) => void;
  onNext: () => void;
  isDesktop: boolean;
};

const CalendarStep = ({
  sendAt,
  setSendAt,
  onNext,
  isDesktop
}: CalendarStepProps) => {
  const selectedDate = sendAt ? new Date(sendAt) : undefined;

  return (
    <section className="flex flex-col justify center items-center xl:pb-20">
      <nav className="flex h-[56px] px-4 justify-center items-center gap-5 xl:h-[80px] xl:px-10 self-stretch">
        <div className="w-full">
          <Text variant="title1" color="label-normal" className="text-center">
            미래 편지 작성
          </Text>
        </div>
      </nav>
      {/*제목 부터 달력까지*/}
      <div className="flex flex-col w-full items-center px-4 py-5 md:w-[510px] md:py-0 xl:gap-6 xl:px-6 xl:py-10 xl:w-[648px] xl:h-[436px] xl:mb-10">
        <nav className="flex justify-center items-center py-2 gap-2 xl:py-[8px] xl:gap-[8px]  self-stretch">
          <div className="w-full">
            <Text variant="heading3" color="label-normal">
              날짜를 선택하고
              <br />
              미래의 나에게 편지를 보내세요!
            </Text>
          </div>
        </nav>
        <main className="flex flex-col items-start gap-2 py-5 mb-44 xl:w-[648px] xl:p-[12px_16px] xl:mb-0">
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
            className="w-[342.81px] md:w-[510px]  xl:w-[616px] rounded-[5.315px] shadow-lg"
          />
        </main>
      </div>
      {!isDesktop && (
        <div className="relative flex w-full justify-center items-center px-5 gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={onNext}
            className="w-full h-12 bg-primary-4 rounded-lg md:w-[510px] xl:hidden"
            disabled={!sendAt}
          >
            <Text variant="title2" color="white">
              다음으로
            </Text>
          </button>
        </div>
      )}
    </section>
  );
};

export default CalendarStep;

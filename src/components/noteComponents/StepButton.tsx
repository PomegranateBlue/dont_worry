'use client';

interface StepButtonProps {
  stepText: string;
  buttonEvent: () => void;
}

const StepButton = ({ stepText, buttonEvent }: StepButtonProps) => {
  return (
    <button
      className="w-[375px] h-[64px] items-center text-backgroundSet-offwhite bg-black  "
      onClick={buttonEvent}
    >
      {stepText}
    </button>
  );
};

export default StepButton;

'use client';

interface StepButtonProps {
  stepText: string;
  buttonEvent: () => void;
}

const StepButton = ({ stepText, buttonEvent }: StepButtonProps) => {
  return (
    <button
      className="px-[343px] py-[60px] text-base text-white bg-black  "
      onClick={buttonEvent}
    >
      {stepText}
    </button>
  );
};

export default StepButton;

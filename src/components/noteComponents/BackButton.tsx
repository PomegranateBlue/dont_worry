'use client';

import { ChevronLeft } from 'lucide-react';

interface BackStepButtonProps {
  stepText: string;
  buttonEvent: () => void;
}

const BackButton = ({ stepText, buttonEvent }: BackStepButtonProps) => {
    const handleBackButton=()=>{
        
    }
  
    return (
    <button onClick={buttonEvent}>
      <ChevronLeft />
    </button>
  );
};

export default BackButton;

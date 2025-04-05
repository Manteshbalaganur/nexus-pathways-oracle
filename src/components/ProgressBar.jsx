
import React from 'react';

const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="w-full mb-6">
      <div className="flex justify-between mb-1 text-xs text-neural-gray">
        <span>Start</span>
        <span>Progress: {Math.round(progress)}%</span>
        <span>Complete</span>
      </div>
      <div className="w-full h-2 bg-neural-dark rounded-full overflow-hidden">
        <div 
          className="h-full bg-neural-gradient rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;

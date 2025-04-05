
import React from 'react';

const FormStep = ({ 
  title, 
  question,
  children,
  isActive
}) => {
  if (!isActive) return null;
  
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="text-sm uppercase tracking-wider text-neural-gray mb-2">{title}</h2>
        <h3 className="text-2xl font-bold mb-4">{question}</h3>
      </div>
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
};

export default FormStep;

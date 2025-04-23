import React from 'react';

interface ProgressStepsProps {
  currentStep: number;
}

export const ProgressSteps: React.FC<ProgressStepsProps> = ({ currentStep }) => {
  const steps = [
    { number: 1, label: 'Choose room' },
    { number: 2, label: 'Choose add-on' },
    { number: 3, label: 'Checkout' }
  ];

  return (
    <div className="flex justify-center py-4 bg-gray-200">
      <div className="flex items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            {index > 0 && (
              <div className="w-8 h-[2px] bg-gray-300 mx-2"></div>
            )}
            <div className="flex flex-col items-center">
              <div 
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  step.number === currentStep 
                    ? 'bg-indigo-900 text-white' 
                    : step.number < currentStep 
                      ? 'bg-red-500 text-white' 
                      : 'bg-gray-300 text-gray-600'
                }`}
              >
                {step.number}
              </div>
              <div className="text-xs mt-1">
                {step.number}. {step.label}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

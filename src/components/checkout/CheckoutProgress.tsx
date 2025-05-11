import React from 'react';
import { Check } from 'lucide-react';

interface CheckoutProgressProps {
  currentStep: number;
}

const steps = [
  { id: 1, name: 'Authentication' },
  { id: 2, name: 'Shipping' },
  { id: 3, name: 'Payment' },
  { id: 4, name: 'Confirmation' }
];

const CheckoutProgress: React.FC<CheckoutProgressProps> = ({ currentStep }) => {
  return (
    <nav aria-label="Progress" className="mb-8">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li
            key={step.name}
            className={`relative ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}
          >
            <div className="flex items-center">
              <div
                className={`relative flex h-8 w-8 items-center justify-center rounded-full ${
                  step.id < currentStep
                    ? 'bg-pink-600'
                    : step.id === currentStep
                    ? 'border-2 border-pink-600 bg-white'
                    : 'border-2 border-gray-300 bg-white'
                }`}
              >
                {step.id < currentStep ? (
                  <Check className="h-5 w-5 text-white" />
                ) : (
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      step.id === currentStep ? 'bg-pink-600' : 'bg-transparent'
                    }`}
                  />
                )}
              </div>
              {stepIdx !== steps.length - 1 && (
                <div
                  className={`absolute top-4 h-0.5 w-full ${
                    step.id < currentStep ? 'bg-pink-600' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
            <span
              className={`absolute -bottom-6 w-max text-sm ${
                step.id <= currentStep ? 'text-pink-600' : 'text-gray-500'
              }`}
            >
              {step.name}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default CheckoutProgress;
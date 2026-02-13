import React from "react";

export interface StepperItem {
  title: string;
}

export interface StepperProps {
  step: number;
  steps: StepperItem[];
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({ step, steps, className = "" }) => {
  return (
    <div className={`flex items-center flex-wrap ${className}`}>
      {steps.map((item, index) => {
        const current = index + 1;
        const isActive = step === current;
        const isCompleted = step > current;

        return (
          <React.Fragment key={index}>
            <div className="flex items-center">
              <div
                className={`
                relative inline-flex items-center justify-center
                xl:px-8 lg:px-6 md:px-4 px-3
                xl:py-3 py-2
                rounded-full
                lux-panel
                text-sm md:text-base
                transition-all duration-300
                
                ${
                  isActive
                    ? "text-primary main-animated-border-box bg-primary/5 dark:bg-primary/10"
                    : isCompleted
                    ? "text-primary border border-primary/40 bg-primary/5"
                    : "text-titleText dark:text-titleText-dark border border-slate-300 dark:border-slate-600 bg-white/60 dark:bg-slate-900/40"
                }
              `}
              >
                <span className="whitespace-nowrap">{item.title}</span>
              </div>
            </div>

            {index !== steps.length - 1 && (
              <div className="mx-3 h-[2px] w-6 md:w-10 bg-slate-300 dark:bg-slate-600" />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};


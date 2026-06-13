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
    <div className={`flex flex-col md:flex-row md:items-center ${className}`}>
      {steps.map((item, index) => {
        const current = index + 1;
        const isActive = step === current;
        const isCompleted = step > current;

        return (
          <React.Fragment key={index}>
            {/* MOBILE */}
            <div className="flex items-start gap-3 md:hidden">
              <div className="flex flex-col items-center">
                <div className="relative w-8 h-8 flex items-center justify-center flex-shrink-0">
                  {isActive && (
                    <div
                      className="animated-border-overlay absolute inset-0 rounded-full pointer-events-none"
                    />
                  )}
                  {isCompleted ? (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  ) : (
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border text-sm font-medium
        ${isActive
                        ? "bg-primary/5 dark:bg-primary/10 border-transparent text-primary"
                        : "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-500"
                      }`}>
                      {index + 1}
                    </div>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className="w-[2px] h-8 bg-slate-300 dark:bg-slate-600 mt-1" />
                )}
              </div>


              <div className="pt-[6px] text-sm text-titleText dark:text-titleText-dark">
                {item.title}
              </div>
            </div>
            <div className="hidden md:flex items-center">
              <div
                className={`
                relative inline-flex items-center justify-center
                xl:px-8 lg:px-6 md:px-4 px-3
                xl:py-3 py-2
                rounded-full
                lux-panel
                text-sm md:text-base
                transition-all duration-300
                
                ${isActive
                    ? "text-primary main-animated-border-box bg-primary/5 dark:bg-primary/10"
                    : isCompleted
                      ? "text-primary border border-primary/40 bg-primary/5"
                      : "text-titleText dark:text-titleText-dark border border-slate-300 dark:border-slate-600 bg-white/60 dark:bg-slate-900/40"
                  }
              `}
              >
                {item.title}
              </div>

              {index !== steps.length - 1 && (
                <div className="mx-3 h-[2px] w-6 md:w-10 bg-slate-300 dark:bg-slate-600" />
              )}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

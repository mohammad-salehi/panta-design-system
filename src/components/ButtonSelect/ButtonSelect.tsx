import React from "react";
import clsx from "clsx";

export type SwitchOption = {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
};

export interface ButtonSelectProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;

  options: SwitchOption[];

  dir?: "rtl" | "ltr";

  size?: "sm" | "md" | "lg";
  variant?: "default" | "primary";

  orientation?: "horizontal" | "vertical" | "grid";
  columns?: number; // فقط برای grid

  fullWidth?: boolean; // برای horizontal

  className?: string;
}

export function ButtonSelect({
  value,
  defaultValue,
  onChange,
  options,
  dir = "rtl",
  size = "md",
  variant = "primary",
  orientation = "horizontal",
  columns = 4,
  fullWidth = false,
  className,
}: ButtonSelectProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const current = value ?? internalValue;

  function select(val: string) {
    if (value === undefined) {
      setInternalValue(val);
    }
    onChange?.(val);
  }

  const sizeStyles = {
    sm: "py-1.5 px-2 text-xs",
    md: "py-2 px-3 text-sm",
    lg: "py-3 px-4 text-base",
  };

  const layoutClasses =
    orientation === "vertical"
      ? "flex flex-col gap-1"
      : orientation === "grid"
        ? `grid gap-1 grid-cols-${columns}`
        : "flex flex-row gap-1";

  return (
    <div
      dir={dir}
      className={clsx(
        "w-full",
        layoutClasses,
        orientation === "horizontal" && !fullWidth && "w-fit",
        className
      )}
    >
      {options.map((opt) => {
        const active = opt.value === current;

        return (
          <button
            key={opt.value}
            type="button"
            disabled={opt.disabled}
            onClick={() => select(opt.value)}
            className={clsx(
              `
              font-medium
              rounded-xl
              border
              transition-all
              duration-200
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#63C3FF]
              focus-visible:ring-offset-2
              shadow-sm
              hover:cursor-pointer
              `,
              sizeStyles[size],

              orientation === "horizontal" &&
              (fullWidth ? "flex-1" : ""),

              active
                ? variant === "primary"
                  ? `
                    bg-gradient-to-r from-[#63C3FF] to-[#4BA5FF]
                    text-white dark:text-slate-900
                    border-transparent
                    shadow-md
                  `
                  : `
                    bg-white dark:bg-slate-700
                    border-[#63C3FF]
                  `
                : `
                    bg-boxColor dark:bg-boxColor-dark
                    text-titleText dark:text-titleText-dark
                    border-solid
                    border-boxBorderColor dark:border-boxBorderColor-dark
                    hover:bg-slate-50/70
                    dark:hover:bg-slate-700/60
                    hover:border-[#63C3FF]
                  `,

              opt.disabled && "opacity-50 pointer-events-none"
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

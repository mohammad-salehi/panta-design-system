import React from "react";

interface Props {
  index: number;
  title: string;
  status: "completed" | "active" | "upcoming";
  orientation: "horizontal" | "vertical";
  clickable?: boolean;
  onClick?: () => void;
}

export const StepItem: React.FC<Props> = ({
  index,
  title,
  status,
  orientation,
  clickable,
  onClick,
}) => {
  const base =
    "relative flex items-center transition-all duration-300";

  const circleBase =
    "flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-300";

  const circleStyles =
    status === "completed"
      ? "bg-primary text-white shadow-lg scale-100"
      : status === "active"
      ? "bg-white text-primary border-2 border-primary scale-110 shadow-md dark:bg-slate-900"
      : "bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500";

  const textStyles =
    status === "active"
      ? "text-primary font-semibold"
      : status === "completed"
      ? "text-slate-800 dark:text-slate-200"
      : "text-slate-400";

  return (
    <div
      className={`${base} ${
        orientation === "vertical" ? "flex-row gap-4" : "flex-col"
      } ${clickable ? "cursor-pointer" : ""}`}
      onClick={onClick}
    >
      <div
        className={`${circleBase} w-10 h-10 ${circleStyles}`}
      >
        {status === "completed" ? "✓" : index}
      </div>

      <span
        className={`mt-2 text-sm hidden md:block ${textStyles}`}
      >
        {title}
      </span>
    </div>
  );
};

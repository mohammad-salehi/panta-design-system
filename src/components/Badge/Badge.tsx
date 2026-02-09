import * as React from "react";
import clsx from "clsx";

export type BadgeColor = "green" | "red" | "blue" | "yellow" | "purple";
export type BadgeVariant = "soft" | "solid" | "outline";

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  color?: BadgeColor;
  variant?: BadgeVariant;
};

const styles: Record<BadgeColor, Record<BadgeVariant, string>> = {
  green: {
    soft: `
      bg-emerald-100 text-emerald-700 border border-emerald-200
      dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800
    `,
    solid: `
      bg-emerald-600 text-white border border-emerald-600
      dark:bg-emerald-500 dark:text-white dark:border-emerald-500
    `,
    outline: `
      bg-transparent text-emerald-700 border border-emerald-300
      dark:text-emerald-300 dark:border-emerald-700
    `,
  },
  red: {
    soft: `
      bg-rose-100 text-rose-700 border border-rose-200
      dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-800
    `,
    solid: `
      bg-rose-600 text-white border border-rose-600
      dark:bg-rose-500 dark:text-white dark:border-rose-500
    `,
    outline: `
      bg-transparent text-rose-700 border border-rose-300
      dark:text-rose-300 dark:border-rose-700
    `,
  },
  blue: {
    soft: `
      bg-sky-100 text-sky-700 border border-sky-200
      dark:bg-sky-900/30 dark:text-sky-300 dark:border-sky-800
    `,
    solid: `
      bg-sky-600 text-white border border-sky-600
      dark:bg-sky-500 dark:text-white dark:border-sky-500
    `,
    outline: `
      bg-transparent text-sky-700 border border-sky-300
      dark:text-sky-300 dark:border-sky-700
    `,
  },
  yellow: {
    soft: `
      bg-amber-100 text-amber-800 border border-amber-200
      dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800
    `,
    solid: `
      bg-amber-500 text-black border border-amber-500
      dark:bg-amber-400 dark:text-black dark:border-amber-400
    `,
    outline: `
      bg-transparent text-amber-800 border border-amber-300
      dark:text-amber-300 dark:border-amber-700
    `,
  },
  purple: {
    soft: `
      bg-violet-100 text-violet-700 border border-violet-200
      dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-800
    `,
    solid: `
      bg-violet-600 text-white border border-violet-600
      dark:bg-violet-500 dark:text-white dark:border-violet-500
    `,
    outline: `
      bg-transparent text-violet-700 border border-violet-300
      dark:text-violet-300 dark:border-violet-700
    `,
  },
};

export function Badge({
  color = "blue",
  variant = "soft",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-2 text-xs font-semibold leading-none whitespace-nowrap",
        styles[color][variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

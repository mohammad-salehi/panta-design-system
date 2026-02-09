import * as React from "react";
import clsx from "clsx";

type LoaderMode = "normal" | "skeleton";

export type LoaderProps = React.HTMLAttributes<HTMLDivElement> & {
  mode?: LoaderMode;
  text?: string;
  count?: number;
  skeletonHeight?: number;
  withAvatar?: boolean;
};

export function Loader({
  mode = "normal",
  text = "در حال بارگذاری...",
  count = 4,
  skeletonHeight = 14,
  withAvatar = false,
  className,
  ...props
}: LoaderProps) {
  if (mode === "skeleton") {
    return (
      <div className={clsx("w-full", className)} {...props}>
        <div className="w-full rounded-2xl ">
          <div className="space-y-3">
            {Array.from({ length: Math.max(1, count) }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                {withAvatar && (
                  <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_linear_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-white/10" />
                  </div>
                )}

                <div className="flex-1 space-y-2">
                  <div
                    className="relative w-full overflow-hidden rounded-md bg-slate-200 dark:bg-slate-800"
                    style={{ height: skeletonHeight }}
                  >
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_linear_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-white/10" />
                  </div>

                  <div
                    className="relative overflow-hidden rounded-md bg-slate-200 dark:bg-slate-800"
                    style={{
                      height: Math.max(10, skeletonHeight - 2),
                      width: i % 2 === 0 ? "70%" : "55%",
                    }}
                  >
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_linear_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-white/10" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "w-full rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-8 dark:border-slate-700/80 dark:bg-slate-900/60",
        className
      )}
      role="status"
      aria-live="polite"
      {...props}
    >
      <div className="flex w-full flex-col items-center justify-center">
        {/* spinner */}
        <svg
          className="h-10 w-10 animate-spin"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            cx="12"
            cy="12"
            r="9"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-slate-300 dark:text-slate-700"
            opacity="0.35"
          />
          <path
            d="M21 12a9 9 0 0 0-9-9"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className="text-sky-500 dark:text-sky-400"
          />
        </svg>

        <p className="mt-3 text-sm font-medium text-slate-600 dark:text-slate-300">
          {text}
        </p>
      </div>
    </div>
  );
}

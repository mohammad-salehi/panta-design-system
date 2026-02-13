import clsx from "clsx";
import React, { useRef, useState, useEffect } from "react";

export type BoxProps = {
  dir?: "rtl" | "ltr";
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  onToggle?: (collapsed: boolean) => void;
};

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      className={clsx("transition-transform duration-300", open ? "rotate-180" : "")}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export function Box({
  dir = "rtl",
  title,
  description,
  icon,
  actions,
  children,
  footer,
  className,
  collapsible = false,
  defaultCollapsed = false,
  onToggle,
}: BoxProps) {
  const hasHeader = title || description || icon || actions || collapsible;
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const update = () => setHeight(el.scrollHeight);
    update();

    const ro = new ResizeObserver(() => update());
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  function toggle() {
    if (!collapsible) return;
    const next = !collapsed;
    setCollapsed(next);
    onToggle?.(next);
  }

  return (
    <div
      dir={dir}
      className={clsx(
        `
        w-full max-w-full min-w-0
        rounded-[32px]
        border border-white/30 dark:border-white/10
        bg-gradient-to-br from-white/90 via-white/70 to-white/60
        dark:from-[#0b0f15]/95 dark:via-[#0d131c]/85 dark:to-[#0a0f15]/90
        backdrop-blur-2xl
        shadow-[0_25px_70px_-35px_rgba(0,0,0,0.55)]
        p-4 md:p-5
        text-titleText dark:text-titleText-dark
        flex flex-col
        overflow-visible
        mb-4
        `,
        className
      )}
      style={{ boxSizing: "border-box" }}
    >
      {hasHeader && (
        <div
          onClick={toggle}
          className={clsx(
            "flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between flex-shrink-0",
            collapsible && "cursor-pointer select-none"
          )}
        >
          {(icon || title || description) && (
            <div className="flex items-center gap-3 min-w-0">
              {icon && (
                <div className="h-11 w-11 flex-shrink-0 rounded-2xl bg-white/70 dark:bg-white/5 border border-white/40 dark:border-white/10 flex items-center justify-center lux-icon">
                  {icon}
                </div>
              )}
              <div className="min-w-0">
                {title && <h4 className="text-16 font-bold truncate m-0">{title}</h4>}
                {description && (
                  <p className="text-[12px] text-titleText/60 dark:text-titleText-dark/60 m-0">
                    {description}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="flex items-center gap-2">
            {actions}
            {collapsible && (
              <div className="h-9 w-9 rounded-xl flex items-center justify-center bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10 lux-icon">
                <ChevronIcon open={!collapsed} />
              </div>
            )}
          </div>
        </div>
      )}

      <div
        style={{ maxHeight: collapsed ? 0 : height + 20 }}
        className="transition-all duration-300 ease-in-out overflow-hidden"
      >
        <div ref={contentRef}>
          <div className="flex-1 min-h-0 w-full mt-5">
            <div className="relative w-full h-full min-w-0">{children}</div>
          </div>

          {footer && (
            <div className="mt-5 pt-4 border-t border-white/30 dark:border-white/10 flex-shrink-0">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

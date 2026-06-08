"use client";

import React, {
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  ReactNode,
} from "react";

/* =========================
   Exported Props Types
========================= */
export type TabsProps = {
  defaultValue: string;
  children: ReactNode;
  className?: string;
};

export type TabsListProps = {
  children: ReactNode;
  className?: string;
};

export type TabsTriggerProps = {
  value: string;
  children: ReactNode;
  className?: string;
};

export type TabsContentProps = {
  value: string;
  children: ReactNode;
  className?: string;
};

/* =========================
   Internal Types
========================= */
type TabsContextType = {
  active: string;
  setActive: (v: string) => void;
};

const TabsContext = React.createContext<TabsContextType | null>(null);

function useTabsContext() {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error("Tabs components must be used inside <Tabs />");
  return ctx;
}

function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

/* =========================
   Components
========================= */
export function Tabs({ defaultValue, children, className }: TabsProps) {
  const [active, setActive] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ active, setActive }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className }: TabsListProps) {
  const { active } = useTabsContext();

  const wrapRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const [indicator, setIndicator] = useState({
    width: 0,
    x: 0,
    rtl: false,
    ready: false,
  });

  const updateIndicator = React.useCallback(() => {
    const list = listRef.current;
    if (!list) return;

    const activeEl = list.querySelector<HTMLElement>(`[data-value="${active}"]`);
    if (!activeEl) return;

    const listRect = list.getBoundingClientRect();
    const elRect = activeEl.getBoundingClientRect();

    // direction را از computed style خود list می‌خوانیم
    const dir = getComputedStyle(list).direction;
    const rtl = dir === "rtl";

    const width = elRect.width;

    // برای LTR: فاصله از چپ
    // برای RTL: فاصله از راست
    const x = rtl
      ? listRect.right - elRect.right
      : elRect.left - listRect.left;

    setIndicator({
      width,
      x,
      rtl,
      ready: true,
    });
  }, [active]);

  useLayoutEffect(() => {
    updateIndicator();
  }, [updateIndicator, children]);

  useEffect(() => {
    const onResize = () => updateIndicator();
    window.addEventListener("resize", onResize);

    if ("fonts" in document) {
      // @ts-ignore
      document.fonts?.ready?.then?.(updateIndicator);
    }

    return () => window.removeEventListener("resize", onResize);
  }, [updateIndicator]);

  return (
    <div
      ref={wrapRef}
      className={cn(
        "relative w-fit max-w-full overflow-x-auto border-b border-border",
        className
      )}
    >
      <div ref={listRef} className="relative flex items-center gap-6">
        {children}

        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute bottom-0 h-0.5 rounded-full bg-primary",
            "transition-[left,right,width,opacity] duration-300 ease-out",
            indicator.ready ? "opacity-100" : "opacity-0"
          )}
          style={{
            width: `${indicator.width}px`,
            left: indicator.rtl ? "auto" : `${indicator.x}px`,
            right: indicator.rtl ? `${indicator.x}px` : "auto",
          }}
        />
      </div>
    </div>
  );
}

export function TabsTrigger({
  value,
  children,
  className,
}: TabsTriggerProps) {
  const { active, setActive } = useTabsContext();
  const isActive = active === value;

  return (
    <span
      data-value={value}
      onClick={() => setActive(value)}
      className={cn(
        "select-none cursor-pointer pb-3 text-sm font-medium whitespace-nowrap",
        "transition-colors duration-200",
        isActive
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground",
        className
      )}
    >
      {children}
    </span>
  );
}

export function TabsContent({
  value,
  children,
  className,
}: TabsContentProps) {
  const { active } = useTabsContext();
  if (active !== value) return null;

  return <div className={cn("pt-4", className)}>{children}</div>;
}

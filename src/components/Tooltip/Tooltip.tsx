"use client";

import React, { ReactNode, useState } from "react";

type TooltipPlacement = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
    content: ReactNode;
    children: ReactNode;
    placement?: TooltipPlacement;
    className?: string;
    contentClassName?: string;
    offset?: number;
    disabled?: boolean;
}

const placementStyles: Record<TooltipPlacement, string> = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-3",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-3",
    left: "right-full top-1/2 -translate-y-1/2 mr-3",
    right: "left-full top-1/2 -translate-y-1/2 ml-3",
};

const arrowStyles: Record<TooltipPlacement, string> = {
    top: "top-full left-1/2 -translate-x-1/2 border-t-white/80 border-x-transparent border-b-transparent",
    bottom:
        "bottom-full left-1/2 -translate-x-1/2 border-b-white/80 border-x-transparent border-t-transparent",
    left: "left-full top-1/2 -translate-y-1/2 border-l-white/80 border-y-transparent border-r-transparent",
    right:
        "right-full top-1/2 -translate-y-1/2 border-r-white/80 border-y-transparent border-l-transparent",
};

export function Tooltip({
    content,
    children,
    placement = "top",
    className = "",
    contentClassName = "",
    disabled = false,
}: TooltipProps) {
    const [open, setOpen] = useState(false);

    if (disabled) {
        return <>{children}</>;
    }

    return (
        <div
            className={`relative inline-flex ${className}`}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
        >
            {children}

            <div
                className={[
                    "pointer-events-none absolute z-[9999] whitespace-nowrap transition-all duration-200",
                    placementStyles[placement],
                    open
                        ? "visible opacity-100 translate-y-0 scale-100"
                        : "invisible opacity-0 scale-95",
                ].join(" ")}
            >
                <div
                    className={[
                        "relative rounded-2xl border border-white/30 bg-white/70 px-3 py-2 text-xs font-medium text-slate-700 shadow-[0_10px_30px_rgba(15,23,42,0.14)] backdrop-blur-xl",
                        "dark:border-white/10 dark:bg-slate-700/90 dark:text-slate-100",
                        contentClassName,
                    ].join(" ")}
                >
                    {content}

                    <span
                        className={[
                            "absolute h-0 w-0 border-[6px]",
                            arrowStyles[placement],
                        ].join(" ")}
                    />
                </div>
            </div>
        </div>
    );
}

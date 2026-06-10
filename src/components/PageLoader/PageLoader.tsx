import * as React from "react";
import clsx from "clsx";
import AnimatedParagraph from "../AnimatedHeadingText/AnimatedHeadingText";
import { useEffect, useMemo, useState } from "react";

export type PageLoaderProps = React.HTMLAttributes<HTMLDivElement> & {
    /** کنترل نمایش */
    open?: boolean;
    /** متن داینامیک که از مصرف‌کننده گرفته می‌شود */
    text: string;
    /** بک‌دراپ */
    backdrop?: boolean;
    /** بلور */
    blur?: boolean;
    mode?: "loader" | "spinner"
};

export function PageLoader({
    open = true,
    text,
    backdrop = true,
    blur = true,
    className,
    mode = "loader",
    ...props
}: PageLoaderProps) {
    if (!open) return null;
    const chars = useMemo(() => Array.from(text), [text]);
    const animatableIndexes = React.useMemo(

        () => chars.map((c, i) => (c === " " ? null : i)).filter((x): x is number => x !== null),
        [chars]
    );

    const [step, setStep] = useState(0);

    useEffect(() => {
        if (!animatableIndexes.length) return;
        const interval = setInterval(() => {
            setStep((prev) => (prev + 1) % animatableIndexes.length);
        }, 300);
        return () => clearInterval(interval);
    }, [animatableIndexes.length]);

    const activeIndex = animatableIndexes[step] ?? -1;

    return (
        <div
            className={clsx(
                "fixed inset-0 z-[999] grid place-items-center",
                backdrop && "bg-white/70 dark:bg-bgColor-dark/70",
                blur && "backdrop-blur-sm",
                className
            )}
            role="status"
            aria-live="polite"
            aria-busy="true"
            {...props}
        >
            <div className="pointer-events-none flex flex-col items-center">
                {
                    mode === "loader" ?
                        <>
                            <svg className="h-10 w-10 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
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

                            <p className="mt-3 text-sm font-medium text-slate-700 dark:text-slate-200">
                                {text}
                            </p>
                        </>
                        :
                        mode === "spinner" ?
                            <p className="text-4xl sm:text-6xl lg:text-8xl font-bold m-0 text-titleText dark:text-titleText-dark text-center w-full">
                                {chars.map((ch, i) => {
                                    // فاصله‌ها ثابت می‌مونن و اصلاً هایلایت نمی‌شن
                                    if (ch === " ") return <span key={i}>&nbsp;</span>;

                                    const isActive = i === activeIndex;

                                    return (
                                        <span
                                            key={i}
                                            className={`transition-all duration-500 ease-in-out ${isActive ? "opacity-100 text-[deepskyblue]" : "opacity-80 text-titleText dark:text-titleText-dark"
                                                }`}
                                        >
                                            {ch}
                                        </span>
                                    );
                                })}
                            </p>
                            :
                            null
                }

            </div>
        </div>
    );
}

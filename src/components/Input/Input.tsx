"use client";

import { forwardRef, useState } from "react";
import clsx from "clsx";

type NativeTypes = "text" | "email" | "password" | "number" | "tel" | "url" | "search";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    hint?: string;
    error?: string;
    success?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    enablePasswordToggle?: boolean;
    fullWidth?: boolean;
    type?: NativeTypes;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            type = "text",
            enablePasswordToggle = true,
            fullWidth = true,
            label,
            hint,
            error,
            success,
            leftIcon,
            rightIcon,
            ...props
        },
        ref
    ) => {
        const [showPassword, setShowPassword] = useState(false);

        const isPassword = type === "password" && enablePasswordToggle;
        const resolvedType = isPassword ? (showPassword ? "text" : "password") : type;

        return (
            <div
                className={clsx(
                    "lux-input-field space-y-1.5",
                    fullWidth ? "w-full" : "w-fit",
                )}
            >
                {label && (
                    <label className="block text-sm font-medium text-titleText dark:text-titleText-dark">
                        {label}
                        {props.required && <span className="text-primary ml-0.5">*</span>}
                    </label>
                )}

                <div
                    className={clsx(
                        "flex h-11 items-center gap-2 rounded-2xl border px-3.5",
                        "bg-white dark:bg-bgColor-dark",
                        "border-boxBorderColor dark:border-boxBorderColor-dark",
                        "transition-all duration-150",
                        "focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 border border-solid border-boxBorderColor dark:border-boxBorderColor-dark",
                        props.disabled && "opacity-50 cursor-not-allowed"
                    )}
                >
                    {leftIcon && (
                        <span className="text-mutedText dark:text-mutedText-dark shrink-0 flex items-center [&>svg]:w-[18px] [&>svg]:h-[18px]">
                            {leftIcon}
                        </span>
                    )}

                    <input
                        ref={ref}
                        type={resolvedType}
                        autoComplete={type === "password" ? "new-password" : "off"}
                        className={clsx(
                            "flex-1 min-w-0 bg-transparent border-none outline-none shadow-none",
                            "text-sm text-titleText dark:text-titleText-dark",
                            "placeholder:text-mutedText/60 dark:placeholder:text-mutedText-dark/60 bg-none border-none p-0 ",
                            props.disabled && "cursor-not-allowed"
                        )}
                        {...props}
                    />

                    {isPassword ? (
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            tabIndex={-1}
                            aria-label="نمایش یا پنهان ساختن رمز"
                            className="shrink-0 flex items-center  text-gray-400 hover:text-primary transition-colors p-0 bg-transparent border-none outline-none"
                        >
                            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                        </button>
                    ) : (
                        rightIcon && (
                            <span className="text-mutedText dark:text-mutedText-dark shrink-0 flex items-center [&>svg]:w-[18px] [&>svg]:h-[18px]">
                                {rightIcon}
                            </span>
                        )
                    )}
                </div>

                {error ? (
                    <p className="text-xs text-red-500">{error}</p>
                ) : success ? (
                    <p className="text-xs text-emerald-500">{success}</p>
                ) : hint ? (
                    <p className="text-xs text-mutedText dark:text-mutedText-dark">{hint}</p>
                ) : null}
            </div>
        );
    }
);

Input.displayName = "Input";
export default Input;

// ─── Icons ────────────────────────────────────

const EyeIcon = ({ size = 20 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const EyeOffIcon = ({ size = 20 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C5 20 1 12 1 12a21.8 21.8 0 0 1 5.06-6.94" />
        <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a21.7 21.7 0 0 1-3.22 4.94" />
        <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
);

export function IconMail() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
    );
}

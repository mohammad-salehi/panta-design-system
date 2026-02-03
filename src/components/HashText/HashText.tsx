// components/ui/HashText/HashText.tsx
import React, { useState } from "react";

export interface HashTextProps {
  text: string;
  startChars?: number;
  endChars?: number;
  separator?: string;
  className?: string;
  showCopyButton?: boolean;
  copyOnClickText?: boolean;
}

export const HashText: React.FC<HashTextProps> = ({
  text,
  startChars = 6,
  endChars = 4,
  separator = "…",
  className = "",
  showCopyButton = true,
  copyOnClickText = false,
}) => {
  const [copied, setCopied] = useState(false);

  if (!text) return null;

  const handleCopy = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const truncated =
    text.length <= startChars + endChars
      ? text
      : `${text.slice(0, startChars)}${separator}${text.slice(-endChars)}`;

  const handleTextClick = () => {
    if (copyOnClickText) handleCopy();
  };

  return (
    <span
      className={`
        lux-chip inline-flex items-center gap-2 
        px-3 py-1.5 font-mono text-sm leading-5
        transition-all duration-200
        hover:shadow-md hover:border-amber-400/30
        
        ${className}
      `}
      title={text}
    >
      <span
        className={`select-all whitespace-nowrap tracking-wide ${
          copyOnClickText ? "cursor-pointer hover:opacity-80" : ""
        }`}
        onClick={handleTextClick}
      >
        {truncated}
      </span>

      {showCopyButton && (
  <button
    type="button"
    onClick={handleCopy}
    className={`
      flex-shrink-0 flex items-center justify-center
      w-7 h-7 rounded-md
      text-gray-500 hover:text-amber-600
      dark:text-gray-400 dark:hover:text-amber-400
      transition-all duration-200
      focus:outline-none focus:ring-1 focus:ring-amber-400/50
      bg-transparent border-none
      ${copied ? "scale-110" : "scale-100"}
    `}
    aria-label="کپی در کلیپ‌بورد"
  >
    {copied ? (
      <svg
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-emerald-500"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ) : (
      <svg
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
    )}
  </button>
)}



    </span>
  );
};

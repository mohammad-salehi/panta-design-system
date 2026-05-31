"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";

export type ModalProps = {
  open: boolean;
  onClose: () => void;

  title?: React.ReactNode;
  children: React.ReactNode;

  className?: string;

  /**
   * Close on backdrop click
   * default: true
   */
  closeOnBackdrop?: boolean;

  /**
   * Close on Escape key
   * default: true
   */
  closeOnEscape?: boolean;

  /**
   * Show header section (title + close button)
   * default: true
   */
  showHeader?: boolean;

  /**
   * Render close button
   * default: true
   */
  showCloseButton?: boolean;

  /**
   * Modal max-width tailwind class
   * default: max-w-md
   */
  maxWidthClass?: string;

  /**
   * Portal mount target (default: document.body)
   */
  portalTarget?: HTMLElement | null;

  /**
   * Container z-index (default: 9999)
   */
  zIndex?: number;

  /**
   * Optional aria label when no title is provided
   */
  ariaLabel?: string;
};

export function Modal({
  open,
  onClose,
  title,
  children,
  className,

  closeOnBackdrop = true,
  closeOnEscape = true,

  showHeader = true,
  showCloseButton = true,

  maxWidthClass = "max-w-md",

  portalTarget,
  zIndex = 9999,

  ariaLabel = "Modal dialog",
}: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;

    const body = document.body;
    const html = document.documentElement;
    const scrollbarWidth = window.innerWidth - html.clientWidth;

    const prevOverflow = body.style.overflow;
    const prevPaddingRight = body.style.paddingRight;

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    const onKey = (e: KeyboardEvent) => {
      if (!closeOnEscape) return;
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPaddingRight;
    };
  }, [open, onClose, closeOnEscape]);

  if (!open || !mounted) return null;

  const target = portalTarget ?? (typeof document !== "undefined" ? document.body : null);
  if (!target) return null;

  return createPortal(
    <div
      className="fixed inset-0"
      style={{ zIndex }}
      role="dialog"
      aria-modal="true"
      aria-label={typeof title === "string" ? title : ariaLabel}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => {
          if (!closeOnBackdrop) return;
          onClose();
        }}
      />

      {/* Center wrapper */}
      <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
        {/* Panel */}
        <div
          className={clsx(
            "pointer-events-auto w-full",
            maxWidthClass,
            "rounded-2xl",
            // tokens
            "lux-menu bg-boxColor text-titleText",
            "shadow-[0_20px_60px_rgba(0,0,0,0.35)]",
            "animate-[pantaModalIn_0.18s_ease-out]",
            className
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {showHeader ? (
            <div className="flex items-center justify-between px-5 py-1 border-b border-boxBorderColor dark:border-boxBorderColor-dark">
              <div className="min-w-0">
                {title ? (
                  typeof title === "string" ? (
                    <h3 className="truncate text-lg font-semibold">{title}</h3>
                  ) : (
                    <div className="min-w-0">{title}</div>
                  )
                ) : (
                  <div />
                )}
              </div>

              {showCloseButton ? (
                <button
                  type="button"
                  onClick={onClose}
                  className={clsx(
                    "h-9 w-9 shrink-0 rounded-xl",
                    "lux-btn flex items-center justify-center",
                    "text-titleText"
                  )}
                  aria-label="close"
                >
                  <svg
                    className="block h-[18px] w-[18px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 6l12 12M18 6L6 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              ) : null}
            </div>
          ) : null}

          <div className="px-5 pb-4 pt-0">{children}</div>
        </div>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes pantaModalIn {
          from {
            transform: translateY(12px) scale(0.98);
            opacity: 0;
          }
          to {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>,
    target
  );
}

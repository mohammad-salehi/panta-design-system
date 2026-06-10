"use client";
import React, { useMemo } from "react";

export type TablePaginationProps = {
  totalItems: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
  rtl?: boolean;
  compact?: boolean;
};

function usePagination(
  totalItems: number,
  currentPage: number,
  pageSize: number
) {
  return useMemo(() => {
    const totalPages = Math.max(1, Math.ceil(totalItems / Math.max(1, pageSize)));
    const pages: (number | "…")[] = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return { pages, totalPages };
    }

    const siblings = 1;
    const left = Math.max(2, currentPage - siblings);
    const right = Math.min(totalPages - 1, currentPage + siblings);

    pages.push(1);
    if (left > 2) pages.push("…");
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < totalPages - 1) pages.push("…");
    pages.push(totalPages);

    return { pages, totalPages };
  }, [totalItems, currentPage, pageSize]);
}

export function Pagination({
  totalItems,
  pageSize,
  currentPage,
  onPageChange,
  className = "",
  rtl = false,
  compact = false,
}: TablePaginationProps) {
  const { pages, totalPages } = usePagination(totalItems, currentPage, pageSize);

  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  const prevLabel = rtl ? "→" : "←";
  const nextLabel = rtl ? "←" : "→";

  // کوچک‌تر از قبل
  const btnSize = compact
    ? "h-7 min-w-7 px-1.5 text-xs"
    : "h-8 min-w-8 px-2 text-sm";

  const base = `
    inline-flex items-center justify-center rounded-lg
    border border-solid border-gray-200 dark:border-gray-700
    bg-white/70 dark:bg-gray-900/40
    text-titleText dark:text-titleText-dark
    disabled:opacity-40 disabled:cursor-not-allowed
    ${btnSize}
  `;

  const navBtn = `${base} hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer`;

  return (
    <nav
      dir={rtl ? "rtl" : "ltr"}
      aria-label="pagination"
      className={`w-full flex items-center justify-between flex-wrap gap-2 mt-4 ${className}`}
    >
      {/* دکمه‌های صفحه */}
      <div className="flex items-center gap-1 flex-wrap">
        <button
          type="button"
          className={navBtn}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isFirst}
          aria-label="صفحه قبل"
        >
          {prevLabel}
        </button>

        {pages.map((p, i) =>
          p === "…" ? (
            <span
              key={`ellipsis-${i}`}
              className={`
                hidden sm:inline-flex items-center justify-center
                ${btnSize} text-gray-400 dark:text-gray-500 select-none
              `}
              aria-hidden="true"
            >
              …
            </span>
          ) : (
            <button
              type="button"
              key={`page-${p}`}
              className={`
                inline-flex items-center justify-center rounded-lg  cursor-pointer
                border border-solid
                ${btnSize}
                ${
                  p === currentPage
                    ? "bg-primary text-white border-primary shadow-sm ring-1 ring-primary/30 scale-105"
                    : "hidden sm:inline-flex border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-900/40 text-titleText dark:text-titleText-dark hover:bg-gray-100 dark:hover:bg-gray-800"
                }
                ${p === currentPage ? "" : ""}
              `}
              onClick={() => onPageChange(p as number)}
              aria-label={`صفحه ${p}`}
              aria-current={p === currentPage ? "page" : undefined}
            >
              {(p as number).toLocaleString("fa-IR")}
            </button>
          )
        )}

        {/* روی موبایل: نشان‌دهنده صفحه فعلی از کل */}
        <span className="sm:hidden text-sm text-gray-500 dark:text-gray-400 px-2">
          {currentPage.toLocaleString("fa-IR")} / {totalPages.toLocaleString("fa-IR")}
        </span>

        <button
          type="button"
          className={navBtn}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isLast}
          aria-label="صفحه بعد"
        >
          {nextLabel}
        </button>
      </div>
    </nav>
  );
}

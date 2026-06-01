"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";

type CalendarType = "gregorian" | "jalali";
type DisplayFormat = "YYYY/MM/DD" | "YYYY-MM-DD";

export type DatePickerValue = Date | null;

export type DatePickerProps = {
  value: DatePickerValue;
  onChange: (value: DatePickerValue) => void;

  /**
   * خروجی نهایی برای هر دو تقویم:
   * همیشه ISO string
   * مثال:
   * 2026-06-01T13:24:53.207Z
   */
  onChangeFormatted?: (value: string) => void;

  calendar?: CalendarType;
  placeholder?: string;

  /**
   * فقط برای نمایش داخل دکمه
   * روی خروجی callback اثری ندارد
   */
  displayFormat?: DisplayFormat;

  disabled?: boolean;
  className?: string;

  minDate?: Date;
  maxDate?: Date;

  closeOnSelect?: boolean;
};

function clampDate(d: Date, min?: Date, max?: Date) {
  const t = d.getTime();
  if (min && t < min.getTime()) return min;
  if (max && t > max.getTime()) return max;
  return d;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function toEnglishDigits(input: string) {
  const fa = "۰۱۲۳۴۵۶۷۸۹";
  const ar = "٠١٢٣٤٥٦٧٨٩";

  return input.replace(/[۰-۹٠-٩]/g, (ch) => {
    const faIndex = fa.indexOf(ch);
    if (faIndex !== -1) return String(faIndex);

    const arIndex = ar.indexOf(ch);
    if (arIndex !== -1) return String(arIndex);

    return ch;
  });
}

function joinYMD(y: string, m: string, d: string, format: DisplayFormat) {
  const sep = format === "YYYY-MM-DD" ? "-" : "/";
  return `${y}${sep}${m}${sep}${d}`;
}

function formatDisplayValue(
  date: Date | null,
  calendar: CalendarType,
  format: DisplayFormat
) {
  if (!date) return "";

  if (calendar === "gregorian") {
    const y = String(date.getFullYear()).padStart(4, "0");
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return joinYMD(y, m, d, format);
  }

  const dtf = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const parts = dtf.formatToParts(date);

  const y = parts.find((p) => p.type === "year")?.value ?? "";
  const m = parts.find((p) => p.type === "month")?.value ?? "";
  const d = parts.find((p) => p.type === "day")?.value ?? "";

  const yy = toEnglishDigits(y).padStart(4, "0");
  const mm = toEnglishDigits(m).padStart(2, "0");
  const dd = toEnglishDigits(d).padStart(2, "0");

  return joinYMD(yy, mm, dd, format);
}

function getWeekdayLabels(calendar: CalendarType) {
  if (calendar === "jalali") return ["ش", "ی", "د", "س", "چ", "پ", "ج"];
  return ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
}

function getMonthTitle(date: Date, calendar: CalendarType) {
  if (calendar === "gregorian") {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
    }).format(date);
  }

  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    year: "numeric",
    month: "long",
  }).format(date);
}

function buildMonthGrid(viewDate: Date, calendar: CalendarType) {
  const weekStart = calendar === "jalali" ? 6 : 0;

  let firstOfMonth: Date;
  let lastOfMonth: Date;

  if (calendar === "gregorian") {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    firstOfMonth = new Date(year, month, 1);
    lastOfMonth = new Date(year, month + 1, 0);
  } else {
    // مرزهای ماه را بر اساس ماه شمسی می‌گیریم
    firstOfMonth = findPersianMonthStart(viewDate);
    // آخر ماه = روز قبل از شروع ماه بعد
    const startNextMonth = findPersianMonthStart(addDays(firstOfMonth, 35)); // 35 روز جلو = قطعاً داخل ماه بعد
    lastOfMonth = addDays(startNextMonth, -1);
  }

  const firstDayIndex = firstOfMonth.getDay();
  const leading = (firstDayIndex - weekStart + 7) % 7;

  const days: Array<{ date: Date; inMonth: boolean }> = [];

  // روزهای ماه قبل (نمایشی)
  for (let i = leading; i > 0; i--) {
    days.push({ date: addDays(firstOfMonth, -i), inMonth: false });
  }

  // روزهای همین ماه
  const totalDays =
    Math.round((startOfDay(lastOfMonth).getTime() - startOfDay(firstOfMonth).getTime()) / 86400000) + 1;

  for (let i = 0; i < totalDays; i++) {
    days.push({ date: addDays(firstOfMonth, i), inMonth: true });
  }

  // پر کردن تا 6 هفته
  while (days.length < 42) {
    const last = days[days.length - 1]!.date;
    days.push({ date: addDays(last, 1), inMonth: false });
  }

  return days;
}


function isDisabledDay(d: Date, minDate?: Date, maxDate?: Date) {
  const t = startOfDay(d).getTime();
  if (minDate && t < startOfDay(minDate).getTime()) return true;
  if (maxDate && t > startOfDay(maxDate).getTime()) return true;
  return false;
}

/* Icons */
function IconChevronLeft(props: { className?: string }) {
  return (
    <svg className={clsx("h-5 w-5", props.className)} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M15 6l-6 6 6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconChevronRight(props: { className?: string }) {
  return (
    <svg className={clsx("h-5 w-5", props.className)} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconDoubleLeft(props: { className?: string }) {
  return (
    <svg className={clsx("h-5 w-5", props.className)} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M18 6l-6 6 6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 6l-6 6 6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconDoubleRight(props: { className?: string }) {
  return (
    <svg className={clsx("h-5 w-5", props.className)} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function getPersianParts(date: Date) {
  const dtf = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const parts = dtf.formatToParts(date);

  const y = Number(toEnglishDigits(parts.find(p => p.type === "year")?.value ?? "0"));
  const m = Number(toEnglishDigits(parts.find(p => p.type === "month")?.value ?? "0"));
  const d = Number(toEnglishDigits(parts.find(p => p.type === "day")?.value ?? "0"));

  return { jy: y, jm: m, jd: d };
}

function addDays(base: Date, delta: number) {
  const d = new Date(base);
  d.setDate(d.getDate() + delta);
  return d;
}

/**
 * پیدا کردن Date متناظر با روز 1 ماه شمسیِ همان ماهی که anchor داخل آن است
 * (با جستجوی رو به عقب حداکثر 40 روز)
 */
function findPersianMonthStart(anchor: Date) {
  const a = startOfDay(anchor);
  const { jy, jm } = getPersianParts(a);

  // می‌ریم عقب تا برسیم به jd=1 در همین jy/jm
  for (let i = 0; i <= 40; i++) {
    const cur = addDays(a, -i);
    const p = getPersianParts(cur);
    if (p.jy === jy && p.jm === jm && p.jd === 1) return cur;
  }

  // fallback (خیلی بعیده)
  return new Date(a.getFullYear(), a.getMonth(), 1);
}


export function DatePicker({
  value,
  onChange,
  onChangeFormatted,
  calendar = "gregorian",
  placeholder = "Select date",
  displayFormat = "YYYY/MM/DD",
  disabled = false,
  className,
  minDate,
  maxDate,
  closeOnSelect = true,
}: DatePickerProps) {
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [viewDate, setViewDate] = useState<Date>(() =>
    clampDate(value ?? new Date(), minDate, maxDate)
  );

  const isRTL = calendar === "jalali";

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      const trig = triggerRef.current;
      const panel = panelRef.current;
      if (!trig || !panel) return;
      if (trig.contains(t) || panel.contains(t)) return;
      setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open]);

  useEffect(() => {
    if (value) setViewDate(clampDate(value, minDate, maxDate));
  }, [value, minDate, maxDate]);

  const rect = triggerRef.current?.getBoundingClientRect();

  const panelStyle = rect
    ? ({
      position: "fixed",
      top: rect.bottom + 8,
      left: rect.left,
      width: rect.width,
      zIndex: 9999,
    } as const)
    : undefined;

  const days = useMemo(() => buildMonthGrid(viewDate, calendar), [viewDate, calendar]);
  const weekdayLabels = useMemo(() => getWeekdayLabels(calendar), [calendar]);

  // فقط برای نمایش داخل دکمه
  const displayValue = formatDisplayValue(value, calendar, displayFormat);

  const goPrevMonth = () => {
    if (calendar === "gregorian") {
      const d = new Date(viewDate);
      d.setMonth(d.getMonth() - 1);
      setViewDate(clampDate(d, minDate, maxDate));
      return;
    }

    const start = findPersianMonthStart(viewDate);
    setViewDate(clampDate(addDays(start, -1), minDate, maxDate)); // یک روز قبل => داخل ماه قبل
  };

  const goNextMonth = () => {
    if (calendar === "gregorian") {
      const d = new Date(viewDate);
      d.setMonth(d.getMonth() + 1);
      setViewDate(clampDate(d, minDate, maxDate));
      return;
    }

    const start = findPersianMonthStart(viewDate);
    setViewDate(clampDate(addDays(start, 35), minDate, maxDate)); // 35 روز جلو => داخل ماه بعد
  };

  const goPrevYear = () => {
    if (calendar === "gregorian") {
      const d = new Date(viewDate);
      d.setFullYear(d.getFullYear() - 1);
      setViewDate(clampDate(d, minDate, maxDate));
      return;
    }

    // شمسی: حدوداً 365 روز عقب
    setViewDate(clampDate(addDays(viewDate, -366), minDate, maxDate));
  };

  const goNextYear = () => {
    if (calendar === "gregorian") {
      const d = new Date(viewDate);
      d.setFullYear(d.getFullYear() + 1);
      setViewDate(clampDate(d, minDate, maxDate));
      return;
    }

    setViewDate(clampDate(addDays(viewDate, 366), minDate, maxDate));
  };

  const onPick = (d: Date) => {
    const picked = clampDate(startOfDay(d), minDate, maxDate);
    if (isDisabledDay(picked, minDate, maxDate)) return;

    onChange(picked);

    // خروجی نهایی همیشه ISO
    onChangeFormatted?.(picked.toISOString());

    if (closeOnSelect) setOpen(false);
  };

  const leftGroup = isRTL
    ? [
      { key: "nextYear", onClick: goPrevYear, icon: <IconDoubleRight /> },
      { key: "nextMonth", onClick: goPrevMonth, icon: <IconChevronRight /> },
    ]
    : [
      { key: "prevYear", onClick: goPrevYear, icon: <IconDoubleLeft /> },
      { key: "prevMonth", onClick: goPrevMonth, icon: <IconChevronLeft /> },
    ];

  const rightGroup = isRTL
    ? [
      { key: "prevMonth", onClick: goNextMonth, icon: <IconChevronLeft /> },
      { key: "prevYear", onClick: goNextYear, icon: <IconDoubleLeft /> },
    ]
    : [
      { key: "nextMonth", onClick: goNextMonth, icon: <IconChevronRight /> },
      { key: "nextYear", onClick: goNextYear, icon: <IconDoubleRight /> },
    ];

  const navLikeSquareBtn =
    "shrink-0 h-10 w-10 rounded-xl border border-boxBorderColor dark:border-boxBorderColor-dark " +
    "bg-white/70 dark:bg-bgColor-dark/60 hover:bg-gray-100 dark:hover:bg-gray-900 " +
    "transition flex items-center justify-center text-titleText dark:text-titleText-dark lux-btn";

  const dayBtnBase =
    "h-10 rounded-xl text-sm box-border flex items-center justify-center select-none " +
    "transition text-titleText dark:text-titleText-dark lux-btn";

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={() => {
          if (disabled) return;
          setOpen((prev) => !prev);
        }}
        className={[
          "lux-btn w-full h-12 px-4",
          "flex items-center justify-between gap-3",
          "rounded-xl",
          "transition-all duration-200",
          "text-titleText",
          open ? "ring-2 ring-primary/20" : "",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
          className ?? "",
        ].join(" ")}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className={clsx("min-w-0 truncate", !displayValue && "text-mutedText")}>
          {displayValue || placeholder}
        </span>

        <svg
          className={clsx("h-5 w-5 shrink-0 transition-transform", open && "rotate-180")}
          viewBox="0 0 24 24"
          fill="none"
          style={{ transformOrigin: "center" }}
          aria-hidden="true"
        >
          <path
            d="M7 10l5 5 5-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && mounted
        ? createPortal(
          <div
            ref={panelRef}
            className={clsx(
              "rounded-2xl border lux-calendar backdrop-blur",
              "text-titleText dark:text-titleText-dark",
              "shadow-lg",
              "p-3"
            )}
            style={panelStyle}
            dir={isRTL ? "rtl" : "ltr"}
            role="dialog"
            aria-label="Date picker"
          >
            <div className="flex items-center justify-between gap-2 px-1 pb-2">
              <div className="flex items-center gap-2">
                {leftGroup.map((b) => (
                  <button
                    key={b.key}
                    type="button"
                    onClick={b.onClick}
                    className={navLikeSquareBtn}
                    aria-label={b.key}
                  >
                    {b.icon}
                  </button>
                ))}
              </div>

              <div className="flex-1 text-center">
                <div className="text-sm font-semibold leading-5">
                  {getMonthTitle(viewDate, calendar)}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {rightGroup.map((b) => (
                  <button
                    key={b.key}
                    type="button"
                    onClick={b.onClick}
                    className={navLikeSquareBtn}
                    aria-label={b.key}
                  >
                    {b.icon}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 px-1 pb-1">
              {weekdayLabels.map((w) => (
                <div
                  key={w}
                  className="py-1 text-center text-[11px] font-medium text-mutedText select-none"
                >
                  {w}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 px-1">
              {days.map(({ date, inMonth }, idx) => {
                const selected = value ? isSameDay(date, value) : false;
                const today = isSameDay(date, new Date());

                const isOutsideMonth = !inMonth;
                const isDayDisabled =
                  isOutsideMonth || isDisabledDay(date, minDate, maxDate);

                const dayLabel =
                  calendar === "gregorian"
                    ? String(date.getDate())
                    : new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
                      day: "numeric",
                    }).format(date);

                return (
                  <button
                    key={`${date.toISOString()}-${idx}`}
                    type="button"
                    disabled={isDayDisabled}
                    onClick={() => {
                      if (isDayDisabled) return;
                      onPick(date);
                    }}
                    className={clsx(
                      dayBtnBase,

                      !selected &&
                      !isDayDisabled &&
                      "hover:bg-gray-100 dark:hover:bg-gray-900",

                      selected && "bg-primary/20 dark:bg-gray-600",

                      today &&
                      !selected &&
                      !isDayDisabled &&
                      "ring-1 ring-black/10 dark:ring-white/10",

                      isOutsideMonth && "opacity-30 cursor-not-allowed",

                      isDayDisabled &&
                      !isOutsideMonth &&
                      "opacity-35 cursor-not-allowed"
                    )}
                    aria-pressed={selected}
                    aria-disabled={isDayDisabled}
                  >
                    {dayLabel}
                  </button>
                );
              })}
            </div>

          </div>,
          document.body
        )
        : null}
    </>
  );
}

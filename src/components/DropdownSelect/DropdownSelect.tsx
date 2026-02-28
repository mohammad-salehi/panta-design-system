"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

export type Option = {
  id?: string | number;
  label: string;
  value: string;
};

export type SearchableSelectProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];

  placeholder?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  allLabel?: string;
  loading?: boolean;

  direction?: "rtl" | "ltr";
  className?: string;
  disabled?: boolean;
};

export function SearchableSelect({
  label,
  value,
  onChange,
  options,
  placeholder = "انتخاب کنید...",
  searchable = false,
  searchPlaceholder = "جستجو...",
  allLabel,
  loading = false,
  direction = "rtl",
  className = "",
  disabled = false,
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [q, setQ] = useState("");
  const [coords, setCoords] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const normalizedOptions = useMemo(() => {
    const base = options ?? [];
    if (!allLabel) return base;
    return [{ id: "__all__", label: allLabel, value: "" }, ...base];
  }, [options, allLabel]);

  const selectedOption = useMemo(() => {
    return normalizedOptions.find((o) => o.value === value);
  }, [normalizedOptions, value]);

  const filteredOptions = useMemo(() => {
    if (!searchable) return normalizedOptions;

    const query = q.trim().toLowerCase();
    if (!query) return normalizedOptions;

    return normalizedOptions.filter((item) =>
      item.label.toLowerCase().includes(query)
    );
  }, [normalizedOptions, searchable, q]);

  const updatePosition = useCallback(() => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;

    const viewportHeight = window.innerHeight;
    const estimatedDropdownHeight = searchable ? 320 : 260;
    const spaceBelow = viewportHeight - rect.bottom;
    const shouldOpenUp =
      spaceBelow < estimatedDropdownHeight && rect.top > estimatedDropdownHeight;

    const top = shouldOpenUp
      ? rect.top + window.scrollY - estimatedDropdownHeight - 8
      : rect.bottom + window.scrollY + 8;

    setCoords({
      top,
      left: rect.left + window.scrollX,
      width: rect.width,
    });
  }, [searchable]);

  useEffect(() => {
    if (!open) return;

    updatePosition();

    const handleScroll = () => updatePosition();
    const handleResize = () => updatePosition();

    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
    };
  }, [open, updatePosition]);

  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Node)) return;

      const clickedButton = buttonRef.current?.contains(target);
      const clickedDropdown = dropdownRef.current?.contains(target);

      if (!clickedButton && !clickedDropdown) {
        setOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  useEffect(() => {
    if (open && searchable) {
      const t = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 40);

      return () => clearTimeout(t);
    }
  }, [open, searchable]);

  const handleSelect = (nextValue: string) => {
    onChange(nextValue);
    setOpen(false);
    setQ("");
  };

  const triggerText = selectedOption?.label || placeholder;

  return (
    <div className={`w-full ${className}`} dir={direction}>
      {label ? (
        <label className="mb-2 block text-sm font-medium text-titleText">
          {label}
        </label>
      ) : null}

      <button
        ref={buttonRef}
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
        ].join(" ")}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span
          className={[
            "truncate text-sm font-medium",
            selectedOption ? "text-titleText" : "lux-text",
          ].join(" ")}
        >
          {triggerText}
        </span>

        <span
          className={[
            "shrink-0 text-xs text-titleText opacity-70 transition-transform duration-200",
            open ? "rotate-180" : "",
          ].join(" ")}
        >
          ▾
        </span>
      </button>

      {mounted && open
        ? createPortal(
            <div
              ref={dropdownRef}
              dir={direction}
              style={{
                position: "absolute",
                top: coords.top,
                left: coords.left,
                width: coords.width,
                zIndex: 999999,
              }}
              className={[
                "lux-menu",
                'bg-boxColor',
                "animate-fadeScale",
                "overflow-hidden",
                "rounded-2xl",
              ].join(" ")}
            >
              {searchable ? (
                <div className="p-2 pb-1">
                  <div className="lux-btn flex w-full items-center gap-2 rounded-xl px-3 py-2.5">
                    <svg
                      className="h-4 w-4 shrink-0 text-titleText opacity-50"
                      viewBox="0 0 20 20"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M14.1667 14.1667L18 18M16.3333 9.16667C16.3333 13.1247 13.1247 16.3333 9.16667 16.3333C5.20863 16.3333 2 13.1247 2 9.16667C2 5.20863 5.20863 2 9.16667 2C13.1247 2 16.3333 5.20863 16.3333 9.16667Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <input
                      ref={searchInputRef}
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      placeholder={searchPlaceholder}
                      className="w-full bg-transparent text-sm text-titleText outline-none placeholder:opacity-50 border-none"
                    />
                  </div>
                </div>
              ) : null}

              <div className="max-h-72 overflow-y-auto px-2 pb-2 pt-1">
                {loading ? (
                  <div className="px-3 py-4 text-center text-sm lux-text">
                    در حال بارگذاری...
                  </div>
                ) : filteredOptions.length === 0 ? (
                  <div className="px-3 py-4 text-center text-sm lux-text">
                    موردی یافت نشد
                  </div>
                ) : (
                  filteredOptions.map((opt) => {
                    const active = opt.value === value;

                    return (
                      <button
                        key={String(opt.id ?? opt.value)}
                        type="button"
                        onClick={() => handleSelect(opt.value)}
                        className={[
                          "group flex w-full items-center justify-between gap-3 rounded-xl px-3 py-3 text-right text-sm",
                          "cursor-pointer transition-colors duration-150 border-none text-titleText",
                          active
                            ? "button_selected_bg"
                            : "bg-none hover:bg-primary/10 dark:hover:bg-white/5 ",
                        ].join(" ")}
                      >
                        <span className="truncate font-medium">{opt.label}</span>

                        <span
                          className={[
                            "text-xs transition-opacity",
                            active
                              ? "text-primary opacity-100"
                              : "text-titleText opacity-0 group-hover:opacity-60",
                          ].join(" ")}
                        >
                          ✓
                        </span>
                      </button>
                    );
                  })
                )}
              </div>
            </div>,
            document.body
          )
        : null}
    </div>
  );
}

"use client";


// src/components/Button/Button.tsx
import React from "react";
import { jsx } from "react/jsx-runtime";
var sizeClasses = {
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg"
};
var variantClasses = {
  primary: `
    bg-gradient-to-r from-blue-grad-start to-blue-grad-end
    dark:from-blue-grad-start dark:to-blue-grad-end
    text-white border-none
  `,
  danger: `
    bg-gradient-to-r from-red-grad-start to-red-grad-end
    dark:from-red-700 dark:to-red-900
    text-white border-none
  `,
  warning: `
    bg-gradient-to-r from-yellow-grad-start to-yellow-grad-end
    dark:from-yellow-700 dark:to-yellow-900
    text-slate-900 dark:text-white border-none
  `
};
var Button = React.forwardRef(
  ({ variant = "primary", size = "md", className, children, ...rest }, ref) => {
    const baseStyle = `
      inline-flex items-center justify-center
      py-2 px-3 text-sm font-medium rounded-xl
      transition-all duration-200
      focus:outline-none 
      shadow-md
      cursor-pointer
      hover:opacity-90
      disabled:opacity-50 disabled:cursor-not-allowed
      border-transparent
    `;
    const variantClass = variantClasses[variant];
    const sizeClass = sizeClasses[size];
    return /* @__PURE__ */ jsx(
      "button",
      {
        ref,
        className: `${baseStyle} ${variantClass} ${sizeClass} ${className || ""}`,
        ...rest,
        children
      }
    );
  }
);
Button.displayName = "Button";

// src/components/ThemeProvider/ThemeProvider.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
var ThemeContext = createContext(void 0);
var ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored ?? (prefersDark ? "dark" : "light");
    setTheme(initial);
    if (initial === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);
  const handleSetTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
    }
  };
  return /* @__PURE__ */ jsx2(ThemeContext.Provider, { value: { theme, setTheme: handleSetTheme }, children });
};
var useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};

// src/components/Header/Header.tsx
import { useEffect as useEffect2, useLayoutEffect, useRef, useState as useState2 } from "react";
import { jsx as jsx3, jsxs } from "react/jsx-runtime";
function Header({ title = "\u0633\u0627\u0645\u0627\u0646\u0647 \u0646\u0638\u0627\u0631\u062A \u0628\u0631 \u06A9\u0627\u0631\u06AF\u0632\u0627\u0631\u06CC\u200C\u0647\u0627\u06CC \u0645\u0628\u0627\u062F\u0644\u0647 \u0631\u0645\u0632\u0627\u0631\u0632 \u0627\u06CC\u0631\u0627\u0646" }) {
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === "dark";
  const [isOpen, setIsOpen] = useState2(true);
  const [isMobileOpen, setIsMobileOpen] = useState2(false);
  const [profileOpen, setProfileOpen] = useState2(false);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const [menuPos, setMenuPos] = useState2({ top: 0, right: 0, width: 240 });
  const toggleDarkMode = () => setTheme(isDarkMode ? "light" : "dark");
  const closeSidebar = () => setIsMobileOpen(false);
  const updateMenuPosition = () => {
    const el = triggerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setMenuPos({
      top: r.bottom + 8,
      right: Math.max(8, window.innerWidth - r.right),
      width: Math.max(220, Math.min(320, r.width + 60))
    });
  };
  useLayoutEffect(() => {
    if (profileOpen) updateMenuPosition();
  }, [profileOpen]);
  useEffect2(() => {
    if (!profileOpen) return;
    const onPointerDown = (e) => {
      const t = e.target;
      if (menuRef.current?.contains(t) || triggerRef.current?.contains(t)) return;
      setProfileOpen(false);
    };
    const onKeyDown = (e) => e.key === "Escape" && setProfileOpen(false);
    const onResize = () => updateMenuPosition();
    document.addEventListener("mousedown", onPointerDown, true);
    document.addEventListener("touchstart", onPointerDown, true);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onResize, true);
    return () => {
      document.removeEventListener("mousedown", onPointerDown, true);
      document.removeEventListener("touchstart", onPointerDown, true);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onResize, true);
    };
  }, [profileOpen]);
  return /* @__PURE__ */ jsxs(
    "header",
    {
      className: "mx-8 h-18 flex items-stretch justify-between shadow-sm px-6 lux-panel rounded-t-none",
      children: [
        isMobileOpen && /* @__PURE__ */ jsx3(
          "div",
          {
            className: "fixed top-0 left-0 right-0 bottom-0 bg-gray-500 opacity-50 z-40",
            onClick: closeSidebar
          }
        ),
        /* @__PURE__ */ jsx3("div", { className: "flex items-center gap-5", children: isOpen ? /* @__PURE__ */ jsx3("div", { className: "relative flex items-center gap-1 lux-text font-bold", children: title }) : /* @__PURE__ */ jsx3("div", { className: "text-titleText dark:text-titleText-dark", children: /* @__PURE__ */ jsx3(
          "svg",
          {
            className: "cursor-pointer",
            width: "28px",
            height: "28px",
            viewBox: "0 0 24 24",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            onClick: () => setIsMobileOpen(true),
            children: /* @__PURE__ */ jsx3(
              "path",
              {
                d: "M4 6H20M4 12H20M4 18H20",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round"
              }
            )
          }
        ) }) }),
        /* @__PURE__ */ jsx3("div", { className: "flex items-center p-4 pl-0", children: isOpen ? /* @__PURE__ */ jsx3(
          "button",
          {
            className: "flex items-center justify-center transition ml-2 h-9 w-9 lux-btn",
            onClick: toggleDarkMode,
            children: isDarkMode ? /* @__PURE__ */ jsx3("svg", { width: "20px", height: "20px", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx3(
              "path",
              {
                d: "M21.0672 11.8568L20.4253 11.469L21.0672 11.8568ZM12.1432 2.93276L11.7553 2.29085V2.29085L12.1432 2.93276ZM7.37554 20.013C7.017 19.8056 6.5582 19.9281 6.3508 20.2866C6.14339 20.6452 6.26591 21.104 6.62446 21.3114L7.37554 20.013ZM2.68862 17.3755C2.89602 17.7341 3.35482 17.8566 3.71337 17.6492C4.07191 17.4418 4.19443 16.983 3.98703 16.6245L2.68862 17.3755ZM21.25 12C21.25 17.1086 17.1086 21.25 12 21.25V22.75C17.9371 22.75 22.75 17.9371 22.75 12H21.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75V1.25C6.06294 1.25 1.25 6.06294 1.25 12H2.75ZM15.5 14.25C12.3244 14.25 9.75 11.6756 9.75 8.5H8.25C8.25 12.5041 11.4959 15.75 15.5 15.75V14.25ZM20.4253 11.469C19.4172 13.1373 17.5882 14.25 15.5 14.25V15.75C18.1349 15.75 20.4407 14.3439 21.7092 12.2447L20.4253 11.469ZM9.75 8.5C9.75 6.41182 10.8627 4.5828 12.531 3.57467L11.7553 2.29085C9.65609 3.5593 8.25 5.86509 8.25 8.5H9.75ZM12 2.75C11.9115 2.75 11.8077 2.71008 11.7324 2.63168C11.6686 2.56527 11.6538 2.50244 11.6503 2.47703C11.6461 2.44587 11.6482 2.35557 11.7553 2.29085L12.531 3.57467C13.0342 3.27065 13.196 2.71398 13.1368 2.27627C13.0754 1.82126 12.7166 1.25 12 1.25V2.75ZM21.7092 12.2447C21.6444 12.3518 21.5541 12.3539 21.523 12.3497C21.4976 12.3462 21.4347 12.3314 21.3683 12.2676C21.2899 12.1923 21.25 12.0885 21.25 12H22.75C22.75 11.2834 22.1787 10.9246 21.7237 10.8632C21.286 10.804 20.7293 10.9658 20.4253 11.469L21.7092 12.2447ZM12 21.25C10.3139 21.25 8.73533 20.7996 7.37554 20.013L6.62446 21.3114C8.2064 22.2265 10.0432 22.75 12 22.75V21.25ZM3.98703 16.6245C3.20043 15.2647 2.75 13.6861 2.75 12H1.25C1.25 13.9568 1.77351 15.7936 2.68862 17.3755L3.98703 16.6245Z",
                stroke: "currentColor",
                strokeWidth: "1.5",
                strokeLinecap: "round",
                strokeLinejoin: "round"
              }
            ) }) : /* @__PURE__ */ jsx3("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ jsx3(
              "path",
              {
                d: "M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.05 17.95l-1.414 1.414m0-13.828l1.414 1.414M17.95 17.95l1.414 1.414M12 8a4 4 0 100 8 4 4 0 000-8z",
                stroke: "currentColor",
                strokeWidth: "1.5",
                strokeLinecap: "round",
                strokeLinejoin: "round"
              }
            ) })
          }
        ) : null })
      ]
    }
  );
}
export {
  Button,
  Header,
  ThemeProvider,
  useTheme
};
//# sourceMappingURL=index.mjs.map
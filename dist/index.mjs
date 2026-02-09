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
      className: "hidden lg:flex mx-8 h-18 items-stretch justify-between shadow-sm px-6 lux-panel rounded-t-none",
      children: [
        isMobileOpen && /* @__PURE__ */ jsx3(
          "div",
          {
            className: "fixed top-0 left-0 right-0 bottom-0 bg-gray-500 opacity-50 z-40",
            onClick: closeSidebar
          }
        ),
        /* @__PURE__ */ jsx3("div", { className: "flex items-center gap-5", children: isOpen ? /* @__PURE__ */ jsx3("div", { className: "relative flex items-center gap-1 text-titleText dark:text-titleText-dark font-bold", children: title }) : /* @__PURE__ */ jsx3("div", { className: "text-titleText dark:text-titleText-dark", children: /* @__PURE__ */ jsx3(
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

// src/components/Navbar/Navbar.tsx
import React4, { useRef as useRef2 } from "react";
import clsx from "clsx";

// src/components/AnimatedHeadingText/AnimatedHeadingText.tsx
import { useEffect as useEffect3, useMemo, useState as useState3 } from "react";
import { jsx as jsx4 } from "react/jsx-runtime";
function AnimatedParagraph({
  text
}) {
  const chars = useMemo(() => Array.from(text), [text]);
  const animatableIndexes = useMemo(
    () => chars.map((c, i) => c === " " ? null : i).filter((x) => x !== null),
    [chars]
  );
  const [step, setStep] = useState3(0);
  useEffect3(() => {
    if (!animatableIndexes.length) return;
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % animatableIndexes.length);
    }, 300);
    return () => clearInterval(interval);
  }, [animatableIndexes.length]);
  const activeIndex = animatableIndexes[step] ?? -1;
  return /* @__PURE__ */ jsx4("p", { className: "text-3xl font-bold m-0 text-titleText dark:text-titleText-dark text-center w-full", children: chars.map((ch, i) => {
    if (ch === " ") return /* @__PURE__ */ jsx4("span", { children: "\xA0" }, i);
    const isActive = i === activeIndex;
    return /* @__PURE__ */ jsx4(
      "span",
      {
        className: `transition-all duration-500 ease-in-out ${isActive ? "opacity-100 text-[deepskyblue]" : "opacity-80 text-titleText dark:text-titleText-dark"}`,
        children: ch
      },
      i
    );
  }) });
}

// src/components/Navbar/Navbar.tsx
import { jsx as jsx5, jsxs as jsxs2 } from "react/jsx-runtime";
var Navbar = ({
  navItems,
  isOpen,
  setIsOpen,
  isMobileOpen,
  setIsMobileOpen,
  userFullName = "\u06A9\u0627\u0631\u0628\u0631",
  userRole = "",
  onChangePassword,
  onLogout,
  brand,
  className,
  currentPath
}) => {
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === "dark";
  const asideRef = useRef2(null);
  const mobileSidebarRef = useRef2(null);
  const toggleTheme = () => setTheme(isDarkMode ? "light" : "dark");
  React4.useEffect(() => {
    if (!isMobileOpen) return;
    const handleClickOutside = (e) => {
      const target = e.target;
      if (asideRef.current && asideRef.current.contains(target) || mobileSidebarRef.current && mobileSidebarRef.current.contains(target)) {
        return;
      }
      setIsMobileOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMobileOpen, setIsMobileOpen]);
  React4.useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);
  return /* @__PURE__ */ jsxs2("div", { children: [
    /* @__PURE__ */ jsx5("div", { children: /* @__PURE__ */ jsxs2(
      "aside",
      {
        ref: mobileSidebarRef,
        className: clsx(
          "absolute top-0 right-0 h-full w-[85vw] max-w-[320px]  flex flex-col overflow-y-auto transition-transform duration-300 z-50 lux-panel rounded-none lux-panel shadow-none",
          isMobileOpen ? "translate-x-0" : "translate-x-full"
        ),
        children: [
          /* @__PURE__ */ jsx5("div", { className: "sticky top-0 z-10  rounded-none border-none", children: /* @__PURE__ */ jsxs2("div", { className: "p-3", children: [
            /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx5("div", { className: "flex items-center gap-2", children: brand ? brand : /* @__PURE__ */ jsx5("div", { className: "font-bold text-titleText", children: "\u0644\u0648\u06AF\u0648" }) }),
              /* @__PURE__ */ jsx5("div", { className: "text-left ml-2", children: /* @__PURE__ */ jsx5(AnimatedParagraph, { text: "P.D.S" }) })
            ] }),
            /* @__PURE__ */ jsx5("div", { className: "mt-3 rounded-2xl border border-boxBorderColor bg-boxColor/70 p-3 lux-icon", children: /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx5("div", { className: "h-10 w-10 rounded-xl border-boxBorderColor dark:border-boxBorderColor-dark bg-white/70 dark:bg-bgColor-dark/60  transition flex items-center justify-center text-titleText dark:text-titleText-dark lux-icon", children: /* @__PURE__ */ jsx5("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ jsx5(
                "path",
                {
                  d: "M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round"
                }
              ) }) }),
              /* @__PURE__ */ jsxs2("div", { className: "min-w-0 flex-1", dir: "ltr", children: [
                /* @__PURE__ */ jsx5("div", { className: "text-sm font-semibold truncate lux-text", children: userFullName }),
                /* @__PURE__ */ jsx5("div", { className: "text-[11px] text-gray-500 truncate lux-text", children: userRole })
              ] }),
              onChangePassword && /* @__PURE__ */ jsx5(
                "button",
                {
                  onClick: onChangePassword,
                  className: "shrink-0 h-10 w-10 rounded-xl border border-boxBorderColor dark:border-boxBorderColor-dark bg-white/70 dark:bg-bgColor-dark/60 hover:bg-gray-100 dark:hover:bg-gray-900 transition flex items-center justify-center text-titleText dark:text-titleText-dark lux-btn",
                  children: /* @__PURE__ */ jsxs2("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", children: [
                    /* @__PURE__ */ jsx5(
                      "path",
                      {
                        d: "M10.6887 11.9999C10.6887 13.0229 9.85974 13.8519 8.83674 13.8519C7.81374 13.8519 6.98474 13.0229 6.98474 11.9999C6.98474 10.9769 7.81374 10.1479 8.83674 10.1479H8.83974C9.86174 10.1489 10.6887 10.9779 10.6887 11.9999Z",
                        stroke: "currentColor",
                        strokeWidth: "1.5"
                      }
                    ),
                    /* @__PURE__ */ jsx5(
                      "path",
                      {
                        d: "M10.6918 12H17.0098V13.852",
                        stroke: "currentColor",
                        strokeWidth: "1.5"
                      }
                    ),
                    /* @__PURE__ */ jsx5(
                      "path",
                      {
                        d: "M14.182 13.852V12",
                        stroke: "currentColor",
                        strokeWidth: "1.5"
                      }
                    ),
                    /* @__PURE__ */ jsx5(
                      "path",
                      {
                        d: "M2.74988 12C2.74988 5.063 5.06288 2.75 11.9999 2.75C18.9369 2.75 21.2499 5.063 21.2499 12C21.2499 18.937 18.9369 21.25 11.9999 21.25C5.06288 21.25 2.74988 18.937 2.74988 12Z",
                        stroke: "currentColor",
                        strokeWidth: "1.5"
                      }
                    )
                  ] })
                }
              )
            ] }) })
          ] }) }),
          /* @__PURE__ */ jsx5("nav", { className: "px-3 pt-4 space-y-2 overflow-y-auto flex-1 min-h-0", children: navItems.map((item) => {
            if (item.access && item.access !== userRole) return null;
            const isActive = currentPath === item.link;
            return /* @__PURE__ */ jsx5(
              "a",
              {
                href: item.link,
                style: { display: "block", textDecoration: "none", color: "inherit" },
                children: /* @__PURE__ */ jsxs2(
                  "button",
                  {
                    type: "button",
                    className: clsx(
                      "w-full flex items-center justify-between gap-1 px-1 py-1 rounded-xl transition lux-icon cursor-pointer",
                      isActive ? "bg-primary/20 dark:bg-gray-600" : "hover:bg-primary/10 dark:hover:bg-gray-800/50"
                    ),
                    children: [
                      /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-4 min-w-0", children: [
                        /* @__PURE__ */ jsx5(
                          "span",
                          {
                            className: clsx(
                              "h-8 w-8 rounded-xl flex items-center justify-center border shrink-0 lux-icon p-1 ",
                              isActive ? "text-primary" : "text-titleText border-boxBorderColor"
                            ),
                            children: item.icon
                          }
                        ),
                        /* @__PURE__ */ jsx5(
                          "span",
                          {
                            className: "text-sm font-medium text-right leading-5 min-w-0 break-words lux-text",
                            dir: "rtl",
                            children: item.label
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsx5(
                        "svg",
                        {
                          width: "18",
                          height: "18",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          className: clsx(
                            "transition self-center shrink-0",
                            isActive ? "opacity-100" : "opacity-40"
                          ),
                          children: /* @__PURE__ */ jsx5(
                            "path",
                            {
                              d: "M15 18l-6-6 6-6",
                              stroke: "currentColor",
                              strokeWidth: "2",
                              strokeLinecap: "round",
                              strokeLinejoin: "round"
                            }
                          )
                        }
                      )
                    ]
                  }
                )
              },
              item.label
            );
          }) }),
          onLogout && /* @__PURE__ */ jsx5("div", { className: "p-3 mt-auto", children: /* @__PURE__ */ jsxs2(
            "button",
            {
              onClick: onLogout,
              className: "w-full flex items-center justify-center gap-2 rounded-2xl border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-950/60 transition py-3 lux-btn",
              children: [
                /* @__PURE__ */ jsx5("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ jsx5(
                  "path",
                  {
                    d: "M10 12H18M18 12L15.5 9.77778M18 12L15.5 14.2222M18 7.11111V5C18 4.44772 17.5523 4 17 4H7C6.44772 4 6 4.44772 6 5V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V16.8889",
                    stroke: "currentColor",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "2"
                  }
                ) }),
                /* @__PURE__ */ jsx5("span", { className: "text-sm font-semibold", children: "\u062E\u0631\u0648\u062C" })
              ]
            }
          ) })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx5("div", { className: "fixed top-0 left-0 right-0 z-40 lg:hidden", children: /* @__PURE__ */ jsx5("div", { className: "bg-boxColor/90 backdrop-blur border-b border-boxBorderColor lux-panel rounded-none", children: /* @__PURE__ */ jsxs2("div", { className: "h-14 px-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsx5(
        "button",
        {
          onClick: () => setIsMobileOpen(true),
          className: "h-10 w-10 transition flex items-center justify-center lux-btn",
          children: /* @__PURE__ */ jsx5("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ jsx5(
            "path",
            {
              d: "M4 6H20M4 12H20M4 18H20",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round"
            }
          ) })
        }
      ),
      /* @__PURE__ */ jsx5(
        "button",
        {
          className: "flex items-center justify-center transition h-10 w-10 lux-btn",
          onClick: toggleTheme,
          children: isDarkMode ? /* @__PURE__ */ jsx5(
            "svg",
            {
              width: "20px",
              height: "20px",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ jsx5(
                "path",
                {
                  d: "M21.0672 11.8568L20.4253 11.469L21.0672 11.8568ZM12.1432 2.93276L11.7553 2.29085V2.29085L12.1432 2.93276ZM7.37554 20.013C7.017 19.8056 6.5582 19.9281 6.3508 20.2866C6.14339 20.6452 6.26591 21.104 6.62446 21.3114L7.37554 20.013ZM2.68862 17.3755C2.89602 17.7341 3.35482 17.8566 3.71337 17.6492C4.07191 17.4418 4.19443 16.983 3.98703 16.6245L2.68862 17.3755ZM21.25 12C21.25 17.1086 17.1086 21.25 12 21.25V22.75C17.9371 22.75 22.75 17.9371 22.75 12H21.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75V1.25C6.06294 1.25 1.25 6.06294 1.25 12H2.75ZM15.5 14.25C12.3244 14.25 9.75 11.6756 9.75 8.5H8.25C8.25 12.5041 11.4959 15.75 15.5 15.75V14.25ZM20.4253 11.469C19.4172 13.1373 17.5882 14.25 15.5 14.25V15.75C18.1349 15.75 20.4407 14.3439 21.7092 12.2447L20.4253 11.469ZM9.75 8.5C9.75 6.41182 10.8627 4.5828 12.531 3.57467L11.7553 2.29085C9.65609 3.5593 8.25 5.86509 8.25 8.5H9.75ZM12 2.75C11.9115 2.75 11.8077 2.71008 11.7324 2.63168C11.6686 2.56527 11.6538 2.50244 11.6503 2.47703C11.6461 2.44587 11.6482 2.35557 11.7553 2.29085L12.531 3.57467C13.0342 3.27065 13.196 2.71398 13.1368 2.27627C13.0754 1.82126 12.7166 1.25 12 1.25V2.75ZM21.7092 12.2447C21.6444 12.3518 21.5541 12.3539 21.523 12.3497C21.4976 12.3462 21.4347 12.3314 21.3683 12.2676C21.2899 12.1923 21.25 12.0885 21.25 12H22.75C22.75 11.2834 22.1787 10.9246 21.7237 10.8632C21.286 10.804 20.7293 10.9658 20.4253 11.469L21.7092 12.2447ZM12 21.25C10.3139 21.25 8.73533 20.7996 7.37554 20.013L6.62446 21.3114C8.2064 22.2265 10.0432 22.75 12 22.75V21.25ZM3.98703 16.6245C3.20043 15.2647 2.75 13.6861 2.75 12H1.25C1.25 13.9568 1.77351 15.7936 2.68862 17.3755L3.98703 16.6245Z",
                  stroke: "currentColor",
                  strokeWidth: "1.5",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                }
              )
            }
          ) : /* @__PURE__ */ jsx5(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24",
              fill: "none",
              children: /* @__PURE__ */ jsx5(
                "path",
                {
                  d: "M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.05 17.95l-1.414 1.414m0-13.828l1.414 1.414M17.95 17.95l1.414 1.414M12 8a4 4 0 100 8 4 4 0 000-8z",
                  stroke: "currentColor",
                  strokeWidth: "1.5",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                }
              )
            }
          )
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxs2(
      "aside",
      {
        ref: asideRef,
        className: clsx(
          "hidden lg:flex flex-col fixed top-0 right-0 h-screen w-[82vw] max-w-[320px] lg:w-64 transition-transform duration-300 z-50 lux-panel rounded-none lux-panel shadow-none",
          {
            "translate-x-full lg:translate-x-0": !isOpen && !isMobileOpen,
            "translate-x-0": isOpen || isMobileOpen
          },
          className
        ),
        children: [
          /* @__PURE__ */ jsx5("div", { className: "sticky top-0 z-10  rounded-none border-none", children: /* @__PURE__ */ jsxs2("div", { className: "p-3", children: [
            /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx5("div", { className: "flex items-center gap-2", children: brand ? brand : /* @__PURE__ */ jsx5("div", { className: "font-bold text-titleText", children: "\u0644\u0648\u06AF\u0648" }) }),
              /* @__PURE__ */ jsx5(
                "button",
                {
                  onClick: () => setIsMobileOpen(false),
                  className: "lg:hidden h-10 w-10 border border-boxBorderColor bg-boxColor/70 hover:bg-gray-100 transition flex items-center justify-center text-titleText ",
                  children: /* @__PURE__ */ jsx5("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ jsx5(
                    "path",
                    {
                      d: "M6 6l12 12M18 6L6 18",
                      stroke: "currentColor",
                      strokeWidth: "2",
                      strokeLinecap: "round"
                    }
                  ) })
                }
              ),
              /* @__PURE__ */ jsx5("div", { className: "text-left ml-2", children: /* @__PURE__ */ jsx5(AnimatedParagraph, { text: "P.D.S" }) })
            ] }),
            /* @__PURE__ */ jsx5("div", { className: "mt-3 rounded-2xl border border-boxBorderColor bg-boxColor/70 p-3 lux-icon", children: /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx5("div", { className: "h-10 w-10 rounded-xl border-boxBorderColor dark:border-boxBorderColor-dark bg-white/70 dark:bg-bgColor-dark/60  transition flex items-center justify-center text-titleText dark:text-titleText-dark lux-icon", children: /* @__PURE__ */ jsx5("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ jsx5(
                "path",
                {
                  d: "M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round"
                }
              ) }) }),
              /* @__PURE__ */ jsxs2("div", { className: "min-w-0 flex-1", dir: "ltr", children: [
                /* @__PURE__ */ jsx5("div", { className: "text-sm font-semibold truncate lux-text", children: userFullName }),
                /* @__PURE__ */ jsx5("div", { className: "text-[11px] text-gray-500 truncate lux-text", children: userRole })
              ] }),
              onChangePassword && /* @__PURE__ */ jsx5(
                "button",
                {
                  onClick: onChangePassword,
                  className: "shrink-0 h-10 w-10 rounded-xl border border-boxBorderColor dark:border-boxBorderColor-dark bg-white/70 dark:bg-bgColor-dark/60 hover:bg-gray-100 dark:hover:bg-gray-900 transition flex items-center justify-center text-titleText dark:text-titleText-dark lux-btn",
                  children: /* @__PURE__ */ jsxs2("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", children: [
                    /* @__PURE__ */ jsx5(
                      "path",
                      {
                        d: "M10.6887 11.9999C10.6887 13.0229 9.85974 13.8519 8.83674 13.8519C7.81374 13.8519 6.98474 13.0229 6.98474 11.9999C6.98474 10.9769 7.81374 10.1479 8.83674 10.1479H8.83974C9.86174 10.1489 10.6887 10.9779 10.6887 11.9999Z",
                        stroke: "currentColor",
                        strokeWidth: "1.5"
                      }
                    ),
                    /* @__PURE__ */ jsx5(
                      "path",
                      {
                        d: "M10.6918 12H17.0098V13.852",
                        stroke: "currentColor",
                        strokeWidth: "1.5"
                      }
                    ),
                    /* @__PURE__ */ jsx5(
                      "path",
                      {
                        d: "M14.182 13.852V12",
                        stroke: "currentColor",
                        strokeWidth: "1.5"
                      }
                    ),
                    /* @__PURE__ */ jsx5(
                      "path",
                      {
                        d: "M2.74988 12C2.74988 5.063 5.06288 2.75 11.9999 2.75C18.9369 2.75 21.2499 5.063 21.2499 12C21.2499 18.937 18.9369 21.25 11.9999 21.25C5.06288 21.25 2.74988 18.937 2.74988 12Z",
                        stroke: "currentColor",
                        strokeWidth: "1.5"
                      }
                    )
                  ] })
                }
              )
            ] }) })
          ] }) }),
          /* @__PURE__ */ jsx5("nav", { className: "px-3 pt-4 space-y-2 overflow-y-auto flex-1 min-h-0", children: navItems.map((item) => {
            if (item.access && item.access !== userRole) return null;
            const isActive = currentPath === item.link;
            return /* @__PURE__ */ jsx5(
              "a",
              {
                href: item.link,
                style: { display: "block", textDecoration: "none", color: "inherit" },
                children: /* @__PURE__ */ jsxs2(
                  "button",
                  {
                    type: "button",
                    className: clsx(
                      "w-full flex items-center justify-between gap-1 px-1 py-1 rounded-xl transition lux-icon cursor-pointer",
                      isActive ? "bg-primary/20 dark:bg-gray-600" : "hover:bg-primary/10 dark:hover:bg-gray-800/50"
                    ),
                    children: [
                      /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-4 min-w-0", children: [
                        /* @__PURE__ */ jsx5(
                          "span",
                          {
                            className: clsx(
                              "h-8 w-8 rounded-xl flex items-center justify-center border shrink-0 lux-icon p-1 ",
                              isActive ? "text-primary" : "text-titleText border-boxBorderColor"
                            ),
                            children: item.icon
                          }
                        ),
                        /* @__PURE__ */ jsx5(
                          "span",
                          {
                            className: "text-sm font-medium text-right leading-5 min-w-0 break-words lux-text",
                            dir: "rtl",
                            children: item.label
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsx5(
                        "svg",
                        {
                          width: "18",
                          height: "18",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          className: clsx(
                            "transition self-center shrink-0",
                            isActive ? "opacity-100" : "opacity-40"
                          ),
                          children: /* @__PURE__ */ jsx5(
                            "path",
                            {
                              d: "M15 18l-6-6 6-6",
                              stroke: "currentColor",
                              strokeWidth: "2",
                              strokeLinecap: "round",
                              strokeLinejoin: "round"
                            }
                          )
                        }
                      )
                    ]
                  }
                )
              },
              item.label
            );
          }) }),
          onLogout && /* @__PURE__ */ jsx5("div", { className: "p-3 mt-auto", children: /* @__PURE__ */ jsxs2(
            "button",
            {
              onClick: onLogout,
              className: "w-full flex items-center justify-center gap-2 rounded-2xl border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-950/60 transition py-3 lux-btn",
              children: [
                /* @__PURE__ */ jsx5("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ jsx5(
                  "path",
                  {
                    d: "M10 12H18M18 12L15.5 9.77778M18 12L15.5 14.2222M18 7.11111V5C18 4.44772 17.5523 4 17 4H7C6.44772 4 6 4.44772 6 5V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V16.8889",
                    stroke: "currentColor",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "2"
                  }
                ) }),
                /* @__PURE__ */ jsx5("span", { className: "text-sm font-semibold", children: "\u062E\u0631\u0648\u062C" })
              ]
            }
          ) })
        ]
      }
    )
  ] });
};

// src/components/DropdownSelect/DropdownSelect.tsx
import {
  useCallback,
  useEffect as useEffect4,
  useMemo as useMemo2,
  useRef as useRef3,
  useState as useState5
} from "react";
import { createPortal } from "react-dom";
import { jsx as jsx6, jsxs as jsxs3 } from "react/jsx-runtime";
function SearchableSelect({
  label,
  value,
  onChange,
  options,
  placeholder = "\u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646\u06CC\u062F...",
  searchable = false,
  searchPlaceholder = "\u062C\u0633\u062A\u062C\u0648...",
  allLabel,
  loading = false,
  direction = "rtl",
  className = "",
  disabled = false
}) {
  const [open, setOpen] = useState5(false);
  const [mounted, setMounted] = useState5(false);
  const [q, setQ] = useState5("");
  const [coords, setCoords] = useState5({
    top: 0,
    left: 0,
    width: 0
  });
  const buttonRef = useRef3(null);
  const dropdownRef = useRef3(null);
  const searchInputRef = useRef3(null);
  useEffect4(() => {
    setMounted(true);
  }, []);
  const normalizedOptions = useMemo2(() => {
    const base = options ?? [];
    if (!allLabel) return base;
    return [{ id: "__all__", label: allLabel, value: "" }, ...base];
  }, [options, allLabel]);
  const selectedOption = useMemo2(() => {
    return normalizedOptions.find((o) => o.value === value);
  }, [normalizedOptions, value]);
  const filteredOptions = useMemo2(() => {
    if (!searchable) return normalizedOptions;
    const query = q.trim().toLowerCase();
    if (!query) return normalizedOptions;
    return normalizedOptions.filter(
      (item) => item.label.toLowerCase().includes(query)
    );
  }, [normalizedOptions, searchable, q]);
  const updatePosition = useCallback(() => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;
    const viewportHeight = window.innerHeight;
    const estimatedDropdownHeight = searchable ? 320 : 260;
    const spaceBelow = viewportHeight - rect.bottom;
    const shouldOpenUp = spaceBelow < estimatedDropdownHeight && rect.top > estimatedDropdownHeight;
    const top = shouldOpenUp ? rect.top + window.scrollY - estimatedDropdownHeight - 8 : rect.bottom + window.scrollY + 8;
    setCoords({
      top,
      left: rect.left + window.scrollX,
      width: rect.width
    });
  }, [searchable]);
  useEffect4(() => {
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
  useEffect4(() => {
    if (!open) return;
    const handleOutsideClick = (e) => {
      const target = e.target;
      if (!(target instanceof Node)) return;
      const clickedButton = buttonRef.current?.contains(target);
      const clickedDropdown = dropdownRef.current?.contains(target);
      if (!clickedButton && !clickedDropdown) {
        setOpen(false);
      }
    };
    const handleEscape = (e) => {
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
  useEffect4(() => {
    if (open && searchable) {
      const t = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 40);
      return () => clearTimeout(t);
    }
  }, [open, searchable]);
  const handleSelect = (nextValue) => {
    onChange(nextValue);
    setOpen(false);
    setQ("");
  };
  const triggerText = selectedOption?.label || placeholder;
  return /* @__PURE__ */ jsxs3("div", { className: `w-full ${className}`, dir: direction, children: [
    label ? /* @__PURE__ */ jsx6("label", { className: "mb-2 block text-sm font-medium text-titleText", children: label }) : null,
    /* @__PURE__ */ jsxs3(
      "button",
      {
        ref: buttonRef,
        type: "button",
        disabled,
        onClick: () => {
          if (disabled) return;
          setOpen((prev) => !prev);
        },
        className: [
          "lux-btn w-full h-12 px-4",
          "flex items-center justify-between gap-3",
          "rounded-xl",
          "transition-all duration-200",
          "text-titleText",
          open ? "ring-2 ring-primary/20" : "",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        ].join(" "),
        "aria-haspopup": "listbox",
        "aria-expanded": open,
        children: [
          /* @__PURE__ */ jsx6(
            "span",
            {
              className: [
                "truncate text-sm font-medium",
                selectedOption ? "text-titleText" : "lux-text"
              ].join(" "),
              children: triggerText
            }
          ),
          /* @__PURE__ */ jsx6(
            "span",
            {
              className: [
                "shrink-0 grid place-items-center",
                // دقیقاً وسط
                "h-8 w-8 -m-2",
                // hit area بهتر، ولی ظاهر همون
                "text-titleText/70",
                "transition-transform duration-200",
                "[transform-origin:center]",
                open ? "rotate-180" : ""
              ].join(" "),
              "aria-hidden": "true",
              children: /* @__PURE__ */ jsx6(
                "svg",
                {
                  className: "block h-4 w-4",
                  viewBox: "0 0 20 20",
                  fill: "none",
                  children: /* @__PURE__ */ jsx6(
                    "path",
                    {
                      d: "M6 8.25L10 12.25L14 8.25",
                      stroke: "currentColor",
                      strokeWidth: "1.9",
                      strokeLinecap: "round",
                      strokeLinejoin: "round"
                    }
                  )
                }
              )
            }
          )
        ]
      }
    ),
    mounted && open ? createPortal(
      /* @__PURE__ */ jsxs3(
        "div",
        {
          ref: dropdownRef,
          dir: direction,
          style: {
            position: "absolute",
            top: coords.top,
            left: coords.left,
            width: coords.width,
            zIndex: 999999
          },
          className: [
            "lux-panel",
            "bg-boxColor",
            "animate-fadeScale",
            "overflow-hidden",
            "rounded-2xl"
          ].join(" "),
          children: [
            searchable ? /* @__PURE__ */ jsx6("div", { className: "px-2 pt-2 pb-1", children: /* @__PURE__ */ jsxs3("div", { className: "lux-btn box-border flex w-full items-center gap-2 rounded-xl px-3 py-2.5", children: [
              /* @__PURE__ */ jsx6(
                "svg",
                {
                  className: "h-4 w-4 shrink-0 text-titleText opacity-50",
                  viewBox: "0 0 20 20",
                  fill: "none",
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ jsx6(
                    "path",
                    {
                      d: "M14.1667 14.1667L18 18M16.3333 9.16667C16.3333 13.1247 13.1247 16.3333 9.16667 16.3333C5.20863 16.3333 2 13.1247 2 9.16667C2 5.20863 5.20863 2 9.16667 2C13.1247 2 16.3333 5.20863 16.3333 9.16667Z",
                      stroke: "currentColor",
                      strokeWidth: "1.8",
                      strokeLinecap: "round",
                      strokeLinejoin: "round"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx6(
                "input",
                {
                  ref: searchInputRef,
                  value: q,
                  onChange: (e) => setQ(e.target.value),
                  placeholder: searchPlaceholder,
                  className: "w-full border-none bg-transparent text-sm text-titleText outline-none placeholder:opacity-50"
                }
              )
            ] }) }) : null,
            /* @__PURE__ */ jsx6("div", { className: "max-h-72 overflow-y-auto px-2 py-1 box-border", children: loading ? /* @__PURE__ */ jsx6("div", { className: "px-3 py-4 text-center text-sm lux-text", children: "\u062F\u0631 \u062D\u0627\u0644 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC..." }) : filteredOptions.length === 0 ? /* @__PURE__ */ jsx6("div", { className: "px-3 py-4 text-center text-sm lux-text", children: "\u0645\u0648\u0631\u062F\u06CC \u06CC\u0627\u0641\u062A \u0646\u0634\u062F" }) : filteredOptions.map((opt) => {
              const active = opt.value === value;
              return /* @__PURE__ */ jsxs3(
                "button",
                {
                  type: "button",
                  onClick: () => handleSelect(opt.value),
                  className: [
                    "group box-border flex w-full items-center justify-between gap-3",
                    "rounded-xl px-3 py-3 text-right text-sm",
                    "cursor-pointer border-none text-titleText transition-colors duration-150",
                    active ? "bg-gray-200 dark:bg-gray-700" : "bg-transparent hover:bg-gray-100 dark:hover:bg-white/5"
                  ].join(" "),
                  children: [
                    /* @__PURE__ */ jsx6("span", { className: "truncate font-medium", children: opt.label }),
                    /* @__PURE__ */ jsx6(
                      "span",
                      {
                        className: [
                          "text-xs transition-opacity",
                          active ? "text-primary opacity-100" : "text-titleText opacity-0 group-hover:opacity-60"
                        ].join(" "),
                        children: "\u2713"
                      }
                    )
                  ]
                },
                String(opt.id ?? opt.value)
              );
            }) })
          ]
        }
      ),
      document.body
    ) : null
  ] });
}

// src/components/Modal/Modal.tsx
import { useEffect as useEffect5, useState as useState6 } from "react";
import { createPortal as createPortal2 } from "react-dom";
import clsx2 from "clsx";
import { jsx as jsx7, jsxs as jsxs4 } from "react/jsx-runtime";
function Modal({
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
  ariaLabel = "Modal dialog"
}) {
  const [mounted, setMounted] = useState6(false);
  useEffect5(() => setMounted(true), []);
  useEffect5(() => {
    if (!open) return;
    const body = document.body;
    const html = document.documentElement;
    const scrollbarWidth = window.innerWidth - html.clientWidth;
    const prevOverflow = body.style.overflow;
    const prevPaddingRight = body.style.paddingRight;
    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;
    const onKey = (e) => {
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
  return createPortal2(
    /* @__PURE__ */ jsxs4(
      "div",
      {
        className: "fixed inset-0",
        style: { zIndex },
        role: "dialog",
        "aria-modal": "true",
        "aria-label": typeof title === "string" ? title : ariaLabel,
        children: [
          /* @__PURE__ */ jsx7(
            "div",
            {
              className: "absolute inset-0 bg-black/50 backdrop-blur-sm",
              onClick: () => {
                if (!closeOnBackdrop) return;
                onClose();
              }
            }
          ),
          /* @__PURE__ */ jsx7("div", { className: "absolute inset-0 flex items-center justify-center p-4 pointer-events-none", children: /* @__PURE__ */ jsxs4(
            "div",
            {
              className: clsx2(
                "pointer-events-auto w-full",
                maxWidthClass,
                "rounded-2xl",
                // tokens
                "lux-menu bg-boxColor text-titleText",
                "shadow-[0_20px_60px_rgba(0,0,0,0.35)]",
                "animate-[pantaModalIn_0.18s_ease-out]",
                className
              ),
              onClick: (e) => e.stopPropagation(),
              children: [
                showHeader ? /* @__PURE__ */ jsxs4("div", { className: "flex items-center justify-between px-5 py-1 border-b border-boxBorderColor dark:border-boxBorderColor-dark", children: [
                  /* @__PURE__ */ jsx7("div", { className: "min-w-0", children: title ? typeof title === "string" ? /* @__PURE__ */ jsx7("h3", { className: "truncate text-lg font-semibold", children: title }) : /* @__PURE__ */ jsx7("div", { className: "min-w-0", children: title }) : /* @__PURE__ */ jsx7("div", {}) }),
                  showCloseButton ? /* @__PURE__ */ jsx7(
                    "button",
                    {
                      type: "button",
                      onClick: onClose,
                      className: clsx2(
                        "h-9 w-9 shrink-0 rounded-xl",
                        "lux-btn flex items-center justify-center",
                        "text-titleText"
                      ),
                      "aria-label": "close",
                      children: /* @__PURE__ */ jsx7(
                        "svg",
                        {
                          className: "block h-[18px] w-[18px]",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          "aria-hidden": "true",
                          children: /* @__PURE__ */ jsx7(
                            "path",
                            {
                              d: "M6 6l12 12M18 6L6 18",
                              stroke: "currentColor",
                              strokeWidth: "2",
                              strokeLinecap: "round"
                            }
                          )
                        }
                      )
                    }
                  ) : null
                ] }) : null,
                /* @__PURE__ */ jsx7("div", { className: "px-5 pb-4 pt-0", children })
              ]
            }
          ) }),
          /* @__PURE__ */ jsx7("style", { children: `
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
      ` })
        ]
      }
    ),
    target
  );
}

// src/components/Calendar/Calendar.tsx
import { useEffect as useEffect6, useMemo as useMemo3, useRef as useRef4, useState as useState7 } from "react";
import { createPortal as createPortal3 } from "react-dom";
import clsx3 from "clsx";
import { Fragment, jsx as jsx8, jsxs as jsxs5 } from "react/jsx-runtime";
function clampDate(d, min, max) {
  const t = d.getTime();
  if (min && t < min.getTime()) return min;
  if (max && t > max.getTime()) return max;
  return d;
}
function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function startOfDay(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}
function toEnglishDigits(input) {
  const fa = "\u06F0\u06F1\u06F2\u06F3\u06F4\u06F5\u06F6\u06F7\u06F8\u06F9";
  const ar = "\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669";
  return input.replace(/[۰-۹٠-٩]/g, (ch) => {
    const faIndex = fa.indexOf(ch);
    if (faIndex !== -1) return String(faIndex);
    const arIndex = ar.indexOf(ch);
    if (arIndex !== -1) return String(arIndex);
    return ch;
  });
}
function joinYMD(y, m, d, format) {
  const sep = format === "YYYY-MM-DD" ? "-" : "/";
  return `${y}${sep}${m}${sep}${d}`;
}
function formatDisplayValue(date, calendar, format) {
  if (!date) return "";
  if (calendar === "gregorian") {
    const y2 = String(date.getFullYear()).padStart(4, "0");
    const m2 = String(date.getMonth() + 1).padStart(2, "0");
    const d2 = String(date.getDate()).padStart(2, "0");
    return joinYMD(y2, m2, d2, format);
  }
  const dtf = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
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
function getWeekdayLabels(calendar) {
  if (calendar === "jalali") return ["\u0634", "\u06CC", "\u062F", "\u0633", "\u0686", "\u067E", "\u062C"];
  return ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
}
function getMonthTitle(date, calendar) {
  if (calendar === "gregorian") {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric"
    }).format(date);
  }
  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    year: "numeric",
    month: "long"
  }).format(date);
}
function buildMonthGrid(viewDate, calendar) {
  const weekStart = calendar === "jalali" ? 6 : 0;
  let firstOfMonth;
  let lastOfMonth;
  if (calendar === "gregorian") {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    firstOfMonth = new Date(year, month, 1);
    lastOfMonth = new Date(year, month + 1, 0);
  } else {
    firstOfMonth = findPersianMonthStart(viewDate);
    const startNextMonth = findPersianMonthStart(addDays(firstOfMonth, 35));
    lastOfMonth = addDays(startNextMonth, -1);
  }
  const firstDayIndex = firstOfMonth.getDay();
  const leading = (firstDayIndex - weekStart + 7) % 7;
  const days = [];
  for (let i = leading; i > 0; i--) {
    days.push({ date: addDays(firstOfMonth, -i), inMonth: false });
  }
  const totalDays = Math.round((startOfDay(lastOfMonth).getTime() - startOfDay(firstOfMonth).getTime()) / 864e5) + 1;
  for (let i = 0; i < totalDays; i++) {
    days.push({ date: addDays(firstOfMonth, i), inMonth: true });
  }
  while (days.length < 42) {
    const last = days[days.length - 1].date;
    days.push({ date: addDays(last, 1), inMonth: false });
  }
  return days;
}
function isDisabledDay(d, minDate, maxDate) {
  const t = startOfDay(d).getTime();
  if (minDate && t < startOfDay(minDate).getTime()) return true;
  if (maxDate && t > startOfDay(maxDate).getTime()) return true;
  return false;
}
function IconChevronLeft(props) {
  return /* @__PURE__ */ jsx8("svg", { className: clsx3("h-5 w-5", props.className), viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx8(
    "path",
    {
      d: "M15 6l-6 6 6 6",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ) });
}
function IconChevronRight(props) {
  return /* @__PURE__ */ jsx8("svg", { className: clsx3("h-5 w-5", props.className), viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx8(
    "path",
    {
      d: "M9 6l6 6-6 6",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ) });
}
function IconDoubleLeft(props) {
  return /* @__PURE__ */ jsxs5("svg", { className: clsx3("h-5 w-5", props.className), viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsx8(
      "path",
      {
        d: "M18 6l-6 6 6 6",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    ),
    /* @__PURE__ */ jsx8(
      "path",
      {
        d: "M12 6l-6 6 6 6",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  ] });
}
function IconDoubleRight(props) {
  return /* @__PURE__ */ jsxs5("svg", { className: clsx3("h-5 w-5", props.className), viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsx8(
      "path",
      {
        d: "M6 6l6 6-6 6",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    ),
    /* @__PURE__ */ jsx8(
      "path",
      {
        d: "M12 6l6 6-6 6",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  ] });
}
function getPersianParts(date) {
  const dtf = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    year: "numeric",
    month: "numeric",
    day: "numeric"
  });
  const parts = dtf.formatToParts(date);
  const y = Number(toEnglishDigits(parts.find((p) => p.type === "year")?.value ?? "0"));
  const m = Number(toEnglishDigits(parts.find((p) => p.type === "month")?.value ?? "0"));
  const d = Number(toEnglishDigits(parts.find((p) => p.type === "day")?.value ?? "0"));
  return { jy: y, jm: m, jd: d };
}
function addDays(base, delta) {
  const d = new Date(base);
  d.setDate(d.getDate() + delta);
  return d;
}
function findPersianMonthStart(anchor) {
  const a = startOfDay(anchor);
  const { jy, jm } = getPersianParts(a);
  for (let i = 0; i <= 40; i++) {
    const cur = addDays(a, -i);
    const p = getPersianParts(cur);
    if (p.jy === jy && p.jm === jm && p.jd === 1) return cur;
  }
  return new Date(a.getFullYear(), a.getMonth(), 1);
}
function DatePicker({
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
  closeOnSelect = true
}) {
  const triggerRef = useRef4(null);
  const panelRef = useRef4(null);
  const [open, setOpen] = useState7(false);
  const [mounted, setMounted] = useState7(false);
  const [viewDate, setViewDate] = useState7(
    () => clampDate(value ?? /* @__PURE__ */ new Date(), minDate, maxDate)
  );
  const isRTL = calendar === "jalali";
  useEffect6(() => setMounted(true), []);
  useEffect6(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onDown = (e) => {
      const t = e.target;
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
  useEffect6(() => {
    if (value) setViewDate(clampDate(value, minDate, maxDate));
  }, [value, minDate, maxDate]);
  const rect = triggerRef.current?.getBoundingClientRect();
  const panelStyle = rect ? {
    position: "fixed",
    top: rect.bottom + 8,
    left: rect.left,
    width: rect.width,
    zIndex: 9999
  } : void 0;
  const days = useMemo3(() => buildMonthGrid(viewDate, calendar), [viewDate, calendar]);
  const weekdayLabels = useMemo3(() => getWeekdayLabels(calendar), [calendar]);
  const displayValue = formatDisplayValue(value, calendar, displayFormat);
  const goPrevMonth = () => {
    if (calendar === "gregorian") {
      const d = new Date(viewDate);
      d.setMonth(d.getMonth() - 1);
      setViewDate(clampDate(d, minDate, maxDate));
      return;
    }
    const start = findPersianMonthStart(viewDate);
    setViewDate(clampDate(addDays(start, -1), minDate, maxDate));
  };
  const goNextMonth = () => {
    if (calendar === "gregorian") {
      const d = new Date(viewDate);
      d.setMonth(d.getMonth() + 1);
      setViewDate(clampDate(d, minDate, maxDate));
      return;
    }
    const start = findPersianMonthStart(viewDate);
    setViewDate(clampDate(addDays(start, 35), minDate, maxDate));
  };
  const goPrevYear = () => {
    if (calendar === "gregorian") {
      const d = new Date(viewDate);
      d.setFullYear(d.getFullYear() - 1);
      setViewDate(clampDate(d, minDate, maxDate));
      return;
    }
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
  const onPick = (d) => {
    const picked = clampDate(startOfDay(d), minDate, maxDate);
    if (isDisabledDay(picked, minDate, maxDate)) return;
    onChange(picked);
    onChangeFormatted?.(picked.toISOString());
    if (closeOnSelect) setOpen(false);
  };
  const leftGroup = isRTL ? [
    { key: "nextYear", onClick: goPrevYear, icon: /* @__PURE__ */ jsx8(IconDoubleRight, {}) },
    { key: "nextMonth", onClick: goPrevMonth, icon: /* @__PURE__ */ jsx8(IconChevronRight, {}) }
  ] : [
    { key: "prevYear", onClick: goPrevYear, icon: /* @__PURE__ */ jsx8(IconDoubleLeft, {}) },
    { key: "prevMonth", onClick: goPrevMonth, icon: /* @__PURE__ */ jsx8(IconChevronLeft, {}) }
  ];
  const rightGroup = isRTL ? [
    { key: "prevMonth", onClick: goNextMonth, icon: /* @__PURE__ */ jsx8(IconChevronLeft, {}) },
    { key: "prevYear", onClick: goNextYear, icon: /* @__PURE__ */ jsx8(IconDoubleLeft, {}) }
  ] : [
    { key: "nextMonth", onClick: goNextMonth, icon: /* @__PURE__ */ jsx8(IconChevronRight, {}) },
    { key: "nextYear", onClick: goNextYear, icon: /* @__PURE__ */ jsx8(IconDoubleRight, {}) }
  ];
  const navLikeSquareBtn = "shrink-0 h-10 w-10 rounded-xl border border-boxBorderColor dark:border-boxBorderColor-dark bg-white/70 dark:bg-bgColor-dark/60 hover:bg-gray-100 dark:hover:bg-gray-900 transition flex items-center justify-center text-titleText dark:text-titleText-dark lux-btn";
  const dayBtnBase = "h-10 rounded-xl text-sm box-border flex items-center justify-center select-none transition text-titleText dark:text-titleText-dark lux-btn";
  return /* @__PURE__ */ jsxs5(Fragment, { children: [
    /* @__PURE__ */ jsxs5(
      "button",
      {
        ref: triggerRef,
        type: "button",
        disabled,
        onClick: () => {
          if (disabled) return;
          setOpen((prev) => !prev);
        },
        className: [
          "lux-btn w-full h-12 px-4",
          "flex items-center justify-between gap-3",
          "rounded-xl",
          "transition-all duration-200",
          "text-titleText",
          open ? "ring-2 ring-primary/20" : "",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
          className ?? ""
        ].join(" "),
        "aria-haspopup": "dialog",
        "aria-expanded": open,
        children: [
          /* @__PURE__ */ jsx8("span", { className: clsx3("min-w-0 truncate", !displayValue && "text-mutedText"), children: displayValue || placeholder }),
          /* @__PURE__ */ jsx8(
            "svg",
            {
              className: clsx3("h-5 w-5 shrink-0 transition-transform", open && "rotate-180"),
              viewBox: "0 0 24 24",
              fill: "none",
              style: { transformOrigin: "center" },
              "aria-hidden": "true",
              children: /* @__PURE__ */ jsx8(
                "path",
                {
                  d: "M7 10l5 5 5-5",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                }
              )
            }
          )
        ]
      }
    ),
    open && mounted ? createPortal3(
      /* @__PURE__ */ jsxs5(
        "div",
        {
          ref: panelRef,
          className: clsx3(
            "rounded-2xl border lux-calendar backdrop-blur",
            "text-titleText dark:text-titleText-dark",
            "shadow-lg",
            "p-3"
          ),
          style: panelStyle,
          dir: isRTL ? "rtl" : "ltr",
          role: "dialog",
          "aria-label": "Date picker",
          children: [
            /* @__PURE__ */ jsxs5("div", { className: "flex items-center justify-between gap-2 px-1 pb-2", children: [
              /* @__PURE__ */ jsx8("div", { className: "flex items-center gap-2", children: leftGroup.map((b) => /* @__PURE__ */ jsx8(
                "button",
                {
                  type: "button",
                  onClick: b.onClick,
                  className: navLikeSquareBtn,
                  "aria-label": b.key,
                  children: b.icon
                },
                b.key
              )) }),
              /* @__PURE__ */ jsx8("div", { className: "flex-1 text-center", children: /* @__PURE__ */ jsx8("div", { className: "text-sm font-semibold leading-5", children: getMonthTitle(viewDate, calendar) }) }),
              /* @__PURE__ */ jsx8("div", { className: "flex items-center gap-2", children: rightGroup.map((b) => /* @__PURE__ */ jsx8(
                "button",
                {
                  type: "button",
                  onClick: b.onClick,
                  className: navLikeSquareBtn,
                  "aria-label": b.key,
                  children: b.icon
                },
                b.key
              )) })
            ] }),
            /* @__PURE__ */ jsx8("div", { className: "grid grid-cols-7 gap-1 px-1 pb-1", children: weekdayLabels.map((w) => /* @__PURE__ */ jsx8(
              "div",
              {
                className: "py-1 text-center text-[11px] font-medium text-mutedText select-none",
                children: w
              },
              w
            )) }),
            /* @__PURE__ */ jsx8("div", { className: "grid grid-cols-7 gap-1 px-1", children: days.map(({ date, inMonth }, idx) => {
              const selected = value ? isSameDay(date, value) : false;
              const today = isSameDay(date, /* @__PURE__ */ new Date());
              const isOutsideMonth = !inMonth;
              const isDayDisabled = isOutsideMonth || isDisabledDay(date, minDate, maxDate);
              const dayLabel = calendar === "gregorian" ? String(date.getDate()) : new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
                day: "numeric"
              }).format(date);
              return /* @__PURE__ */ jsx8(
                "button",
                {
                  type: "button",
                  disabled: isDayDisabled,
                  onClick: () => {
                    if (isDayDisabled) return;
                    onPick(date);
                  },
                  className: clsx3(
                    dayBtnBase,
                    !selected && !isDayDisabled && "hover:bg-gray-100 dark:hover:bg-gray-900",
                    selected && "bg-primary/20 dark:bg-gray-600",
                    today && !selected && !isDayDisabled && "ring-1 ring-black/10 dark:ring-white/10",
                    isOutsideMonth && "opacity-30 cursor-not-allowed",
                    isDayDisabled && !isOutsideMonth && "opacity-35 cursor-not-allowed"
                  ),
                  "aria-pressed": selected,
                  "aria-disabled": isDayDisabled,
                  children: dayLabel
                },
                `${date.toISOString()}-${idx}`
              );
            }) })
          ]
        }
      ),
      document.body
    ) : null
  ] });
}

// src/components/Box/Box.tsx
import clsx4 from "clsx";
import { useRef as useRef5, useState as useState8, useEffect as useEffect7 } from "react";
import { jsx as jsx9, jsxs as jsxs6 } from "react/jsx-runtime";
function ChevronIcon({ open }) {
  return /* @__PURE__ */ jsx9(
    "svg",
    {
      width: "18",
      height: "18",
      viewBox: "0 0 24 24",
      className: clsx4("transition-transform duration-300", open ? "rotate-180" : ""),
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      children: /* @__PURE__ */ jsx9("polyline", { points: "6 9 12 15 18 9" })
    }
  );
}
function Box({
  dir = "rtl",
  title,
  description,
  icon,
  actions,
  children,
  footer,
  className,
  collapsible = false,
  defaultCollapsed = false,
  onToggle
}) {
  const hasHeader = title || description || icon || actions || collapsible;
  const [collapsed, setCollapsed] = useState8(defaultCollapsed);
  const contentRef = useRef5(null);
  const [height, setHeight] = useState8(0);
  useEffect7(() => {
    const el = contentRef.current;
    if (!el) return;
    const update = () => setHeight(el.scrollHeight);
    update();
    const ro = new ResizeObserver(() => update());
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  function toggle() {
    if (!collapsible) return;
    const next = !collapsed;
    setCollapsed(next);
    onToggle?.(next);
  }
  return /* @__PURE__ */ jsxs6(
    "div",
    {
      dir,
      className: clsx4(
        `
        w-full max-w-full min-w-0
        rounded-[32px]
        border border-white/30 dark:border-white/10
        bg-gradient-to-br from-white/90 via-white/70 to-white/60
        dark:from-[#0b0f15]/95 dark:via-[#0d131c]/85 dark:to-[#0a0f15]/90
        backdrop-blur-2xl
        shadow-[0_25px_70px_-35px_rgba(0,0,0,0.55)]
        p-4 md:p-5
        text-titleText dark:text-titleText-dark
        flex flex-col
        overflow-visible
        `,
        className
      ),
      style: { boxSizing: "border-box" },
      children: [
        hasHeader && /* @__PURE__ */ jsxs6(
          "div",
          {
            onClick: toggle,
            className: clsx4(
              "flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between flex-shrink-0",
              collapsible && "cursor-pointer select-none"
            ),
            children: [
              (icon || title || description) && /* @__PURE__ */ jsxs6("div", { className: "flex items-center gap-3 min-w-0", children: [
                icon && /* @__PURE__ */ jsx9("div", { className: "h-11 w-11 flex-shrink-0 rounded-2xl bg-white/70 dark:bg-white/5 border border-white/40 dark:border-white/10 flex items-center justify-center lux-icon", children: icon }),
                /* @__PURE__ */ jsxs6("div", { className: "min-w-0", children: [
                  title && /* @__PURE__ */ jsx9("h4", { className: "text-16 font-bold truncate m-0", children: title }),
                  description && /* @__PURE__ */ jsx9("p", { className: "text-[12px] text-titleText/60 dark:text-titleText-dark/60 m-0", children: description })
                ] })
              ] }),
              /* @__PURE__ */ jsxs6("div", { className: "flex items-center gap-2", children: [
                actions,
                collapsible && /* @__PURE__ */ jsx9("div", { className: "h-9 w-9 rounded-xl flex items-center justify-center bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10 lux-icon", children: /* @__PURE__ */ jsx9(ChevronIcon, { open: !collapsed }) })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsx9(
          "div",
          {
            style: { maxHeight: collapsed ? 0 : height + 20 },
            className: "transition-all duration-300 ease-in-out overflow-hidden",
            children: /* @__PURE__ */ jsxs6("div", { ref: contentRef, children: [
              /* @__PURE__ */ jsx9("div", { className: "flex-1 min-h-0 w-full mt-5", children: /* @__PURE__ */ jsx9("div", { className: "relative w-full h-full min-w-0", children }) }),
              footer && /* @__PURE__ */ jsx9("div", { className: "mt-5 pt-4 border-t border-white/30 dark:border-white/10 flex-shrink-0", children: footer })
            ] })
          }
        )
      ]
    }
  );
}

// src/components/ButtonSelect/ButtonSelect.tsx
import React9 from "react";
import clsx5 from "clsx";
import { jsx as jsx10 } from "react/jsx-runtime";
function ButtonSelect({
  value,
  defaultValue,
  onChange,
  options,
  dir = "rtl",
  size = "md",
  variant = "primary",
  orientation = "horizontal",
  columns = 4,
  fullWidth = false,
  className
}) {
  const [internalValue, setInternalValue] = React9.useState(defaultValue);
  const current = value ?? internalValue;
  function select(val) {
    if (value === void 0) {
      setInternalValue(val);
    }
    onChange?.(val);
  }
  const sizeStyles = {
    sm: "py-1.5 px-2 text-xs",
    md: "py-2 px-3 text-sm",
    lg: "py-3 px-4 text-base"
  };
  const layoutClasses = orientation === "vertical" ? "flex flex-col gap-1" : orientation === "grid" ? `grid gap-1 grid-cols-${columns}` : "flex flex-row gap-1";
  return /* @__PURE__ */ jsx10(
    "div",
    {
      dir,
      className: clsx5(
        "w-full",
        layoutClasses,
        orientation === "horizontal" && !fullWidth && "w-fit",
        className
      ),
      children: options.map((opt) => {
        const active = opt.value === current;
        return /* @__PURE__ */ jsx10(
          "button",
          {
            type: "button",
            disabled: opt.disabled,
            onClick: () => select(opt.value),
            className: clsx5(
              `
              font-medium
              rounded-xl
              border
              transition-all
              duration-200
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#63C3FF]
              focus-visible:ring-offset-2
              shadow-sm
              hover:cursor-pointer
              `,
              sizeStyles[size],
              orientation === "horizontal" && (fullWidth ? "flex-1" : ""),
              active ? variant === "primary" ? `
                    bg-gradient-to-r from-[#63C3FF] to-[#4BA5FF]
                    text-white dark:text-slate-900
                    border-transparent
                    shadow-md
                  ` : `
                    bg-white dark:bg-slate-700
                    border-[#63C3FF]
                  ` : `
                    bg-boxColor dark:bg-boxColor-dark
                    text-titleText dark:text-titleText-dark
                    border-solid
                    border-boxBorderColor dark:border-boxBorderColor-dark
                    hover:bg-slate-50/70
                    dark:hover:bg-slate-700/60
                    hover:border-[#63C3FF]
                  `,
              opt.disabled && "opacity-50 pointer-events-none"
            ),
            children: opt.label
          },
          opt.value
        );
      })
    }
  );
}

// src/components/HashText/HashText.tsx
import { useState as useState9 } from "react";
import { jsx as jsx11, jsxs as jsxs7 } from "react/jsx-runtime";
var HashText = ({
  text,
  startChars = 6,
  endChars = 4,
  separator = "\u2026",
  className = "",
  showCopyButton = true,
  copyOnClickText = false
}) => {
  const [copied, setCopied] = useState9(false);
  if (!text) return null;
  const handleCopy = async (e) => {
    if (e) e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };
  const truncated = text.length <= startChars + endChars ? text : `${text.slice(0, startChars)}${separator}${text.slice(-endChars)}`;
  const handleTextClick = () => {
    if (copyOnClickText) handleCopy();
  };
  return /* @__PURE__ */ jsxs7(
    "span",
    {
      className: `
        lux-chip inline-flex items-center gap-2 
        px-3 py-1.5 font-mono text-sm leading-5
        transition-all duration-200
        hover:shadow-md hover:border-amber-400/30
        
        ${className}
      `,
      title: text,
      children: [
        /* @__PURE__ */ jsx11(
          "span",
          {
            className: `select-all whitespace-nowrap tracking-wide ${copyOnClickText ? "cursor-pointer hover:opacity-80" : ""}`,
            onClick: handleTextClick,
            children: truncated
          }
        ),
        showCopyButton && /* @__PURE__ */ jsx11(
          "button",
          {
            type: "button",
            onClick: handleCopy,
            className: `
      flex-shrink-0 flex items-center justify-center
      w-7 h-7 rounded-md
      text-gray-500 hover:text-amber-600
      dark:text-gray-400 dark:hover:text-amber-400
      transition-all duration-200
      focus:outline-none focus:ring-1 focus:ring-amber-400/50
      bg-transparent border-none
      ${copied ? "scale-110" : "scale-100"}
    `,
            "aria-label": "\u06A9\u067E\u06CC \u062F\u0631 \u06A9\u0644\u06CC\u067E\u200C\u0628\u0648\u0631\u062F",
            children: copied ? /* @__PURE__ */ jsx11(
              "svg",
              {
                width: "19",
                height: "19",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2.4",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                className: "text-emerald-500",
                children: /* @__PURE__ */ jsx11("polyline", { points: "20 6 9 17 4 12" })
              }
            ) : /* @__PURE__ */ jsxs7(
              "svg",
              {
                width: "19",
                height: "19",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2.1",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                children: [
                  /* @__PURE__ */ jsx11("rect", { x: "9", y: "9", width: "13", height: "13", rx: "2", ry: "2" }),
                  /* @__PURE__ */ jsx11("path", { d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" })
                ]
              }
            )
          }
        )
      ]
    }
  );
};

// src/components/DoubleBarChart/DoubleBarChart.tsx
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { jsx as jsx12, jsxs as jsxs8 } from "react/jsx-runtime";
var DoubleBarChart = ({
  data,
  assetLabel = "",
  liabilityLabel = "",
  height = 320,
  className = ""
}) => {
  const formatCompact = (n) => {
    const abs = Math.abs(n);
    if (abs >= 1e9) return (n / 1e9).toFixed(1) + "B";
    if (abs >= 1e6) return (n / 1e6).toFixed(1) + "M";
    if (abs >= 1e3) return (n / 1e3).toFixed(1) + "K";
    return String(n);
  };
  return /* @__PURE__ */ jsx12("div", { className: `w-full min-w-0 overflow-hidden ${className}`, children: /* @__PURE__ */ jsxs8(
    "div",
    {
      className: "\r\n        relative\r\n        w-full\r\n        min-w-0\r\n        overflow-hidden\r\n        border\r\n        border-white/30\r\n        dark:border-white/10\r\n        bg-white/70\r\n        dark:bg-white/[0.04]\r\n        backdrop-blur-2xl\r\n        p-6\r\n        shadow-[0_25px_60px_-25px_rgba(0,0,0,0.45)]\r\n        transition-all\r\n      ",
      style: { height },
      children: [
        /* @__PURE__ */ jsx12("div", { className: "pointer-events-none absolute -top-32 -right-32 h-72 w-72 rounded-none bg-emerald-400/15 blur-[120px]" }),
        /* @__PURE__ */ jsx12("div", { className: "pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-none bg-rose-400/15 blur-[120px]" }),
        /* @__PURE__ */ jsx12("div", { className: "relative h-full w-full min-w-0 overflow-hidden", children: /* @__PURE__ */ jsx12(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs8(
          BarChart,
          {
            data,
            margin: { top: 10, right: 20, left: 10, bottom: 20 },
            barCategoryGap: "28%",
            children: [
              /* @__PURE__ */ jsxs8("defs", { children: [
                /* @__PURE__ */ jsxs8("linearGradient", { id: "assetGradient", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                  /* @__PURE__ */ jsx12("stop", { offset: "0%", stopColor: "#34d399" }),
                  /* @__PURE__ */ jsx12("stop", { offset: "100%", stopColor: "#059669" })
                ] }),
                /* @__PURE__ */ jsxs8("linearGradient", { id: "liabilityGradient", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                  /* @__PURE__ */ jsx12("stop", { offset: "0%", stopColor: "#fb7185" }),
                  /* @__PURE__ */ jsx12("stop", { offset: "100%", stopColor: "#e11d48" })
                ] })
              ] }),
              /* @__PURE__ */ jsx12(
                CartesianGrid,
                {
                  vertical: false,
                  stroke: "currentColor",
                  opacity: 0.06
                }
              ),
              /* @__PURE__ */ jsx12(
                XAxis,
                {
                  dataKey: "label",
                  tick: { fontSize: 12, fill: "currentColor" },
                  tickLine: false,
                  axisLine: false,
                  interval: "preserveStartEnd",
                  minTickGap: 10,
                  padding: { left: 28, right: 8 }
                }
              ),
              /* @__PURE__ */ jsx12(
                YAxis,
                {
                  width: 55,
                  tickFormatter: (v) => formatCompact(Number(v)),
                  tick: { fontSize: 12, fill: "currentColor" },
                  tickLine: false,
                  axisLine: false
                }
              ),
              /* @__PURE__ */ jsx12(
                Tooltip,
                {
                  cursor: { fill: "rgba(255,255,255,0.05)" },
                  content: ({ active, payload, label }) => {
                    if (!active || !payload?.length) return null;
                    const xVal = payload.find((p) => p.dataKey === "x")?.value ?? 0;
                    const yVal = payload.find((p) => p.dataKey === "y")?.value ?? 0;
                    return /* @__PURE__ */ jsxs8(
                      "div",
                      {
                        className: "\r\n                      rounded-2xl\r\n                      border\r\n                      border-white/30\r\n                      dark:border-white/10\r\n                      bg-white/90\r\n                      dark:bg-[#0b0f15]\r\n                      px-4\r\n                      py-3\r\n                      text-xs\r\n                      shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)]\r\n                      backdrop-blur-xl\r\n                    ",
                        children: [
                          /* @__PURE__ */ jsx12("div", { className: "mb-2 font-semibold text-sm", children: label }),
                          /* @__PURE__ */ jsxs8("div", { className: "space-y-1", children: [
                            /* @__PURE__ */ jsxs8("div", { className: "flex justify-between gap-6", children: [
                              /* @__PURE__ */ jsx12("span", { className: "text-emerald-500 font-medium", children: assetLabel }),
                              /* @__PURE__ */ jsx12("span", { dir: "ltr", className: "font-semibold", children: formatCompact(Number(xVal)) })
                            ] }),
                            /* @__PURE__ */ jsxs8("div", { className: "flex justify-between gap-6", children: [
                              /* @__PURE__ */ jsx12("span", { className: "text-rose-500 font-medium", children: liabilityLabel }),
                              /* @__PURE__ */ jsx12("span", { dir: "ltr", className: "font-semibold", children: formatCompact(Number(yVal)) })
                            ] })
                          ] })
                        ]
                      }
                    );
                  }
                }
              ),
              /* @__PURE__ */ jsx12(
                Bar,
                {
                  dataKey: "x",
                  fill: "url(#assetGradient)",
                  radius: [14, 14, 6, 6],
                  maxBarSize: 42,
                  animationDuration: 600
                }
              ),
              /* @__PURE__ */ jsx12(
                Bar,
                {
                  dataKey: "y",
                  fill: "url(#liabilityGradient)",
                  radius: [14, 14, 6, 6],
                  maxBarSize: 42,
                  animationDuration: 600
                }
              )
            ]
          }
        ) }) })
      ]
    }
  ) });
};

// src/components/DoubleLineChart/DoubleLineChart.tsx
import {
  Line,
  XAxis as XAxis2,
  YAxis as YAxis2,
  CartesianGrid as CartesianGrid2,
  Tooltip as Tooltip2,
  ResponsiveContainer as ResponsiveContainer2,
  Area,
  ComposedChart
} from "recharts";
import { jsx as jsx13, jsxs as jsxs9 } from "react/jsx-runtime";
var DoubleLineChart = ({
  data,
  assetLabel = "",
  liabilityLabel = "",
  height = 320,
  className = ""
}) => {
  const formatCompact = (n) => {
    const abs = Math.abs(n);
    if (abs >= 1e9) {
      return `${Number((n / 1e9).toFixed(1))}B`;
    }
    if (abs >= 1e6) {
      return `${Number((n / 1e6).toFixed(1))}M`;
    }
    if (abs >= 1e3) {
      return `${Number((n / 1e3).toFixed(1))}K`;
    }
    return String(n);
  };
  const formatLabel = (value) => {
    const text = String(value ?? "");
    return text.length > 10 ? `${text.slice(0, 10)}\u2026` : text;
  };
  return /* @__PURE__ */ jsx13("div", { className: `w-full max-w-full min-w-0 overflow-hidden ${className}`, children: /* @__PURE__ */ jsxs9(
    "div",
    {
      className: "\r\n          relative\r\n          w-full\r\n          max-w-full\r\n          min-w-0\r\n          overflow-hidden\r\n          border\r\n          border-white/30\r\n          dark:border-white/10\r\n          bg-white/70\r\n          dark:bg-white/[0.04]\r\n          backdrop-blur-2xl\r\n          p-6\r\n          shadow-[0_25px_60px_-25px_rgba(0,0,0,0.45)]\r\n          transition-all\r\n        ",
      style: { height },
      children: [
        /* @__PURE__ */ jsx13("div", { className: "pointer-events-none absolute -top-32 -right-32 h-72 w-72 rounded-full bg-emerald-400/15 blur-[120px]" }),
        /* @__PURE__ */ jsx13("div", { className: "pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-rose-400/15 blur-[120px]" }),
        /* @__PURE__ */ jsx13("div", { className: "pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-white/15" }),
        /* @__PURE__ */ jsx13("div", { className: "relative h-full w-full max-w-full min-w-0 overflow-hidden pt-7", children: /* @__PURE__ */ jsx13(ResponsiveContainer2, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs9(
          ComposedChart,
          {
            data,
            margin: {
              top: 18,
              right: 18,
              left: 8,
              bottom: 18
            },
            children: [
              /* @__PURE__ */ jsxs9("defs", { children: [
                /* @__PURE__ */ jsxs9("linearGradient", { id: "assetLineGradient", x1: "0", y1: "0", x2: "1", y2: "0", children: [
                  /* @__PURE__ */ jsx13("stop", { offset: "0%", stopColor: "#10b981" }),
                  /* @__PURE__ */ jsx13("stop", { offset: "50%", stopColor: "#34d399" }),
                  /* @__PURE__ */ jsx13("stop", { offset: "100%", stopColor: "#6ee7b7" })
                ] }),
                /* @__PURE__ */ jsxs9("linearGradient", { id: "liabilityLineGradient", x1: "0", y1: "0", x2: "1", y2: "0", children: [
                  /* @__PURE__ */ jsx13("stop", { offset: "0%", stopColor: "#e11d48" }),
                  /* @__PURE__ */ jsx13("stop", { offset: "50%", stopColor: "#fb7185" }),
                  /* @__PURE__ */ jsx13("stop", { offset: "100%", stopColor: "#fda4af" })
                ] }),
                /* @__PURE__ */ jsxs9("linearGradient", { id: "assetAreaGradient", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                  /* @__PURE__ */ jsx13("stop", { offset: "0%", stopColor: "#34d399", stopOpacity: 0.24 }),
                  /* @__PURE__ */ jsx13("stop", { offset: "55%", stopColor: "#34d399", stopOpacity: 0.08 }),
                  /* @__PURE__ */ jsx13("stop", { offset: "100%", stopColor: "#34d399", stopOpacity: 0 })
                ] }),
                /* @__PURE__ */ jsxs9("linearGradient", { id: "liabilityAreaGradient", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                  /* @__PURE__ */ jsx13("stop", { offset: "0%", stopColor: "#fb7185", stopOpacity: 0.22 }),
                  /* @__PURE__ */ jsx13("stop", { offset: "55%", stopColor: "#fb7185", stopOpacity: 0.07 }),
                  /* @__PURE__ */ jsx13("stop", { offset: "100%", stopColor: "#fb7185", stopOpacity: 0 })
                ] }),
                /* @__PURE__ */ jsxs9("filter", { id: "assetGlow", x: "-30%", y: "-30%", width: "160%", height: "160%", children: [
                  /* @__PURE__ */ jsx13("feGaussianBlur", { stdDeviation: "3", result: "coloredBlur" }),
                  /* @__PURE__ */ jsxs9("feMerge", { children: [
                    /* @__PURE__ */ jsx13("feMergeNode", { in: "coloredBlur" }),
                    /* @__PURE__ */ jsx13("feMergeNode", { in: "SourceGraphic" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs9("filter", { id: "liabilityGlow", x: "-30%", y: "-30%", width: "160%", height: "160%", children: [
                  /* @__PURE__ */ jsx13("feGaussianBlur", { stdDeviation: "3", result: "coloredBlur" }),
                  /* @__PURE__ */ jsxs9("feMerge", { children: [
                    /* @__PURE__ */ jsx13("feMergeNode", { in: "coloredBlur" }),
                    /* @__PURE__ */ jsx13("feMergeNode", { in: "SourceGraphic" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsx13(
                CartesianGrid2,
                {
                  vertical: false,
                  stroke: "currentColor",
                  opacity: 0.06,
                  strokeDasharray: "4 8"
                }
              ),
              /* @__PURE__ */ jsx13(
                XAxis2,
                {
                  dataKey: "label",
                  tick: {
                    fontSize: 12,
                    fill: "currentColor"
                  },
                  tickLine: false,
                  axisLine: false,
                  interval: "preserveStartEnd",
                  minTickGap: 24,
                  tickFormatter: formatLabel,
                  padding: { left: 28, right: 8 }
                }
              ),
              /* @__PURE__ */ jsx13(
                YAxis2,
                {
                  width: 55,
                  tickFormatter: (v) => formatCompact(Number(v)),
                  tick: {
                    fontSize: 12,
                    fill: "currentColor"
                  },
                  tickLine: false,
                  axisLine: false
                }
              ),
              /* @__PURE__ */ jsx13(
                Tooltip2,
                {
                  wrapperStyle: {
                    outline: "none",
                    zIndex: 50,
                    maxWidth: "calc(100% - 24px)"
                  },
                  cursor: {
                    stroke: "rgba(148,163,184,0.35)",
                    strokeWidth: 1,
                    strokeDasharray: "4 6"
                  },
                  content: ({ active, payload, label }) => {
                    if (!active || !payload?.length) return null;
                    const xVal = payload.find((p) => p.dataKey === "x")?.value ?? 0;
                    const yVal = payload.find((p) => p.dataKey === "y")?.value ?? 0;
                    return /* @__PURE__ */ jsxs9(
                      "div",
                      {
                        className: "\r\n                        min-w-[180px]\r\n                        rounded-2xl\r\n                        border\r\n                        border-white/30\r\n                        dark:border-white/10\r\n                        bg-white/90\r\n                        dark:bg-[#0b0f15]/95\r\n                        px-4\r\n                        py-3\r\n                        text-xs\r\n                        text-titleText\r\n                        dark:text-titleText-dark\r\n                        shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)]\r\n                        backdrop-blur-xl\r\n                      ",
                        children: [
                          /* @__PURE__ */ jsx13("div", { className: "mb-3 max-w-[180px] truncate text-sm font-semibold", children: String(label) }),
                          /* @__PURE__ */ jsxs9("div", { className: "space-y-2", children: [
                            /* @__PURE__ */ jsxs9("div", { className: "flex items-center justify-between gap-6", children: [
                              /* @__PURE__ */ jsxs9("div", { className: "flex items-center gap-2 text-emerald-500", children: [
                                /* @__PURE__ */ jsx13("span", { className: "h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.85)]" }),
                                /* @__PURE__ */ jsx13("span", { className: "font-medium", children: assetLabel })
                              ] }),
                              /* @__PURE__ */ jsx13("span", { dir: "ltr", className: "font-semibold", children: formatCompact(Number(xVal)) })
                            ] }),
                            /* @__PURE__ */ jsxs9("div", { className: "flex items-center justify-between gap-6", children: [
                              /* @__PURE__ */ jsxs9("div", { className: "flex items-center gap-2 text-rose-500", children: [
                                /* @__PURE__ */ jsx13("span", { className: "h-2 w-2 rounded-full bg-rose-400 shadow-[0_0_12px_rgba(251,113,133,0.85)]" }),
                                /* @__PURE__ */ jsx13("span", { className: "font-medium", children: liabilityLabel })
                              ] }),
                              /* @__PURE__ */ jsx13("span", { dir: "ltr", className: "font-semibold", children: formatCompact(Number(yVal)) })
                            ] })
                          ] })
                        ]
                      }
                    );
                  }
                }
              ),
              /* @__PURE__ */ jsx13(
                Area,
                {
                  type: "monotone",
                  dataKey: "x",
                  fill: "url(#assetAreaGradient)",
                  stroke: "none",
                  activeDot: false,
                  isAnimationActive: true,
                  animationDuration: 800
                }
              ),
              /* @__PURE__ */ jsx13(
                Area,
                {
                  type: "monotone",
                  dataKey: "y",
                  fill: "url(#liabilityAreaGradient)",
                  stroke: "none",
                  activeDot: false,
                  isAnimationActive: true,
                  animationDuration: 800
                }
              ),
              /* @__PURE__ */ jsx13(
                Line,
                {
                  type: "monotone",
                  dataKey: "x",
                  name: assetLabel,
                  stroke: "url(#assetLineGradient)",
                  strokeWidth: 2,
                  dot: false,
                  activeDot: false,
                  filter: "url(#assetGlow)",
                  isAnimationActive: true,
                  animationDuration: 900
                }
              ),
              /* @__PURE__ */ jsx13(
                Line,
                {
                  type: "monotone",
                  dataKey: "y",
                  name: liabilityLabel,
                  stroke: "url(#liabilityLineGradient)",
                  strokeWidth: 2,
                  dot: false,
                  activeDot: false,
                  filter: "url(#liabilityGlow)",
                  isAnimationActive: true,
                  animationDuration: 900
                }
              )
            ]
          }
        ) }) })
      ]
    }
  ) });
};

// src/components/SingleBarChart/SingleBarChart.tsx
import {
  BarChart as BarChart2,
  Bar as Bar2,
  XAxis as XAxis3,
  YAxis as YAxis3,
  CartesianGrid as CartesianGrid3,
  Tooltip as Tooltip3,
  ResponsiveContainer as ResponsiveContainer3
} from "recharts";
import { jsx as jsx14, jsxs as jsxs10 } from "react/jsx-runtime";
var SingleBarChart = ({
  data,
  dataLabel = "Value",
  height = 320,
  className = "",
  barColor = "#3b82f6"
}) => {
  const formatCompact = (n) => {
    const abs = Math.abs(n);
    if (abs >= 1e9) return `${(n / 1e9).toFixed(1)}B`;
    if (abs >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
    if (abs >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
    return String(n);
  };
  return /* @__PURE__ */ jsx14("div", { className: `w-full max-w-full min-w-0 overflow-hidden ${className}`, children: /* @__PURE__ */ jsxs10(
    "div",
    {
      className: "relative w-full min-w-0 overflow-hidden border border-white/30 dark:border-white/10 bg-white/70 dark:bg-white/[0.04] backdrop-blur-2xl p-6 shadow-[0_25px_60px_-25px_rgba(0,0,0,0.45)] transition-all",
      style: { height },
      children: [
        /* @__PURE__ */ jsx14("div", { className: "pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-blue-400/10 blur-[120px]" }),
        /* @__PURE__ */ jsx14("div", { className: "relative h-full w-full min-w-0 overflow-hidden", children: /* @__PURE__ */ jsx14(ResponsiveContainer3, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs10(BarChart2, { data, margin: { top: 10, right: 20, left: 10, bottom: 20 }, children: [
          /* @__PURE__ */ jsx14("defs", { children: /* @__PURE__ */ jsxs10("linearGradient", { id: "singleBarGradient", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsx14("stop", { offset: "0%", stopColor: barColor, stopOpacity: 1 }),
            /* @__PURE__ */ jsx14("stop", { offset: "100%", stopColor: barColor, stopOpacity: 0.65 })
          ] }) }),
          /* @__PURE__ */ jsx14(CartesianGrid3, { vertical: false, stroke: "currentColor", opacity: 0.06 }),
          /* @__PURE__ */ jsx14(
            XAxis3,
            {
              dataKey: "label",
              tick: { fontSize: 12, fill: "currentColor" },
              tickLine: false,
              axisLine: false,
              interval: "preserveStartEnd",
              minTickGap: 10
            }
          ),
          /* @__PURE__ */ jsx14(
            YAxis3,
            {
              width: 55,
              tickFormatter: (v) => formatCompact(Number(v)),
              tick: { fontSize: 12, fill: "currentColor" },
              tickLine: false,
              axisLine: false
            }
          ),
          /* @__PURE__ */ jsx14(
            Tooltip3,
            {
              cursor: { fill: "rgba(255,255,255,0.05)" },
              content: ({ active, payload, label }) => {
                if (!active || !payload?.length) return null;
                const val = payload[0]?.value ?? 0;
                return /* @__PURE__ */ jsxs10(
                  "div",
                  {
                    className: "\r\n                        rounded-2xl\r\n                        border\r\n                        border-white/30\r\n                        dark:border-white/10\r\n                        bg-white/90\r\n                        dark:bg-[#0b0f15]\r\n                        px-4\r\n                        py-3\r\n                        text-xs\r\n                        shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)]\r\n                        backdrop-blur-xl\r\n                      ",
                    children: [
                      /* @__PURE__ */ jsx14("div", { className: "mb-2 font-semibold text-sm", children: label }),
                      /* @__PURE__ */ jsxs10("div", { className: "flex justify-between gap-6", children: [
                        /* @__PURE__ */ jsx14("span", { className: "font-medium", style: { color: barColor }, children: dataLabel }),
                        /* @__PURE__ */ jsx14("span", { dir: "ltr", className: "font-semibold", children: formatCompact(Number(val)) })
                      ] })
                    ]
                  }
                );
              }
            }
          ),
          /* @__PURE__ */ jsx14(
            Bar2,
            {
              dataKey: "value",
              name: dataLabel,
              fill: "url(#singleBarGradient)",
              radius: [14, 14, 6, 6],
              maxBarSize: 42,
              animationDuration: 600
            }
          )
        ] }) }) })
      ]
    }
  ) });
};

// src/components/SingleLineChart/SingleLineChart.tsx
import {
  Line as Line2,
  XAxis as XAxis4,
  YAxis as YAxis4,
  CartesianGrid as CartesianGrid4,
  Tooltip as Tooltip4,
  ResponsiveContainer as ResponsiveContainer4,
  Area as Area2,
  ComposedChart as ComposedChart2
} from "recharts";
import { jsx as jsx15, jsxs as jsxs11 } from "react/jsx-runtime";
var SingleLineChart = ({
  data,
  dataLabel = "Value",
  height = 320,
  className = "",
  color = "#10b981"
}) => {
  const formatCompact = (n) => {
    const abs = Math.abs(n);
    if (abs >= 1e9) return `${Number((n / 1e9).toFixed(1))}B`;
    if (abs >= 1e6) return `${Number((n / 1e6).toFixed(1))}M`;
    if (abs >= 1e3) return `${Number((n / 1e3).toFixed(1))}K`;
    return String(n);
  };
  const formatLabel = (value) => value.length > 10 ? `${value.slice(0, 10)}\u2026` : value;
  return /* @__PURE__ */ jsx15("div", { className: `w-full max-w-full min-w-0 overflow-hidden ${className}`, children: /* @__PURE__ */ jsxs11(
    "div",
    {
      className: "relative w-full min-w-0 overflow-hidden border border-white/30 dark:border-white/10 bg-white/70 dark:bg-white/[0.04] backdrop-blur-2xl p-6 shadow-[0_25px_60px_-25px_rgba(0,0,0,0.45)] transition-all",
      style: { height },
      children: [
        /* @__PURE__ */ jsx15("div", { className: "pointer-events-none absolute -top-32 -right-32 h-72 w-72 rounded-full bg-emerald-400/10 blur-[120px]" }),
        /* @__PURE__ */ jsx15("div", { className: "relative h-full w-full min-w-0 overflow-hidden", children: /* @__PURE__ */ jsx15(ResponsiveContainer4, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs11(ComposedChart2, { data, margin: { top: 10, right: 20, left: 10, bottom: 20 }, children: [
          /* @__PURE__ */ jsxs11("defs", { children: [
            /* @__PURE__ */ jsxs11("linearGradient", { id: "singleLineGradient", x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ jsx15("stop", { offset: "5%", stopColor: color, stopOpacity: 0.28 }),
              /* @__PURE__ */ jsx15("stop", { offset: "95%", stopColor: color, stopOpacity: 0 })
            ] }),
            /* @__PURE__ */ jsxs11("filter", { id: "singleLineGlow", x: "-20%", y: "-20%", width: "140%", height: "140%", children: [
              /* @__PURE__ */ jsx15("feGaussianBlur", { stdDeviation: "4", result: "blur" }),
              /* @__PURE__ */ jsx15("feComposite", { in: "SourceGraphic", in2: "blur", operator: "over" })
            ] })
          ] }),
          /* @__PURE__ */ jsx15(CartesianGrid4, { vertical: false, stroke: "currentColor", opacity: 0.06 }),
          /* @__PURE__ */ jsx15(
            XAxis4,
            {
              dataKey: "label",
              tick: { fontSize: 12, fill: "currentColor" },
              tickLine: false,
              axisLine: false,
              interval: "preserveStartEnd",
              minTickGap: 24,
              tickFormatter: formatLabel
            }
          ),
          /* @__PURE__ */ jsx15(
            YAxis4,
            {
              width: 55,
              tickFormatter: (v) => formatCompact(Number(v)),
              tick: { fontSize: 12, fill: "currentColor" },
              tickLine: false,
              axisLine: false
            }
          ),
          /* @__PURE__ */ jsx15(
            Tooltip4,
            {
              cursor: { stroke: "currentColor", strokeOpacity: 0.12, strokeWidth: 1 },
              content: ({ active, payload, label }) => {
                if (!active || !payload?.length) return null;
                const val = payload[0]?.value ?? 0;
                return /* @__PURE__ */ jsxs11(
                  "div",
                  {
                    className: "\r\n                        rounded-2xl\r\n                        border\r\n                        border-white/30\r\n                        dark:border-white/10\r\n                        bg-white/90\r\n                        dark:bg-[#0b0f15]\r\n                        px-4\r\n                        py-3\r\n                        text-xs\r\n                        shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)]\r\n                        backdrop-blur-xl\r\n                      ",
                    children: [
                      /* @__PURE__ */ jsx15("div", { className: "mb-2 font-semibold text-sm", children: label }),
                      /* @__PURE__ */ jsxs11("div", { className: "flex justify-between gap-6", children: [
                        /* @__PURE__ */ jsx15("span", { className: "font-medium", style: { color }, children: dataLabel }),
                        /* @__PURE__ */ jsx15("span", { dir: "ltr", className: "font-semibold", children: formatCompact(Number(val)) })
                      ] })
                    ]
                  }
                );
              }
            }
          ),
          /* @__PURE__ */ jsx15(
            Area2,
            {
              type: "monotone",
              dataKey: "value",
              stroke: "none",
              fill: "url(#singleLineGradient)",
              isAnimationActive: true
            }
          ),
          /* @__PURE__ */ jsx15(
            Line2,
            {
              type: "monotone",
              dataKey: "value",
              name: dataLabel,
              stroke: color,
              strokeWidth: 3,
              dot: false,
              activeDot: { r: 6, strokeWidth: 0, fill: color },
              filter: "url(#singleLineGlow)",
              animationDuration: 600
            }
          )
        ] }) }) })
      ]
    }
  ) });
};

// src/components/CircleChart/CircleChart.tsx
import { useMemo as useMemo4 } from "react";
import {
  ResponsiveContainer as ResponsiveContainer5,
  PieChart,
  Pie,
  Cell as Cell2,
  Tooltip as Tooltip5,
  Legend,
  Label
} from "recharts";
import { jsx as jsx16, jsxs as jsxs12 } from "react/jsx-runtime";
var DEFAULT_COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
  "#84CC16",
  "#F97316"
];
var formatValue = (value, unit) => `${value.toLocaleString()}${unit ? ` ${unit}` : ""}`;
function CircleChart({
  unit,
  data,
  height = 340,
  dir = "ltr",
  className = ""
}) {
  const safeData = useMemo4(
    () => (data || []).map((d, i) => ({
      ...d,
      value: Number.isFinite(d.value) ? d.value : 0,
      color: d.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length]
    })),
    [data]
  );
  const total = useMemo4(
    () => safeData.reduce((acc, cur) => acc + cur.value, 0),
    [safeData]
  );
  return /* @__PURE__ */ jsx16(
    "div",
    {
      dir,
      className: `w-full min-w-0 overflow-hidden rounded-2xl ${className}`,
      style: { maxWidth: "100%" },
      children: /* @__PURE__ */ jsx16("div", { className: "w-full min-w-0", style: { height }, children: /* @__PURE__ */ jsx16(ResponsiveContainer5, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs12(PieChart, { margin: { top: 8, right: 8, bottom: 8, left: 8 }, children: [
        /* @__PURE__ */ jsxs12(
          Pie,
          {
            data: safeData,
            dataKey: "value",
            nameKey: "label",
            cx: "50%",
            cy: "50%",
            innerRadius: "60%",
            outerRadius: "78%",
            paddingAngle: 0,
            stroke: "rgba(255,255,255,0.9)",
            strokeWidth: 0,
            isAnimationActive: false,
            labelLine: false,
            label: ({ percent }) => percent && percent >= 0.06 ? `${(percent * 100).toFixed(0)}%` : "",
            children: [
              safeData.map((entry, idx) => /* @__PURE__ */ jsx16(Cell2, { fill: entry.color }, `${entry.label}-${idx}`)),
              /* @__PURE__ */ jsx16(
                Label,
                {
                  position: "center",
                  content: ({ viewBox }) => {
                    const { cx, cy } = viewBox || {};
                    if (cx == null || cy == null) return null;
                    return /* @__PURE__ */ jsxs12("g", { children: [
                      /* @__PURE__ */ jsx16(
                        "text",
                        {
                          x: cx,
                          y: cy - 8,
                          textAnchor: "middle",
                          dominantBaseline: "central",
                          style: { fontSize: 12, fill: "#6B7280", fontWeight: 500 },
                          children: "Total"
                        }
                      ),
                      /* @__PURE__ */ jsx16(
                        "text",
                        {
                          x: cx,
                          y: cy + 14,
                          textAnchor: "middle",
                          dominantBaseline: "central",
                          style: { fontSize: 14, fill: "#111827", fontWeight: 700 },
                          children: formatValue(total, unit)
                        }
                      )
                    ] });
                  }
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx16(
          Tooltip5,
          {
            formatter: (value, _name, item) => [
              formatValue(value, unit),
              item?.payload?.label ?? ""
            ]
          }
        ),
        /* @__PURE__ */ jsx16(
          Legend,
          {
            verticalAlign: "bottom",
            align: "center",
            layout: "horizontal",
            wrapperStyle: {
              fontSize: 12,
              lineHeight: "20px",
              paddingTop: 8
            },
            formatter: (value, entry) => {
              const v = entry?.payload?.value ?? 0;
              return `${value} (${formatValue(v, unit)})`;
            }
          }
        )
      ] }) }) })
    }
  );
}

// src/components/TreeChart/TreeChart.tsx
import { useMemo as useMemo5, useState as useState10 } from "react";
import { Treemap, ResponsiveContainer as ResponsiveContainer6, Tooltip as Tooltip6 } from "recharts";
import { jsx as jsx17, jsxs as jsxs13 } from "react/jsx-runtime";
var PALETTE = [
  ["#4F46E5", "#6366F1"],
  ["#0EA5E9", "#06B6D4"],
  ["#14B8A6", "#22C55E"],
  ["#84CC16", "#A3E635"],
  ["#F59E0B", "#F97316"],
  ["#EF4444", "#F43F5E"],
  ["#D946EF", "#A855F7"],
  ["#8B5CF6", "#6366F1"]
];
var defaultFormat = (n) => {
  const abs = Math.abs(n);
  if (abs >= 1e9) return `${(n / 1e9).toFixed(1)}B`;
  if (abs >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  if (abs >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
  return Number(n).toLocaleString("en-US");
};
var TreemapCell = ({
  x,
  y,
  width,
  height,
  index,
  depth,
  payload,
  name,
  value,
  total,
  hoveredKey,
  setHoveredKey,
  showValueInCell,
  showShareInCell,
  valueUnit,
  formatValue: formatValue2
}) => {
  const cellName = String(payload?.name ?? name ?? "");
  const symbol = String(payload?.symbol ?? cellName ?? "");
  const v = Number(payload?.value ?? value ?? 0);
  const pct = total > 0 ? v / total * 100 : 0;
  const key = `${cellName}-${symbol}-${index}`;
  const isHovered = hoveredKey === key;
  const isDimmed = hoveredKey !== null && !isHovered;
  const showMain = width > 84 && height > 46;
  const showSub = width > 120 && height > 78;
  const [c1, c2] = PALETTE[index % PALETTE.length];
  const gradId = `tm-grad-${index}`;
  const glowId = `tm-glow-${index}`;
  if (depth !== 1) {
    return /* @__PURE__ */ jsx17("g", { children: /* @__PURE__ */ jsx17(
      "rect",
      {
        x,
        y,
        width,
        height,
        rx: 10,
        ry: 10,
        fill: "rgba(255,255,255,0.06)",
        stroke: "rgba(255,255,255,0.14)"
      }
    ) });
  }
  return /* @__PURE__ */ jsxs13(
    "g",
    {
      onMouseEnter: () => setHoveredKey(key),
      onMouseLeave: () => setHoveredKey(null),
      style: { transition: "all .18s ease" },
      children: [
        /* @__PURE__ */ jsxs13("defs", { children: [
          /* @__PURE__ */ jsxs13("linearGradient", { id: gradId, x1: "0", y1: "0", x2: "1", y2: "1", children: [
            /* @__PURE__ */ jsx17("stop", { offset: "0%", stopColor: c1, stopOpacity: isDimmed ? 0.55 : 0.95 }),
            /* @__PURE__ */ jsx17("stop", { offset: "100%", stopColor: c2, stopOpacity: isDimmed ? 0.5 : 0.9 })
          ] }),
          /* @__PURE__ */ jsxs13("filter", { id: glowId, x: "-20%", y: "-20%", width: "140%", height: "140%", children: [
            /* @__PURE__ */ jsx17("feGaussianBlur", { stdDeviation: isHovered ? "8" : "5", result: "blur" }),
            /* @__PURE__ */ jsxs13("feMerge", { children: [
              /* @__PURE__ */ jsx17("feMergeNode", { in: "blur" }),
              /* @__PURE__ */ jsx17("feMergeNode", { in: "SourceGraphic" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx17(
          "rect",
          {
            x,
            y,
            width,
            height,
            rx: 12,
            ry: 12,
            fill: `url(#${gradId})`,
            stroke: isHovered ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.55)",
            strokeWidth: isHovered ? 1.4 : 1,
            filter: `url(#${glowId})`,
            opacity: isDimmed ? 0.55 : 1
          }
        ),
        /* @__PURE__ */ jsx17(
          "rect",
          {
            x: x + 5,
            y: y + 5,
            width: Math.max(0, width - 10),
            height: Math.max(0, height - 10),
            rx: 9,
            ry: 9,
            fill: "rgba(0,0,0,0.08)",
            opacity: showMain ? 1 : 0
          }
        ),
        showMain && /* @__PURE__ */ jsxs13(
          "text",
          {
            x: x + width / 2,
            y: y + height / 2,
            textAnchor: "middle",
            dominantBaseline: "central",
            fill: "#fff",
            style: {
              paintOrder: "stroke",
              stroke: "rgba(0,0,0,0.30)",
              strokeWidth: 3
            },
            children: [
              /* @__PURE__ */ jsx17("tspan", { x: x + width / 2, dy: showSub ? "-0.85em" : "-0.2em", fontSize: 13, fontWeight: 800, children: symbol }),
              showSub && showValueInCell && /* @__PURE__ */ jsxs13("tspan", { x: x + width / 2, dy: "1.35em", fontSize: 11, fontWeight: 600, opacity: 0.98, children: [
                formatValue2(v),
                valueUnit ? ` ${valueUnit}` : ""
              ] }),
              showSub && showShareInCell && /* @__PURE__ */ jsxs13("tspan", { x: x + width / 2, dy: "1.2em", fontSize: 11, fontWeight: 500, opacity: 0.9, children: [
                pct.toFixed(1),
                "%"
              ] })
            ]
          }
        )
      ]
    }
  );
};
var TreeChart = ({
  data,
  height = 340,
  className = "",
  aspectRatio = 4 / 3,
  valueUnit = "",
  valueLabel = "Value",
  shareLabel = "Share",
  showValueInCell = true,
  showShareInCell = true,
  formatValue: formatValue2 = defaultFormat
}) => {
  const [hoveredKey, setHoveredKey] = useState10(null);
  const safeData = data ?? [];
  const total = useMemo5(
    () => safeData.reduce((s, i) => s + Number(i.value || 0), 0),
    [safeData]
  );
  return /* @__PURE__ */ jsx17("div", { className: `w-full min-w-0 max-w-full overflow-hidden ${className}`, style: { height }, children: /* @__PURE__ */ jsxs13("div", { className: "relative h-full w-full overflow-hidden rounded-3xl border border-white/20 dark:border-white/10 bg-white/40 dark:bg-white/[0.03] backdrop-blur-xl p-2", children: [
    /* @__PURE__ */ jsx17("div", { className: "pointer-events-none absolute -top-24 -right-24 h-52 w-52 rounded-full bg-indigo-500/20 blur-[80px]" }),
    /* @__PURE__ */ jsx17("div", { className: "pointer-events-none absolute -bottom-24 -left-24 h-52 w-52 rounded-full bg-cyan-500/20 blur-[80px]" }),
    /* @__PURE__ */ jsx17("div", { className: "relative h-full w-full", children: safeData.length === 0 ? /* @__PURE__ */ jsx17("div", { className: "flex h-full items-center justify-center text-sm text-slate-500 dark:text-slate-400", children: "\u062F\u0627\u062F\u0647\u200C\u0627\u06CC \u0628\u0631\u0627\u06CC \u0646\u0645\u0627\u06CC\u0634 \u0648\u062C\u0648\u062F \u0646\u062F\u0627\u0631\u062F." }) : /* @__PURE__ */ jsx17(ResponsiveContainer6, { width: "100%", height: "100%", children: /* @__PURE__ */ jsx17(
      Treemap,
      {
        data: safeData,
        dataKey: "value",
        nameKey: "symbol",
        aspectRatio,
        isAnimationActive: true,
        animationDuration: 500,
        content: (props) => /* @__PURE__ */ jsx17(
          TreemapCell,
          {
            ...props,
            total,
            hoveredKey,
            setHoveredKey,
            showValueInCell,
            showShareInCell,
            valueUnit,
            formatValue: formatValue2
          }
        ),
        children: /* @__PURE__ */ jsx17(
          Tooltip6,
          {
            content: ({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const d = payload[0].payload;
              const v = Number(d?.value || 0);
              const pct = total > 0 ? v / total * 100 : 0;
              return /* @__PURE__ */ jsxs13(
                "div",
                {
                  className: "\r\n                          rounded-2xl border border-white/30 dark:border-white/10\r\n                          bg-white/90 dark:bg-[#0b0f15]\r\n                          px-4 py-3 text-xs\r\n                          shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)]\r\n                          backdrop-blur-xl\r\n                        ",
                  children: [
                    /* @__PURE__ */ jsxs13("div", { className: "mb-2 font-semibold text-sm", children: [
                      d?.name,
                      " ",
                      d?.symbol ? /* @__PURE__ */ jsxs13("span", { className: "opacity-70", children: [
                        "(",
                        d.symbol,
                        ")"
                      ] }) : null
                    ] }),
                    /* @__PURE__ */ jsxs13("div", { className: "flex justify-between gap-6", children: [
                      /* @__PURE__ */ jsx17("span", { className: "font-medium", children: valueLabel }),
                      /* @__PURE__ */ jsxs13("span", { dir: "ltr", className: "font-semibold", children: [
                        formatValue2(v),
                        valueUnit ? ` ${valueUnit}` : ""
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs13("div", { className: "mt-1 flex justify-between gap-6", children: [
                      /* @__PURE__ */ jsx17("span", { className: "font-medium opacity-80", children: shareLabel }),
                      /* @__PURE__ */ jsxs13("span", { dir: "ltr", className: "font-semibold", children: [
                        pct.toFixed(1),
                        "%"
                      ] })
                    ] })
                  ]
                }
              );
            }
          }
        )
      }
    ) }) })
  ] }) });
};

// src/components/Tabs/Tabs.tsx
import React13, {
  useState as useState11,
  useRef as useRef6,
  useLayoutEffect as useLayoutEffect2,
  useEffect as useEffect8
} from "react";
import { jsx as jsx18, jsxs as jsxs14 } from "react/jsx-runtime";
var TabsContext = React13.createContext(null);
function useTabsContext() {
  const ctx = React13.useContext(TabsContext);
  if (!ctx) throw new Error("Tabs components must be used inside <Tabs />");
  return ctx;
}
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
function Tabs({ defaultValue, children, className }) {
  const [active, setActive] = useState11(defaultValue);
  return /* @__PURE__ */ jsx18(TabsContext.Provider, { value: { active, setActive }, children: /* @__PURE__ */ jsx18("div", { className, children }) });
}
function TabsList({ children, className }) {
  const { active } = useTabsContext();
  const wrapRef = useRef6(null);
  const listRef = useRef6(null);
  const [indicator, setIndicator] = useState11({
    width: 0,
    x: 0,
    rtl: false,
    ready: false
  });
  const updateIndicator = React13.useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    const activeEl = list.querySelector(`[data-value="${active}"]`);
    if (!activeEl) return;
    const listRect = list.getBoundingClientRect();
    const elRect = activeEl.getBoundingClientRect();
    const dir = getComputedStyle(list).direction;
    const rtl = dir === "rtl";
    const width = elRect.width;
    const x = rtl ? listRect.right - elRect.right : elRect.left - listRect.left;
    setIndicator({
      width,
      x,
      rtl,
      ready: true
    });
  }, [active]);
  useLayoutEffect2(() => {
    updateIndicator();
  }, [updateIndicator, children]);
  useEffect8(() => {
    const onResize = () => updateIndicator();
    window.addEventListener("resize", onResize);
    if ("fonts" in document) {
      document.fonts?.ready?.then?.(updateIndicator);
    }
    return () => window.removeEventListener("resize", onResize);
  }, [updateIndicator]);
  return /* @__PURE__ */ jsx18(
    "div",
    {
      ref: wrapRef,
      className: cn(
        "relative w-fit max-w-full overflow-x-auto border-b border-border",
        className
      ),
      children: /* @__PURE__ */ jsxs14("div", { ref: listRef, className: "relative flex items-center gap-6", children: [
        children,
        /* @__PURE__ */ jsx18(
          "span",
          {
            "aria-hidden": true,
            className: cn(
              "pointer-events-none absolute bottom-0 h-0.5 rounded-full bg-primary",
              "transition-[left,right,width,opacity] duration-300 ease-out",
              indicator.ready ? "opacity-100" : "opacity-0"
            ),
            style: {
              width: `${indicator.width}px`,
              left: indicator.rtl ? "auto" : `${indicator.x}px`,
              right: indicator.rtl ? `${indicator.x}px` : "auto"
            }
          }
        )
      ] })
    }
  );
}
function TabsTrigger({
  value,
  children,
  className
}) {
  const { active, setActive } = useTabsContext();
  const isActive = active === value;
  return /* @__PURE__ */ jsx18(
    "span",
    {
      "data-value": value,
      onClick: () => setActive(value),
      className: cn(
        "select-none cursor-pointer pb-3 text-sm font-medium whitespace-nowrap",
        "transition-colors duration-200",
        isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
        className
      ),
      children
    }
  );
}
function TabsContent({
  value,
  children,
  className
}) {
  const { active } = useTabsContext();
  if (active !== value) return null;
  return /* @__PURE__ */ jsx18("div", { className: cn("pt-4", className), children });
}

// src/components/Table/Table.tsx
import React14, { useMemo as useMemo6, useState as useState12, useCallback as useCallback2 } from "react";
import { jsx as jsx19, jsxs as jsxs15 } from "react/jsx-runtime";
function cn2(...xs) {
  return xs.filter(Boolean).join(" ");
}
function getAlignClass(a) {
  if (a === "center") return "text-center";
  if (a === "end") return "text-left rtl:text-right ltr:text-right";
  return "text-right rtl:text-right ltr:text-left";
}
function ExpandableTable(props) {
  const {
    data,
    columns,
    className,
    pageSize,
    getRowId,
    getSubRows = (r) => r.subRows,
    onRowClick,
    defaultExpandedIds = [],
    renderProgress,
    rowDetails,
    rowDetailsClassName,
    toolbarSlot,
    footerSlot
  } = props;
  const computeId = useCallback2(
    (row, path) => row.id ? String(row.id) : getRowId ? getRowId(row, path) : path,
    [getRowId]
  );
  const flatten = useCallback2(
    (rows, level = 0, parentPath = "", parentId) => {
      const out = [];
      rows.forEach((r, idx) => {
        const path = parentPath ? `${parentPath}.${idx}` : `${idx}`;
        const id = computeId(r, path);
        out.push({ row: r, level, id, path, parent: parentId });
        const children = getSubRows(r);
        if (children?.length) out.push(...flatten(children, level + 1, path, id));
      });
      return out;
    },
    [computeId, getSubRows]
  );
  const flat = useMemo6(() => flatten(data), [data, flatten]);
  const [expanded, setExpanded] = useState12(new Set(defaultExpandedIds));
  const [page, setPage] = useState12(1);
  const toggle = useCallback2((id) => {
    setExpanded((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  }, []);
  const childrenOf = useCallback2((id) => flat.filter((f) => f.parent === id), [flat]);
  const roots = useMemo6(() => flat.filter((f) => f.level === 0), [flat]);
  const total = roots.length;
  const pageCount = pageSize ? Math.max(1, Math.ceil(total / pageSize)) : 1;
  const currentPage = Math.min(page, pageCount);
  const paginated = useMemo6(() => {
    if (!pageSize) return roots;
    const start = (currentPage - 1) * pageSize;
    return roots.slice(start, start + pageSize);
  }, [roots, pageSize, currentPage]);
  const renderCell = useCallback2(
    (col, row) => {
      if (col.cell) return col.cell(row);
      if (col.accessorKey) {
        const v = row[col.accessorKey];
        if (typeof v === "number" && col.accessorKey.toString().toLowerCase().includes("progress") && renderProgress) {
          return renderProgress(v);
        }
        return String(v ?? "");
      }
      return null;
    },
    [renderProgress]
  );
  return /* @__PURE__ */ jsxs15("div", { className: cn2("w-full", className), children: [
    toolbarSlot && /* @__PURE__ */ jsx19("div", { className: "mb-4", children: toolbarSlot }),
    /* @__PURE__ */ jsx19("div", { className: "lux-table-wrap overflow-visible", children: /* @__PURE__ */ jsxs15("table", { className: "lux-table w-full border-separate border-spacing-y-2", children: [
      /* @__PURE__ */ jsx19("thead", { className: "lux-table-head", children: /* @__PURE__ */ jsx19("tr", { children: columns.map((c, i) => /* @__PURE__ */ jsx19(
        "th",
        {
          className: cn2("lux-th", getAlignClass(c.align)),
          style: c.width ? { width: c.width } : void 0,
          children: c.header
        },
        i
      )) }) }),
      /* @__PURE__ */ jsxs15("tbody", { children: [
        paginated.map((node, rowIndex) => {
          const kids = childrenOf(node.id);
          const hasChildren = kids.length > 0;
          const detailNodes = hasChildren && rowDetails ? kids.flatMap((k, ki) => {
            const raw = React14.Children.toArray(rowDetails(k.row));
            return raw.map((child, i) => /* @__PURE__ */ jsx19(React14.Fragment, { children: child }, `detail-${node.path}-${ki}-${i}`));
          }) : [];
          const hasDetails = detailNodes.length > 0;
          const canExpand = hasChildren && hasDetails;
          const isOpen = expanded.has(node.id);
          const showDetails = isOpen && hasDetails;
          return /* @__PURE__ */ jsxs15(React14.Fragment, { children: [
            /* @__PURE__ */ jsx19(
              "tr",
              {
                onClick: () => onRowClick?.(node.row),
                className: cn2(
                  "group transition-colors",
                  rowIndex % 2 === 0 ? "[&>td]:bg-slate-50 dark:[&>td]:bg-slate-900/40" : "[&>td]:bg-slate-100 dark:[&>td]:bg-slate-800/55",
                  "hover:[&>td]:!bg-sky-100 dark:hover:[&>td]:!bg-sky-900/35"
                ),
                children: columns.map((c, ci) => /* @__PURE__ */ jsx19(
                  "td",
                  {
                    className: cn2(
                      "lux-td px-4 py-3 align-middle transition-colors",
                      "first:rounded-r-xl last:rounded-l-xl",
                      "hover:!bg-inherit",
                      getAlignClass(c.align),
                      c.className
                    ),
                    style: c.width ? { width: c.width } : void 0,
                    children: ci === 0 ? /* @__PURE__ */ jsxs15(
                      "div",
                      {
                        className: "flex items-center gap-2",
                        style: { paddingInlineStart: `${node.level * 1.25}rem` },
                        children: [
                          canExpand ? /* @__PURE__ */ jsxs15(
                            "button",
                            {
                              onClick: (e) => {
                                e.stopPropagation();
                                toggle(node.id);
                              },
                              className: cn2(
                                "relative inline-flex h-9 w-9 items-center justify-center rounded-xl",
                                "border border-solid border-slate-200/90 dark:border-slate-700/90",
                                "bg-gradient-to-b from-white to-slate-50 dark:from-slate-800 dark:to-slate-900",
                                "text-slate-600 dark:text-slate-200",
                                "shadow-[0_1px_2px_rgba(0,0,0,0.08),0_6px_14px_rgba(0,0,0,0.06)]",
                                "transition-all duration-200",
                                "hover:shadow-[0_2px_6px_rgba(14,165,233,0.18),0_10px_18px_rgba(14,165,233,0.14)]",
                                "hover:border-sky-300 dark:hover:border-sky-700",
                                "hover:text-sky-700 dark:hover:text-sky-300",
                                "active:translate-y-0 active:scale-95",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/45"
                              ),
                              "aria-label": isOpen ? "\u0628\u0633\u062A\u0646 \u062C\u0632\u0626\u06CC\u0627\u062A" : "\u0628\u0627\u0632 \u06A9\u0631\u062F\u0646 \u062C\u0632\u0626\u06CC\u0627\u062A",
                              title: isOpen ? "\u0628\u0633\u062A\u0646 \u062C\u0632\u0626\u06CC\u0627\u062A" : "\u0628\u0627\u0632 \u06A9\u0631\u062F\u0646 \u062C\u0632\u0626\u06CC\u0627\u062A",
                              children: [
                                /* @__PURE__ */ jsx19("span", { className: "absolute inset-0 rounded-xl bg-sky-400/0 transition-colors duration-200 hover:bg-sky-400/5" }),
                                /* @__PURE__ */ jsx19(
                                  "svg",
                                  {
                                    viewBox: "0 0 24 24",
                                    className: cn2(
                                      "relative z-10 h-4 w-4 transition-transform duration-200",
                                      isOpen ? "rotate-90" : "rotate-0"
                                    ),
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "2.2",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    children: /* @__PURE__ */ jsx19("path", { d: "M9 6l6 6-6 6" })
                                  }
                                )
                              ]
                            }
                          ) : null,
                          /* @__PURE__ */ jsx19("span", { children: renderCell(c, node.row) })
                        ]
                      }
                    ) : renderCell(c, node.row)
                  },
                  ci
                ))
              }
            ),
            showDetails && /* @__PURE__ */ jsx19("tr", { className: "lux-details-row", children: /* @__PURE__ */ jsx19("td", { colSpan: columns.length, className: "p-0", children: /* @__PURE__ */ jsx19(
              "div",
              {
                className: cn2(
                  "mx-1 mb-2 rounded-xl border border-slate-200 bg-white px-5 py-4 dark:border-slate-700 dark:bg-slate-900",
                  rowDetailsClassName
                ),
                children: /* @__PURE__ */ jsx19("div", { className: "flex flex-col gap-3", children: detailNodes })
              }
            ) }) })
          ] }, `row-${node.path}`);
        }),
        paginated.length === 0 && /* @__PURE__ */ jsx19("tr", { children: /* @__PURE__ */ jsx19("td", { colSpan: columns.length, className: "py-10 text-center text-sm text-muted-foreground", children: "\u062F\u0627\u062F\u0647\u200C\u0627\u06CC \u0648\u062C\u0648\u062F \u0646\u062F\u0627\u0631\u062F" }) })
      ] })
    ] }) }),
    pageSize && pageCount > 1 && /* @__PURE__ */ jsxs15("div", { className: "mt-4 flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxs15("div", { className: "text-sm text-muted-foreground", children: [
        "\u0635\u0641\u062D\u0647 ",
        currentPage,
        " \u0627\u0632 ",
        pageCount
      ] }),
      /* @__PURE__ */ jsxs15("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx19(
          "button",
          {
            className: "h-9 rounded-lg border border-border px-3 text-sm disabled:opacity-50",
            disabled: currentPage <= 1,
            onClick: () => setPage((p) => Math.max(1, p - 1)),
            children: "\u0642\u0628\u0644\u06CC"
          }
        ),
        /* @__PURE__ */ jsx19(
          "button",
          {
            className: "h-9 rounded-lg border border-border px-3 text-sm disabled:opacity-50",
            disabled: currentPage >= pageCount,
            onClick: () => setPage((p) => Math.min(pageCount, p + 1)),
            children: "\u0628\u0639\u062F\u06CC"
          }
        )
      ] })
    ] }),
    footerSlot
  ] });
}

// src/components/Badge/Badge.tsx
import clsx6 from "clsx";
import { jsx as jsx20 } from "react/jsx-runtime";
var styles = {
  green: {
    soft: `
      bg-emerald-100 text-emerald-700 border border-emerald-200
      dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800
    `,
    solid: `
      bg-emerald-600 text-white border border-emerald-600
      dark:bg-emerald-500 dark:text-white dark:border-emerald-500
    `,
    outline: `
      bg-transparent text-emerald-700 border border-emerald-300
      dark:text-emerald-300 dark:border-emerald-700
    `
  },
  red: {
    soft: `
      bg-rose-100 text-rose-700 border border-rose-200
      dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-800
    `,
    solid: `
      bg-rose-600 text-white border border-rose-600
      dark:bg-rose-500 dark:text-white dark:border-rose-500
    `,
    outline: `
      bg-transparent text-rose-700 border border-rose-300
      dark:text-rose-300 dark:border-rose-700
    `
  },
  blue: {
    soft: `
      bg-sky-100 text-sky-700 border border-sky-200
      dark:bg-sky-900/30 dark:text-sky-300 dark:border-sky-800
    `,
    solid: `
      bg-sky-600 text-white border border-sky-600
      dark:bg-sky-500 dark:text-white dark:border-sky-500
    `,
    outline: `
      bg-transparent text-sky-700 border border-sky-300
      dark:text-sky-300 dark:border-sky-700
    `
  },
  yellow: {
    soft: `
      bg-amber-100 text-amber-800 border border-amber-200
      dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800
    `,
    solid: `
      bg-amber-500 text-black border border-amber-500
      dark:bg-amber-400 dark:text-black dark:border-amber-400
    `,
    outline: `
      bg-transparent text-amber-800 border border-amber-300
      dark:text-amber-300 dark:border-amber-700
    `
  },
  purple: {
    soft: `
      bg-violet-100 text-violet-700 border border-violet-200
      dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-800
    `,
    solid: `
      bg-violet-600 text-white border border-violet-600
      dark:bg-violet-500 dark:text-white dark:border-violet-500
    `,
    outline: `
      bg-transparent text-violet-700 border border-violet-300
      dark:text-violet-300 dark:border-violet-700
    `
  }
};
function Badge({
  color = "blue",
  variant = "soft",
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx20(
    "span",
    {
      className: clsx6(
        "inline-flex items-center rounded-full px-3 py-2 text-xs font-semibold leading-none whitespace-nowrap",
        styles[color][variant],
        className
      ),
      ...props,
      children
    }
  );
}

// src/components/Loader/Loader.tsx
import clsx7 from "clsx";
import { jsx as jsx21, jsxs as jsxs16 } from "react/jsx-runtime";
function Loader({
  mode = "normal",
  text = "\u062F\u0631 \u062D\u0627\u0644 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC...",
  count = 4,
  skeletonHeight = 14,
  withAvatar = false,
  className,
  ...props
}) {
  if (mode === "skeleton") {
    return /* @__PURE__ */ jsx21("div", { className: clsx7("w-full", className), ...props, children: /* @__PURE__ */ jsx21("div", { className: "w-full rounded-2xl ", children: /* @__PURE__ */ jsx21("div", { className: "space-y-3", children: Array.from({ length: Math.max(1, count) }).map((_, i) => /* @__PURE__ */ jsxs16("div", { className: "flex items-center gap-3", children: [
      withAvatar && /* @__PURE__ */ jsx21("div", { className: "relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800", children: /* @__PURE__ */ jsx21("div", { className: "absolute inset-0 -translate-x-full animate-[shimmer_1.6s_linear_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-white/10" }) }),
      /* @__PURE__ */ jsxs16("div", { className: "flex-1 space-y-2", children: [
        /* @__PURE__ */ jsx21(
          "div",
          {
            className: "relative w-full overflow-hidden rounded-md bg-slate-200 dark:bg-slate-800",
            style: { height: skeletonHeight },
            children: /* @__PURE__ */ jsx21("div", { className: "absolute inset-0 -translate-x-full animate-[shimmer_1.6s_linear_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-white/10" })
          }
        ),
        /* @__PURE__ */ jsx21(
          "div",
          {
            className: "relative overflow-hidden rounded-md bg-slate-200 dark:bg-slate-800",
            style: {
              height: Math.max(10, skeletonHeight - 2),
              width: i % 2 === 0 ? "70%" : "55%"
            },
            children: /* @__PURE__ */ jsx21("div", { className: "absolute inset-0 -translate-x-full animate-[shimmer_1.6s_linear_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-white/10" })
          }
        )
      ] })
    ] }, i)) }) }) });
  }
  return /* @__PURE__ */ jsx21(
    "div",
    {
      className: clsx7(
        "w-full rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-8 dark:border-slate-700/80 dark:bg-slate-900/60",
        className
      ),
      role: "status",
      "aria-live": "polite",
      ...props,
      children: /* @__PURE__ */ jsxs16("div", { className: "flex w-full flex-col items-center justify-center", children: [
        /* @__PURE__ */ jsxs16(
          "svg",
          {
            className: "h-10 w-10 animate-spin",
            viewBox: "0 0 24 24",
            "aria-hidden": "true",
            children: [
              /* @__PURE__ */ jsx21(
                "circle",
                {
                  cx: "12",
                  cy: "12",
                  r: "9",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "3",
                  className: "text-slate-300 dark:text-slate-700",
                  opacity: "0.35"
                }
              ),
              /* @__PURE__ */ jsx21(
                "path",
                {
                  d: "M21 12a9 9 0 0 0-9-9",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "3",
                  strokeLinecap: "round",
                  className: "text-sky-500 dark:text-sky-400"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx21("p", { className: "mt-3 text-sm font-medium text-slate-600 dark:text-slate-300", children: text })
      ] })
    }
  );
}

// src/components/PageLoader/PageLoader.tsx
import { jsx as jsx22 } from "react/jsx-runtime";
var PageLoader = () => {
  /* @__PURE__ */ jsx22("div", { className: "fixed inset-0 z-50 grid place-items-center bg-white/70 dark:bg-bgColor-dark/70 backdrop-blur-sm", children: /* @__PURE__ */ jsx22("div", { className: "pointer-events-none", children: /* @__PURE__ */ jsx22(AnimatedParagraph, { text: "asd" }) }) });
};
export {
  Badge,
  Box,
  Button,
  ButtonSelect,
  CircleChart,
  DatePicker,
  DoubleBarChart,
  DoubleLineChart,
  ExpandableTable,
  HashText,
  Header,
  Loader,
  Modal,
  Navbar,
  PageLoader,
  SearchableSelect,
  SingleBarChart,
  SingleLineChart,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  ThemeProvider,
  TreeChart,
  useTheme
};
//# sourceMappingURL=index.mjs.map
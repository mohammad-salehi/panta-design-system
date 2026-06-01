"use client";

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Button: () => Button,
  DatePicker: () => DatePicker,
  Header: () => Header,
  Modal: () => Modal,
  Navbar: () => Navbar,
  SearchableSelect: () => SearchableSelect,
  ThemeProvider: () => ThemeProvider,
  useTheme: () => useTheme
});
module.exports = __toCommonJS(index_exports);

// src/components/Button/Button.tsx
var import_react = __toESM(require("react"));
var import_jsx_runtime = require("react/jsx-runtime");
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
var Button = import_react.default.forwardRef(
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
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
var import_react2 = require("react");
var import_jsx_runtime2 = require("react/jsx-runtime");
var ThemeContext = (0, import_react2.createContext)(void 0);
var ThemeProvider = ({ children }) => {
  const [theme, setTheme] = (0, import_react2.useState)("light");
  (0, import_react2.useEffect)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ThemeContext.Provider, { value: { theme, setTheme: handleSetTheme }, children });
};
var useTheme = () => {
  const context = (0, import_react2.useContext)(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};

// src/components/Header/Header.tsx
var import_react3 = require("react");
var import_jsx_runtime3 = require("react/jsx-runtime");
function Header({ title = "\u0633\u0627\u0645\u0627\u0646\u0647 \u0646\u0638\u0627\u0631\u062A \u0628\u0631 \u06A9\u0627\u0631\u06AF\u0632\u0627\u0631\u06CC\u200C\u0647\u0627\u06CC \u0645\u0628\u0627\u062F\u0644\u0647 \u0631\u0645\u0632\u0627\u0631\u0632 \u0627\u06CC\u0631\u0627\u0646" }) {
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === "dark";
  const [isOpen, setIsOpen] = (0, import_react3.useState)(true);
  const [isMobileOpen, setIsMobileOpen] = (0, import_react3.useState)(false);
  const [profileOpen, setProfileOpen] = (0, import_react3.useState)(false);
  const triggerRef = (0, import_react3.useRef)(null);
  const menuRef = (0, import_react3.useRef)(null);
  const [menuPos, setMenuPos] = (0, import_react3.useState)({ top: 0, right: 0, width: 240 });
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
  (0, import_react3.useLayoutEffect)(() => {
    if (profileOpen) updateMenuPosition();
  }, [profileOpen]);
  (0, import_react3.useEffect)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
    "header",
    {
      className: "hidden lg:flex mx-8 h-18 items-stretch justify-between shadow-sm px-6 lux-panel rounded-t-none",
      children: [
        isMobileOpen && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "div",
          {
            className: "fixed top-0 left-0 right-0 bottom-0 bg-gray-500 opacity-50 z-40",
            onClick: closeSidebar
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "flex items-center gap-5", children: isOpen ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "relative flex items-center gap-1 text-titleText dark:text-titleText-dark font-bold", children: title }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "text-titleText dark:text-titleText-dark", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "svg",
          {
            className: "cursor-pointer",
            width: "28px",
            height: "28px",
            viewBox: "0 0 24 24",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            onClick: () => setIsMobileOpen(true),
            children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "flex items-center p-4 pl-0", children: isOpen ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "button",
          {
            className: "flex items-center justify-center transition ml-2 h-9 w-9 lux-btn",
            onClick: toggleDarkMode,
            children: isDarkMode ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { width: "20px", height: "20px", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "path",
              {
                d: "M21.0672 11.8568L20.4253 11.469L21.0672 11.8568ZM12.1432 2.93276L11.7553 2.29085V2.29085L12.1432 2.93276ZM7.37554 20.013C7.017 19.8056 6.5582 19.9281 6.3508 20.2866C6.14339 20.6452 6.26591 21.104 6.62446 21.3114L7.37554 20.013ZM2.68862 17.3755C2.89602 17.7341 3.35482 17.8566 3.71337 17.6492C4.07191 17.4418 4.19443 16.983 3.98703 16.6245L2.68862 17.3755ZM21.25 12C21.25 17.1086 17.1086 21.25 12 21.25V22.75C17.9371 22.75 22.75 17.9371 22.75 12H21.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75V1.25C6.06294 1.25 1.25 6.06294 1.25 12H2.75ZM15.5 14.25C12.3244 14.25 9.75 11.6756 9.75 8.5H8.25C8.25 12.5041 11.4959 15.75 15.5 15.75V14.25ZM20.4253 11.469C19.4172 13.1373 17.5882 14.25 15.5 14.25V15.75C18.1349 15.75 20.4407 14.3439 21.7092 12.2447L20.4253 11.469ZM9.75 8.5C9.75 6.41182 10.8627 4.5828 12.531 3.57467L11.7553 2.29085C9.65609 3.5593 8.25 5.86509 8.25 8.5H9.75ZM12 2.75C11.9115 2.75 11.8077 2.71008 11.7324 2.63168C11.6686 2.56527 11.6538 2.50244 11.6503 2.47703C11.6461 2.44587 11.6482 2.35557 11.7553 2.29085L12.531 3.57467C13.0342 3.27065 13.196 2.71398 13.1368 2.27627C13.0754 1.82126 12.7166 1.25 12 1.25V2.75ZM21.7092 12.2447C21.6444 12.3518 21.5541 12.3539 21.523 12.3497C21.4976 12.3462 21.4347 12.3314 21.3683 12.2676C21.2899 12.1923 21.25 12.0885 21.25 12H22.75C22.75 11.2834 22.1787 10.9246 21.7237 10.8632C21.286 10.804 20.7293 10.9658 20.4253 11.469L21.7092 12.2447ZM12 21.25C10.3139 21.25 8.73533 20.7996 7.37554 20.013L6.62446 21.3114C8.2064 22.2265 10.0432 22.75 12 22.75V21.25ZM3.98703 16.6245C3.20043 15.2647 2.75 13.6861 2.75 12H1.25C1.25 13.9568 1.77351 15.7936 2.68862 17.3755L3.98703 16.6245Z",
                stroke: "currentColor",
                strokeWidth: "1.5",
                strokeLinecap: "round",
                strokeLinejoin: "round"
              }
            ) }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
var import_react5 = __toESM(require("react"));
var import_clsx = __toESM(require("clsx"));

// src/components/AnimatedHeadingText/AnimatedHeadingText.tsx
var import_react4 = require("react");
var import_jsx_runtime4 = require("react/jsx-runtime");
function AnimatedParagraph({
  text
}) {
  const chars = (0, import_react4.useMemo)(() => Array.from(text), [text]);
  const animatableIndexes = (0, import_react4.useMemo)(
    () => chars.map((c, i) => c === " " ? null : i).filter((x) => x !== null),
    [chars]
  );
  const [step, setStep] = (0, import_react4.useState)(0);
  (0, import_react4.useEffect)(() => {
    if (!animatableIndexes.length) return;
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % animatableIndexes.length);
    }, 300);
    return () => clearInterval(interval);
  }, [animatableIndexes.length]);
  const activeIndex = animatableIndexes[step] ?? -1;
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "text-3xl font-bold m-0 text-titleText dark:text-titleText-dark text-center w-full", children: chars.map((ch, i) => {
    if (ch === " ") return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: "\xA0" }, i);
    const isActive = i === activeIndex;
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
var import_jsx_runtime5 = require("react/jsx-runtime");
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
  const asideRef = (0, import_react5.useRef)(null);
  const mobileSidebarRef = (0, import_react5.useRef)(null);
  const toggleTheme = () => setTheme(isDarkMode ? "light" : "dark");
  import_react5.default.useEffect(() => {
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
  import_react5.default.useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
      "aside",
      {
        ref: mobileSidebarRef,
        className: (0, import_clsx.default)(
          "absolute top-0 right-0 h-full w-[85vw] max-w-[320px]  flex flex-col overflow-y-auto transition-transform duration-300 z-50 lux-panel rounded-none lux-panel shadow-none",
          isMobileOpen ? "translate-x-0" : "translate-x-full"
        ),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "sticky top-0 z-10  rounded-none border-none", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "p-3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "flex items-center gap-2", children: brand ? brand : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "font-bold text-titleText", children: "\u0644\u0648\u06AF\u0648" }) }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "text-left ml-2", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(AnimatedParagraph, { text: "P.D.S" }) })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "mt-3 rounded-2xl border border-boxBorderColor bg-boxColor/70 p-3 lux-icon", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "h-10 w-10 rounded-xl border-boxBorderColor dark:border-boxBorderColor-dark bg-white/70 dark:bg-bgColor-dark/60  transition flex items-center justify-center text-titleText dark:text-titleText-dark lux-icon", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                "path",
                {
                  d: "M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round"
                }
              ) }) }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "min-w-0 flex-1", dir: "ltr", children: [
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "text-sm font-semibold truncate lux-text", children: userFullName }),
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "text-[11px] text-gray-500 truncate lux-text", children: userRole })
              ] }),
              onChangePassword && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                "button",
                {
                  onClick: onChangePassword,
                  className: "shrink-0 h-10 w-10 rounded-xl border border-boxBorderColor dark:border-boxBorderColor-dark bg-white/70 dark:bg-bgColor-dark/60 hover:bg-gray-100 dark:hover:bg-gray-900 transition flex items-center justify-center text-titleText dark:text-titleText-dark lux-btn",
                  children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                      "path",
                      {
                        d: "M10.6887 11.9999C10.6887 13.0229 9.85974 13.8519 8.83674 13.8519C7.81374 13.8519 6.98474 13.0229 6.98474 11.9999C6.98474 10.9769 7.81374 10.1479 8.83674 10.1479H8.83974C9.86174 10.1489 10.6887 10.9779 10.6887 11.9999Z",
                        stroke: "currentColor",
                        strokeWidth: "1.5"
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                      "path",
                      {
                        d: "M10.6918 12H17.0098V13.852",
                        stroke: "currentColor",
                        strokeWidth: "1.5"
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                      "path",
                      {
                        d: "M14.182 13.852V12",
                        stroke: "currentColor",
                        strokeWidth: "1.5"
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("nav", { className: "px-3 pt-4 space-y-2 overflow-y-auto flex-1 min-h-0", children: navItems.map((item) => {
            if (item.access && item.access !== userRole) return null;
            const isActive = currentPath === item.link;
            return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
              "a",
              {
                href: item.link,
                style: { display: "block", textDecoration: "none", color: "inherit" },
                children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
                  "button",
                  {
                    type: "button",
                    className: (0, import_clsx.default)(
                      "w-full flex items-center justify-between gap-1 px-1 py-1 rounded-xl transition lux-icon cursor-pointer",
                      isActive ? "bg-primary/20 dark:bg-gray-600" : "hover:bg-primary/10 dark:hover:bg-gray-800/50"
                    ),
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex items-center gap-4 min-w-0", children: [
                        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                          "span",
                          {
                            className: (0, import_clsx.default)(
                              "h-8 w-8 rounded-xl flex items-center justify-center border shrink-0 lux-icon p-1 ",
                              isActive ? "text-primary" : "text-titleText border-boxBorderColor"
                            ),
                            children: item.icon
                          }
                        ),
                        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                          "span",
                          {
                            className: "text-sm font-medium text-right leading-5 min-w-0 break-words lux-text",
                            dir: "rtl",
                            children: item.label
                          }
                        )
                      ] }),
                      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                        "svg",
                        {
                          width: "18",
                          height: "18",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          className: (0, import_clsx.default)(
                            "transition self-center shrink-0",
                            isActive ? "opacity-100" : "opacity-40"
                          ),
                          children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
          onLogout && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "p-3 mt-auto", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
            "button",
            {
              onClick: onLogout,
              className: "w-full flex items-center justify-center gap-2 rounded-2xl border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-950/60 transition py-3 lux-btn",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                  "path",
                  {
                    d: "M10 12H18M18 12L15.5 9.77778M18 12L15.5 14.2222M18 7.11111V5C18 4.44772 17.5523 4 17 4H7C6.44772 4 6 4.44772 6 5V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V16.8889",
                    stroke: "currentColor",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "2"
                  }
                ) }),
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-sm font-semibold", children: "\u062E\u0631\u0648\u062C" })
              ]
            }
          ) })
        ]
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "fixed top-0 left-0 right-0 z-40 lg:hidden", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "bg-boxColor/90 backdrop-blur border-b border-boxBorderColor lux-panel rounded-none", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "h-14 px-4 flex items-center justify-between", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        "button",
        {
          onClick: () => setIsMobileOpen(true),
          className: "h-10 w-10 transition flex items-center justify-center lux-btn",
          children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        "button",
        {
          className: "flex items-center justify-center transition h-10 w-10 lux-btn",
          onClick: toggleTheme,
          children: isDarkMode ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
            "svg",
            {
              width: "20px",
              height: "20px",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
          ) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24",
              fill: "none",
              children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
      "aside",
      {
        ref: asideRef,
        className: (0, import_clsx.default)(
          "hidden lg:flex flex-col fixed top-0 right-0 h-screen w-[82vw] max-w-[320px] lg:w-64 transition-transform duration-300 z-50 lux-panel rounded-none lux-panel shadow-none",
          {
            "translate-x-full lg:translate-x-0": !isOpen && !isMobileOpen,
            "translate-x-0": isOpen || isMobileOpen
          },
          className
        ),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "sticky top-0 z-10  rounded-none border-none", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "p-3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "flex items-center gap-2", children: brand ? brand : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "font-bold text-titleText", children: "\u0644\u0648\u06AF\u0648" }) }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                "button",
                {
                  onClick: () => setIsMobileOpen(false),
                  className: "lg:hidden h-10 w-10 border border-boxBorderColor bg-boxColor/70 hover:bg-gray-100 transition flex items-center justify-center text-titleText ",
                  children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "text-left ml-2", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(AnimatedParagraph, { text: "P.D.S" }) })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "mt-3 rounded-2xl border border-boxBorderColor bg-boxColor/70 p-3 lux-icon", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "h-10 w-10 rounded-xl border-boxBorderColor dark:border-boxBorderColor-dark bg-white/70 dark:bg-bgColor-dark/60  transition flex items-center justify-center text-titleText dark:text-titleText-dark lux-icon", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                "path",
                {
                  d: "M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round"
                }
              ) }) }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "min-w-0 flex-1", dir: "ltr", children: [
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "text-sm font-semibold truncate lux-text", children: userFullName }),
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "text-[11px] text-gray-500 truncate lux-text", children: userRole })
              ] }),
              onChangePassword && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                "button",
                {
                  onClick: onChangePassword,
                  className: "shrink-0 h-10 w-10 rounded-xl border border-boxBorderColor dark:border-boxBorderColor-dark bg-white/70 dark:bg-bgColor-dark/60 hover:bg-gray-100 dark:hover:bg-gray-900 transition flex items-center justify-center text-titleText dark:text-titleText-dark lux-btn",
                  children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                      "path",
                      {
                        d: "M10.6887 11.9999C10.6887 13.0229 9.85974 13.8519 8.83674 13.8519C7.81374 13.8519 6.98474 13.0229 6.98474 11.9999C6.98474 10.9769 7.81374 10.1479 8.83674 10.1479H8.83974C9.86174 10.1489 10.6887 10.9779 10.6887 11.9999Z",
                        stroke: "currentColor",
                        strokeWidth: "1.5"
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                      "path",
                      {
                        d: "M10.6918 12H17.0098V13.852",
                        stroke: "currentColor",
                        strokeWidth: "1.5"
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                      "path",
                      {
                        d: "M14.182 13.852V12",
                        stroke: "currentColor",
                        strokeWidth: "1.5"
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("nav", { className: "px-3 pt-4 space-y-2 overflow-y-auto flex-1 min-h-0", children: navItems.map((item) => {
            if (item.access && item.access !== userRole) return null;
            const isActive = currentPath === item.link;
            return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
              "a",
              {
                href: item.link,
                style: { display: "block", textDecoration: "none", color: "inherit" },
                children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
                  "button",
                  {
                    type: "button",
                    className: (0, import_clsx.default)(
                      "w-full flex items-center justify-between gap-1 px-1 py-1 rounded-xl transition lux-icon cursor-pointer",
                      isActive ? "bg-primary/20 dark:bg-gray-600" : "hover:bg-primary/10 dark:hover:bg-gray-800/50"
                    ),
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex items-center gap-4 min-w-0", children: [
                        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                          "span",
                          {
                            className: (0, import_clsx.default)(
                              "h-8 w-8 rounded-xl flex items-center justify-center border shrink-0 lux-icon p-1 ",
                              isActive ? "text-primary" : "text-titleText border-boxBorderColor"
                            ),
                            children: item.icon
                          }
                        ),
                        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                          "span",
                          {
                            className: "text-sm font-medium text-right leading-5 min-w-0 break-words lux-text",
                            dir: "rtl",
                            children: item.label
                          }
                        )
                      ] }),
                      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                        "svg",
                        {
                          width: "18",
                          height: "18",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          className: (0, import_clsx.default)(
                            "transition self-center shrink-0",
                            isActive ? "opacity-100" : "opacity-40"
                          ),
                          children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
          onLogout && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "p-3 mt-auto", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
            "button",
            {
              onClick: onLogout,
              className: "w-full flex items-center justify-center gap-2 rounded-2xl border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-950/60 transition py-3 lux-btn",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                  "path",
                  {
                    d: "M10 12H18M18 12L15.5 9.77778M18 12L15.5 14.2222M18 7.11111V5C18 4.44772 17.5523 4 17 4H7C6.44772 4 6 4.44772 6 5V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V16.8889",
                    stroke: "currentColor",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "2"
                  }
                ) }),
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-sm font-semibold", children: "\u062E\u0631\u0648\u062C" })
              ]
            }
          ) })
        ]
      }
    )
  ] });
};

// src/components/DropdownSelect/DropdownSelect.tsx
var import_react6 = require("react");
var import_react_dom = require("react-dom");
var import_jsx_runtime6 = require("react/jsx-runtime");
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
  const [open, setOpen] = (0, import_react6.useState)(false);
  const [mounted, setMounted] = (0, import_react6.useState)(false);
  const [q, setQ] = (0, import_react6.useState)("");
  const [coords, setCoords] = (0, import_react6.useState)({
    top: 0,
    left: 0,
    width: 0
  });
  const buttonRef = (0, import_react6.useRef)(null);
  const dropdownRef = (0, import_react6.useRef)(null);
  const searchInputRef = (0, import_react6.useRef)(null);
  (0, import_react6.useEffect)(() => {
    setMounted(true);
  }, []);
  const normalizedOptions = (0, import_react6.useMemo)(() => {
    const base = options ?? [];
    if (!allLabel) return base;
    return [{ id: "__all__", label: allLabel, value: "" }, ...base];
  }, [options, allLabel]);
  const selectedOption = (0, import_react6.useMemo)(() => {
    return normalizedOptions.find((o) => o.value === value);
  }, [normalizedOptions, value]);
  const filteredOptions = (0, import_react6.useMemo)(() => {
    if (!searchable) return normalizedOptions;
    const query = q.trim().toLowerCase();
    if (!query) return normalizedOptions;
    return normalizedOptions.filter(
      (item) => item.label.toLowerCase().includes(query)
    );
  }, [normalizedOptions, searchable, q]);
  const updatePosition = (0, import_react6.useCallback)(() => {
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
  (0, import_react6.useEffect)(() => {
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
  (0, import_react6.useEffect)(() => {
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
  (0, import_react6.useEffect)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: `w-full ${className}`, dir: direction, children: [
    label ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("label", { className: "mb-2 block text-sm font-medium text-titleText", children: label }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
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
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            "span",
            {
              className: [
                "truncate text-sm font-medium",
                selectedOption ? "text-titleText" : "lux-text"
              ].join(" "),
              children: triggerText
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
              children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                "svg",
                {
                  className: "block h-4 w-4",
                  viewBox: "0 0 20 20",
                  fill: "none",
                  children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
    mounted && open ? (0, import_react_dom.createPortal)(
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
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
            searchable ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "px-2 pt-2 pb-1", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "lux-btn box-border flex w-full items-center gap-2 rounded-xl px-3 py-2.5", children: [
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                "svg",
                {
                  className: "h-4 w-4 shrink-0 text-titleText opacity-50",
                  viewBox: "0 0 20 20",
                  fill: "none",
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "max-h-72 overflow-y-auto px-2 py-1 box-border", children: loading ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "px-3 py-4 text-center text-sm lux-text", children: "\u062F\u0631 \u062D\u0627\u0644 \u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC..." }) : filteredOptions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "px-3 py-4 text-center text-sm lux-text", children: "\u0645\u0648\u0631\u062F\u06CC \u06CC\u0627\u0641\u062A \u0646\u0634\u062F" }) : filteredOptions.map((opt) => {
              const active = opt.value === value;
              return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
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
                    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "truncate font-medium", children: opt.label }),
                    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
var import_react7 = require("react");
var import_react_dom2 = require("react-dom");
var import_clsx2 = __toESM(require("clsx"));
var import_jsx_runtime7 = require("react/jsx-runtime");
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
  const [mounted, setMounted] = (0, import_react7.useState)(false);
  (0, import_react7.useEffect)(() => setMounted(true), []);
  (0, import_react7.useEffect)(() => {
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
  return (0, import_react_dom2.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
      "div",
      {
        className: "fixed inset-0",
        style: { zIndex },
        role: "dialog",
        "aria-modal": "true",
        "aria-label": typeof title === "string" ? title : ariaLabel,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
            "div",
            {
              className: "absolute inset-0 bg-black/50 backdrop-blur-sm",
              onClick: () => {
                if (!closeOnBackdrop) return;
                onClose();
              }
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "absolute inset-0 flex items-center justify-center p-4 pointer-events-none", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
            "div",
            {
              className: (0, import_clsx2.default)(
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
                showHeader ? /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex items-center justify-between px-5 py-1 border-b border-boxBorderColor dark:border-boxBorderColor-dark", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "min-w-0", children: title ? typeof title === "string" ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("h3", { className: "truncate text-lg font-semibold", children: title }) : /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "min-w-0", children: title }) : /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", {}) }),
                  showCloseButton ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
                    "button",
                    {
                      type: "button",
                      onClick: onClose,
                      className: (0, import_clsx2.default)(
                        "h-9 w-9 shrink-0 rounded-xl",
                        "lux-btn flex items-center justify-center",
                        "text-titleText"
                      ),
                      "aria-label": "close",
                      children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
                        "svg",
                        {
                          className: "block h-[18px] w-[18px]",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          "aria-hidden": "true",
                          children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
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
                /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "px-5 pb-4 pt-0", children })
              ]
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("style", { children: `
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
var import_react8 = require("react");
var import_react_dom3 = require("react-dom");
var import_clsx3 = __toESM(require("clsx"));
var import_jsx_runtime8 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("svg", { className: (0, import_clsx3.default)("h-5 w-5", props.className), viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("svg", { className: (0, import_clsx3.default)("h-5 w-5", props.className), viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("svg", { className: (0, import_clsx3.default)("h-5 w-5", props.className), viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      "path",
      {
        d: "M18 6l-6 6 6 6",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("svg", { className: (0, import_clsx3.default)("h-5 w-5", props.className), viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      "path",
      {
        d: "M6 6l6 6-6 6",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
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
  const triggerRef = (0, import_react8.useRef)(null);
  const panelRef = (0, import_react8.useRef)(null);
  const [open, setOpen] = (0, import_react8.useState)(false);
  const [mounted, setMounted] = (0, import_react8.useState)(false);
  const [viewDate, setViewDate] = (0, import_react8.useState)(
    () => clampDate(value ?? /* @__PURE__ */ new Date(), minDate, maxDate)
  );
  const isRTL = calendar === "jalali";
  (0, import_react8.useEffect)(() => setMounted(true), []);
  (0, import_react8.useEffect)(() => {
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
  (0, import_react8.useEffect)(() => {
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
  const days = (0, import_react8.useMemo)(() => buildMonthGrid(viewDate, calendar), [viewDate, calendar]);
  const weekdayLabels = (0, import_react8.useMemo)(() => getWeekdayLabels(calendar), [calendar]);
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
    { key: "nextYear", onClick: goPrevYear, icon: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(IconDoubleRight, {}) },
    { key: "nextMonth", onClick: goPrevMonth, icon: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(IconChevronRight, {}) }
  ] : [
    { key: "prevYear", onClick: goPrevYear, icon: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(IconDoubleLeft, {}) },
    { key: "prevMonth", onClick: goPrevMonth, icon: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(IconChevronLeft, {}) }
  ];
  const rightGroup = isRTL ? [
    { key: "prevMonth", onClick: goNextMonth, icon: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(IconChevronLeft, {}) },
    { key: "prevYear", onClick: goNextYear, icon: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(IconDoubleLeft, {}) }
  ] : [
    { key: "nextMonth", onClick: goNextMonth, icon: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(IconChevronRight, {}) },
    { key: "nextYear", onClick: goNextYear, icon: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(IconDoubleRight, {}) }
  ];
  const navLikeSquareBtn = "shrink-0 h-10 w-10 rounded-xl border border-boxBorderColor dark:border-boxBorderColor-dark bg-white/70 dark:bg-bgColor-dark/60 hover:bg-gray-100 dark:hover:bg-gray-900 transition flex items-center justify-center text-titleText dark:text-titleText-dark lux-btn";
  const dayBtnBase = "h-10 rounded-xl text-sm box-border flex items-center justify-center select-none transition text-titleText dark:text-titleText-dark lux-btn";
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_jsx_runtime8.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
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
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: (0, import_clsx3.default)("min-w-0 truncate", !displayValue && "text-mutedText"), children: displayValue || placeholder }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
            "svg",
            {
              className: (0, import_clsx3.default)("h-5 w-5 shrink-0 transition-transform", open && "rotate-180"),
              viewBox: "0 0 24 24",
              fill: "none",
              style: { transformOrigin: "center" },
              "aria-hidden": "true",
              children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
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
    open && mounted ? (0, import_react_dom3.createPortal)(
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
        "div",
        {
          ref: panelRef,
          className: (0, import_clsx3.default)(
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
            /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex items-center justify-between gap-2 px-1 pb-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "flex items-center gap-2", children: leftGroup.map((b) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
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
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "flex-1 text-center", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "text-sm font-semibold leading-5", children: getMonthTitle(viewDate, calendar) }) }),
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "flex items-center gap-2", children: rightGroup.map((b) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
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
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "grid grid-cols-7 gap-1 px-1 pb-1", children: weekdayLabels.map((w) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
              "div",
              {
                className: "py-1 text-center text-[11px] font-medium text-mutedText select-none",
                children: w
              },
              w
            )) }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "grid grid-cols-7 gap-1 px-1", children: days.map(({ date, inMonth }, idx) => {
              const selected = value ? isSameDay(date, value) : false;
              const today = isSameDay(date, /* @__PURE__ */ new Date());
              const isOutsideMonth = !inMonth;
              const isDayDisabled = isOutsideMonth || isDisabledDay(date, minDate, maxDate);
              const dayLabel = calendar === "gregorian" ? String(date.getDate()) : new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
                day: "numeric"
              }).format(date);
              return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
                "button",
                {
                  type: "button",
                  disabled: isDayDisabled,
                  onClick: () => {
                    if (isDayDisabled) return;
                    onPick(date);
                  },
                  className: (0, import_clsx3.default)(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Button,
  DatePicker,
  Header,
  Modal,
  Navbar,
  SearchableSelect,
  ThemeProvider,
  useTheme
});
//# sourceMappingURL=index.js.map
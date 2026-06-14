# Panta Design System

[![npm version](https://img.shields.io/npm/v/@msalehi79/panta-design-system)](https://www.npmjs.com/package/@msalehi79/panta-design-system)
[![license](https://img.shields.io/npm/l/@msalehi79/panta-design-system)](./LICENSE)

A modern, production-ready React component library built with Tailwind CSS — fully typed, with dark/light theme, RTL support, and optimized for Next.js App Router.

---

## ✨ Features

- 🧩 **30+ Components** — Buttons, modals, tables, charts, date pickers, inputs, loaders, pagination, tabs, badges, and more
- 🌗 **Dark / Light Theme** — CSS variable-based theming via `ThemeProvider`
- 🧭 **RTL Support** — Full right-to-left layout (ideal for Persian/Arabic interfaces)
- ⚡ **Next.js App Router** — All interactive components marked `"use client"`
- 🎨 **Tailwind CSS** — Easily customizable via `tailwind.config.js`
- 📊 **Advanced Charts** — Bar, line, double-bar, double-line, treemap, pie/donut via Recharts
- 📦 **Minimal Dependencies** — Only `react`, `react-dom` as peer deps; `recharts` and `clsx` bundled
- 📱 **Responsive & Mobile-First** — Including a responsive side navigation (Navbar)

---

## 📦 Installation
```bash
npm install @msalehi79/panta-design-system

`recharts` and `clsx` are included automatically. You only need `react` and `react-dom` (v18 or v19).

### Add global styles

css
/* app/globals.css */
@import "@msalehi79/panta-design-system/styles.css";

### Tailwind config (recommended)

js
// tailwind.config.js
module.exports = {
  darkMode: "class",
  content: [
"./src/**/*.{js,ts,jsx,tsx}",
"./node_modules/@msalehi79/panta-design-system/**/*.{js,ts,jsx,tsx}",
  ],
};

---

## 🚀 Quick Start

tsx
// app/layout.tsx
import { ThemeProvider } from "@msalehi79/panta-design-system";
import "@msalehi79/panta-design-system/styles.css";

export default function RootLayout({ children }) {
  return (
<html lang="en" suppressHydrationWarning>
<body>
<ThemeProvider>{children}</ThemeProvider>
</body>
</html>
  );
}

tsx
"use client";
import { Button, Header, Navbar } from "@msalehi79/panta-design-system";

export default function Home() {
  return (
<>
<Header title="My Dashboard" />
<Button variant="primary" onClick={() => alert("Clicked!")}>
Click Me
</Button>
</>
  );
}

---

## 🧩 Components

| Component | Persian Docs | English Docs |
|---|---|---|
| Button | README.fa.md | README.en.md |
| Navbar | README.fa.md | README.en.md |
| Header | README.fa.md | README.en.md |
| SearchableSelect | README.fa.md | README.en.md |
| Modal | README.fa.md | README.en.md |
| DatePicker | README.fa.md | README.en.md |
| Box | README.fa.md | README.en.md |
| ButtonSelect | README.fa.md | README.en.md |
| HashText | README.fa.md | README.en.md |
| DoubleBarChart | README.fa.md | README.en.md |
| DoubleLineChart | README.fa.md | README.en.md |
| SingleBarChart | README.fa.md | README.en.md |
| SingleLineChart | README.fa.md | README.en.md |
| CircleChart | README.fa.md | README.en.md |
| TreeChart | README.fa.md | README.en.md |
| Tabs | README.fa.md | README.en.md |
| Table | README.fa.md | README.en.md |
| Badge | README.fa.md | README.en.md |
| Loader | README.fa.md | README.en.md |
| PageLoader | README.fa.md | README.en.md |
| Input | README.fa.md | README.en.md |
| Pagination | README.fa.md | README.en.md |

> More components are added regularly.

---

## 🎨 Theming

Override CSS variables in your global stylesheet:

css
:root {
  --color-primary: #4fc2fc;
  --bg-boxColor: #ffffff;
  --text-titleText: #1e293b;
}

.dark {
  --color-primary: #3b82f6;
  --bg-boxColor: #1e293b;
  --text-titleText: #f1f5f9;
}

`ThemeProvider` toggles the `dark` class on `<html>` automatically.

---

## 🧭 RTL Support

html
<html lang="fa" dir="rtl">

Most components also accept an explicit `rtl` prop for fine-grained control.

---

## ⚡ Next.js Notes

- All interactive components use `"use client"` — fully compatible with App Router
- Import styles once in your root layout
- Turbopack compatible — no extra config needed

---

## 📄 License

MIT © [Mohammad Salehi](https://github.com/msalehi79)

---

**keywords:** `react` `component-library` `design-system` `tailwindcss` `dark-mode` `rtl` `nextjs` `typescript` `persian-ui` `arabic-ui` `recharts` `date-picker` `modal` `table` `pagination` `ui-kit` `frontend` `react-components` `panta`

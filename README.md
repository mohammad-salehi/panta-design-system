# Panta Design System

[![npm version](https://img.shields.io/npm/v/@msalehi79/panta-design-system)](https://www.npmjs.com/package/@msalehi79/panta-design-system)
[![license](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

A modern, production-ready React component library built with Tailwind CSS — fully typed, with built-in dark/light mode, RTL support, and excellent Next.js compatibility.

---

## ✨ Features

- 20+ ready-to-use components
- Dark / Light Theme via CSS variables & `ThemeProvider`
- Full RTL Support for Persian/Arabic UIs
- Next.js App Router & Server Components compatible
- Tailwind CSS styling
- Advanced charts powered by Recharts (Bar, Line, Pie/Donut, Treemap, etc.)
- Zero heavy dependencies (only `recharts` & `clsx`)
- Fully Responsive & Mobile-First
- Strong TypeScript support
---

## 📦 Installation

```bash
npm install @msalehi79/panta-design-system
```

## Peer Dependencies

```bash
npm install react react-dom recharts clsx
```

## Add Global Styles

In your main CSS file:

```bash
CSS@import "@msalehi79/panta-design-system/styles.css";
```

## Tailwind Config

```bash
// tailwind.config.js
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@msalehi79/panta-design-system/**/*.{js,ts,jsx,tsx}",
  ],
};
```

## 🚀 Quick Start

```bash
// app/layout.tsx
import "@msalehi79/panta-design-system/styles.css";
import { ThemeProvider } from "@msalehi79/panta-design-system";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

```bash
// app/page.tsx
import { Button, Header } from "@msalehi79/panta-design-system";

export default function Page() {
  return (
    <>
      <Header title="داشبورد" />
      <Button variant="primary">کلیک کنید</Button>
    </>
  );
}
```

## 🧩 Components

- **Button**
- **Navbar**
- **Header**
- **Dropdown Searchable Select**
- **Modal**
- **Date Picker**
- **Box**
- **Button Select**
- **Hash Text**
- **Double Bar Chart**
- **Double Line Chart**
- **Single Bar Chart**
- **Single Line Chart**
- **Circle Chart**
- **Tree Chart**
- **Tabs**
- **Table**
- **Badge**
- **Loader**
- **Page Loader**
- **Input**
- **Pagination**
- **Toast**
- **Tooltip**
- **Stepper**

## 🎨 Theming

Theme is controlled via the dark class on <html> and CSS variables:

```bash
:root {
  --color-primary: #6366f1;
  --bg-boxColor: #ffffff;
  --text-titleText: #111827;
}

.dark {
  --color-primary: #818cf8;
  --bg-boxColor: #1f2937;
  --text-titleText: #f9fafb;
}
```

## 🌐 RTL Support

```bash
<html lang="fa" dir="rtl">
```

## ⚙️ Next.js Notes

Interactive components are marked with "use client" internally.
Import the CSS only once in the root layout.
Fully compatible with Turbopack.

## 📄 License

MIT © [Mohammad Salehi](https://t.me/msalehi79)
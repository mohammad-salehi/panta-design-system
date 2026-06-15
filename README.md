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
| کامپوننت | مستندات فارسی | English Doc |
|----------|----------------|------------------|
| دکمه (Button) | [README.fa.md](https://github.com/mohammad-salehi/panta-design-system/blob/master/docs/components/Button/README.fa.md) | [README.en.md](https://github.com/mohammad-salehi/panta-design-system/blob/master/docs/components/Button/README.en.md) |
| بدنه اصلی (AppShell) | [README.fa.md](https://github.com/mohammad-salehi/panta-design-system/blob/master/docs/components/AppShell/README.fa.md) | [README.en.md](https://github.com/mohammad-salehi/panta-design-system/blob/master/docs/components/AppShell/README.en.md) |
| انتخاب‌گر با جست‌وجو (SearchableSelect) | [README.fa.md](https://github.com/mohammad-salehi/panta-design-system/blob/master/docs/components/SearchableSelect/README.fa.md) | [README.en.md](https://github.com/mohammad-salehi/panta-design-system/blob/master/docs/components/SearchableSelect/README.en.md) |
| مودال (Modal) | [README.fa.md](https://github.com/mohammad-salehi/panta-design-system/blob/master/docs/components/Modal/README.fa.md) | [README.en.md](https://github.com/mohammad-salehi/panta-design-system/blob/master/docs/components/Modal/README.en.md) |
| تقویم (DatePicker) | [README.fa.md](https://github.com/mohammad-salehi/panta-design-system/blob/master/docs/components/DatePicker/README.fa.md) | [README.en.md](https://github.com/mohammad-salehi/panta-design-system/blob/master/docs/components/DatePicker/README.en.md) |
| جعبه (Box) | [README.fa.md](https://github.com/mohammad-salehi/panta-design-system/blob/master/docs/components/Box/README.fa.md) | [README.en.md](https://github.com/mohammad-salehi/panta-design-system/blob/master/docs/components/Box/README.en.md) |
| سلکت (ButtonSelect) | [README.fa.md](https://github.com/mohammad-salehi/panta-design-system/blob/master/docs/components/ButtonSelect/README.fa.md) | [README.en.md](https://github.com/mohammad-salehi/panta-design-system/blob/master/docs/components/ButtonSelect/README.en.md) |
| متن کوتاه‌شده (HashText) | [README.fa.md](https://github.com/mohammad-salehi/panta-design-system/blob/master/docs/components/HashText/README.fa.md) | [README.en.md](https://github.com/mohammad-salehi/panta-design-system/blob/master/docs/components/HashText/README.en.md) |
| نمودار میله‌ای دوعددی (DoubleBarChart) | [README.fa.md](https://github.com/mohammad-salehi/panta-design-system/blob/master/docs/components/DoubleBarChart/README.fa.md) | [README.en.md](https://github.com/mohammad-salehi/panta-design-system/blob/master/docs/components/DoubleBarChart/README.en.md) |
| نمودار خطی دوعددی (DoubleLineChart) | [README.fa.md](https://github.com/mohammad-salehi/panta-design-system/blob/master/docs/components/DoubleLineChart/README.fa.md) | [README.en.md](https://github.com/mohammad-salehi/panta-design-system/blob/master/docs/components/DoubleLineChart/README.en.md) |
| نمودار میله‌ای تکی (SingleBarChart) | [README.fa.md](https://github.com/mohammad-salehi/panta-design-system/blob/master/docs/components/SingleBarChart/README.fa.md) | [README.en.md](https://github.com/mohammad-salehi/panta-design-system/blob/master/docs/components/SingleBarChart/README.en.md) |
| نمودار خطی تکی (SingleLineChart) | [README.fa.md](https://github.com/mohammad-salehi/panta-design-system/blob/master/docs/components/SingleLineChart/README.fa.md) | [README.en.md](https://github.com/mohammad-salehi/panta-design-system/blob/master/docs/components/SingleLineChart/README.en.md) |
| نمودار دایره‌ای (CircleChart) | [README.fa.md](https://github.com/mohammad-salehi/panta-design-system/blob/master/docs/components/CircleChart/README.fa.md) | [README.en.md](https://github.com/mohammad-salehi/panta-design-system/blob/master/docs/components/CircleChart/README.en.md) |
| نمودار درختی (TreeChart) | [README.fa.md](https://github.com/mohammad-salehi/panta-design-system/blob/master/docs/components/TreeChart/README.fa.md) | [README.en.md](https://github.com/mohammad-salehi/panta-design-system/blob/master/docs/components/TreeChart/README.en.md) |
| تب (Tabs) | [README.fa.md](https://github.com/mohammad-salehi/panta-design-system/blob/master/docs/components/Tabs/README.fa.md) | [README.en.md](https://github.com/mohammad-salehi/panta-design-system/blob/master/docs/components/Tabs/README.en.md) |
| جدول (Table) | [README.fa.md](https://github.com/mohammad-salehi/panta-design-system/blob/master/docs/components/Table/README.fa.md) | [README.en.md](https://github.com/mohammad-salehi/panta-design-system/blob/master/docs/components/Table/README.en.md) |
| نشان (Badge) | [README.fa.md](https://github.com/mohammad-salehi/panta-design-system/blob/master/docs/components/Badge/README.fa.md) | [README.en.md](https://github.com/mohammad-salehi/panta-design-system/blob/master/docs/components/Badge/README.en.md) |
| بارگزاری کامپوننت (Loader) | [README.fa.md](https://github.com/mohammad-salehi/panta-design-system/blob/master/docs/components/Loader/README.fa.md) | [README.en.md](https://github.com/mohammad-salehi/panta-design-system/blob/master/docs/components/Loader/README.en.md) |
| بارگزاری صفحه (PageLoader) | [README.fa.md](https://github.com/mohammad-salehi/panta-design-system/blob/master/docs/components/PageLoader/README.fa.md) | [README.en.md](https://github.com/mohammad-salehi/panta-design-system/blob/master/docs/components/PageLoader/README.en.md) |
| اینپوت (Input) | [README.fa.md](https://github.com/mohammad-salehi/panta-design-system/blob/master/docs/components/Input/README.fa.md) | [README.en.md](https://github.com/mohammad-salehi/panta-design-system/blob/master/docs/components/Input/README.en.md) |
| صفحه‌بندی (Pagination) | [README.fa.md](https://github.com/mohammad-salehi/panta-design-system/blob/master/docs/components/Pagination/README.fa.md) | [README.en.md](https://github.com/mohammad-salehi/panta-design-system/blob/master/docs/components/Pagination/README.en.md) |
| پیام (Toast) | [README.fa.md](https://github.com/mohammad-salehi/panta-design-system/blob/master/docs/components/Toast/README.fa.md) | [README.en.md](https://github.com/mohammad-salehi/panta-design-system/blob/master/docs/components/Toast/README.en.md) |
| راهنما (Tooltip) | [README.fa.md](https://github.com/mohammad-salehi/panta-design-system/blob/master/docs/components/Tooltip/README.fa.md) | [README.en.md](https://github.com/mohammad-salehi/panta-design-system/blob/master/docs/components/Tooltip/README.en.md) |
| مراحل (Stepper) | [README.fa.md](https://github.com/mohammad-salehi/panta-design-system/blob/master/docs/components/Stepper/README.fa.md) | [README.en.md](https://github.com/mohammad-salehi/panta-design-system/blob/master/docs/components/Stepper/README.en.md) |

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
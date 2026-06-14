# Panta Design System

[![npm version](https://img.shields.io/npm/v/@msalehi79/panta-design-system)](https://www.npmjs.com/package/@msalehi79/panta-design-system)
[![license](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

**A modern, production-ready React component library** built with Tailwind CSS — fully typed, with built-in dark/light mode, RTL support, and excellent Next.js compatibility.

---

## ✨ Features

- ۳۰+ کامپوننت آماده و حرفه‌ای
- پشتیبانی کامل از **Dark / Light Theme** با CSS Variables و `ThemeProvider`
- پشتیبانی عالی از **RTL** (فارسی و عربی)
- سازگار با **Next.js App Router** و Server Components
- استایلینگ کامل با Tailwind CSS
- چارت‌های پیشرفته با Recharts (Bar, Line, Pie/Donut, Treemap و ...)
- بدون وابستگی سنگین (فقط `recharts` و `clsx`)
- کاملاً Responsive و Mobile-First
- TypeScript-first با تایپینگ قوی

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

در فایل CSS اصلی پروژه (معمولاً globals.css یا app/globals.css):

```bash
CSS@import "@msalehi79/panta-design-system/styles.css";
```

## تنظیمات Tailwind

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

- **Button** — دکمه
- **Navbar** — نوار ناوبری
- **Header** — هدر
- **SearchableSelect** — سلکت جستجوable
- **Modal** — مودال
- **DatePicker** — انتخابگر تاریخ
- **Box** — باکس
- **ButtonSelect** — انتخاب با دکمه
- **HashText** — متن هش
- **DoubleBarChart** — نمودار میله‌ای دوگانه
- **DoubleLineChart** — نمودار خطی دوگانه
- **SingleBarChart** — نمودار میله‌ای تک
- **SingleLineChart** — نمودار خطی تک
- **CircleChart** — نمودار دایره‌ای
- **TreeChart** — نمودار درختی
- **Tabs** — تب‌ها
- **Table** — جدول
- **Badge** — نشان
- **Loader** — لودر
- **PageLoader** — لودر صفحه
- **Input** — ورودی
- **Pagination** — صفحه‌بندی

## 🎨 Theming

تم از طریق کلاس dark روی تگ <html> و متغیرهای CSS کنترل می‌شود:
CSS

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

کامپوننت‌های تعاملی به صورت داخلی "use client" هستند.
فایل CSS را فقط یک بار در layout.tsx ایمپورت کنید.
با Turbopack هم کاملاً سازگار است.

## 📄 License

MIT © [Mohammad Salehi](https://t.me/msalehi79)
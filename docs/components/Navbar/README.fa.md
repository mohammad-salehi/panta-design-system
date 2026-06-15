# نوار ناوبری (Navbar)

کامپوننت نوار ناوبری (منوی کناری) برای پنل‌های مدیریتی. شامل هدر (برند، عنوان)، کارت کاربر، منوی اصلی و دکمه خروج. کاملاً واکنش‌گرا و دارای دو حالت دسکتاپ و موبایل است. از تم دارک/لایت پشتیبانی می‌کند.

## Props

| نام | نوع | پیش‌فرض | توضیحات |
|------|------|---------|----------|
| `navItems` | `NavItem[]` | **اجباری** | آرایه آیتم‌های منو (هر آیتم شامل `link`, `label`, `access?`, `icon?`) |
| `isOpen` | `boolean` | **اجباری** | وضعیت باز بودن منوی دسکتاپ (کنترل شده از والد) |
| `setIsOpen` | `(open: boolean) => void` | **اجباری** | تابع تغییر وضعیت باز بودن منوی دسکتاپ |
| `isMobileOpen` | `boolean` | **اجباری** | وضعیت باز بودن منوی موبایل (کنترل شده از والد) |
| `setIsMobileOpen` | `(open: boolean) => void` | **اجباری** | تابع تغییر وضعیت باز بودن منوی موبایل |
| `currentPath` | `string` | **اجباری** | مسیر فعلی صفحه (برای هایلایت آیتم فعال) |
| `userFullName` | `string` | `'کاربر'` | نام و نام خانوادگی کاربر نمایش داده شده در کارت کاربر |
| `title` | `string` | **اجباری** | عنوان سایت |
| `userRole` | `string` | `''` | نقش کاربر (مثلاً `'مدیر سیستم'`) |
| `onChangePassword` | `() => void` | `-` | تابعی که با کلیک روی آیکون کلید (تغییر رمز) صدا زده می‌شود |
| `onLogout` | `() => void` | `-` | تابعی که با کلیک روی دکمه خروج صدا زده می‌شود |
| `brand` | `React.ReactNode` | `-` | المان برند (مثلاً لوگو یا نام) در هدر سایدبار |
| `className` | `string` | `''` | کلاس‌های اضافی Tailwind برای سفارشی‌سازی |

### نوع `NavItem`

| فیلد | نوع | توضیحات |
|------|------|----------|
| `link` | `string` | آدرس مقصد (مثلاً `'/panel/dashboard'`) |
| `label` | `string` | متن نمایشی آیتم |
| `access` | `string` (اختیاری) | سطح دسترسی مورد نیاز (اگر با `userRole` برابر نباشد، آیتم نمایش نمی‌یابد) |
| `icon` | `React.ReactNode` (اختیاری) | آیکون (معمولاً یک `<svg>`) |

## نحوه استفاده

### ۱. تعریف آیتم‌های منو

```tsx
'use client';

import { NavItem } from '@msalehi79/panta-design-system';

const navItems: NavItem[] = [
  {
    link: '/panel/dashboard',
    label: 'داشبورد',
    icon: <DashboardIcon />,
  },
  {
    link: '/panel/exchanges',
    label: 'کارگزاری‌ها',
    icon: <ExchangeIcon />,
    access: 'ADMIN', // فقط کاربران با نقش ADMIN می‌بینند
  },
];

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from '@msalehi79/panta-design-system';

export default function PanelLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [...];

  const handleLogout = () => {
    // clear token, redirect to login
  };

  const handleChangePassword = () => {
    // open change password modal
  };

  return (
    <div>
      <Navbar
        navItems={navItems}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        currentPath={pathname}
        userFullName="Ali Rezaei"
        userRole="Admin"
        onChangePassword={handleChangePassword}
        onLogout={handleLogout}
        brand={<img src="/logo.svg" className="h-8" alt="logo" />}
      />
      <main className="lg:ml-64 p-6">{children}</main>
    </div>
  );
}
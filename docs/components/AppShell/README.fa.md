# AppShell / بدنه اصلی برنامه

کامپوننت `AppShell` یک قالب کامل و آماده برای ساخت برنامه‌های تحت وب با ساختار پنل مدیریتی است. این کامپوننت شامل:

- سایدبار واکنش‌گرا (دسکتاپ و موبایل)
- هدر بالای صفحه (دسکتاپ)
- نوار بالای موبایل (همبرگر + تغییر تم)
- فوتر ثابت
- مدیریت تم دارک/لایت
- مدیریت توست (اعلان‌ها)

با استفاده از این کامپوننت، نیازی به پیاده‌سازی جداگانه `ThemeProvider`، `ToastProvider`، چیدمان سایدبار، هدر و ... ندارید.

---

## Props / پارامترها

| نام | نوع | پیش‌فرض | توضیحات |
|------|------|---------|----------|
| `navItems` | `NavItem[]` | **اجباری** | آرایه آیتم‌های منوی سایدبار (راهنمای ساختار در پایین آمده است) |
| `currentPath` | `string` | **اجباری** | مسیر فعلی صفحه (برای هایلایت کردن آیتم فعال در منو) |
| `userFullName` | `string` | `'کاربر'` | نام کامل کاربر که در کارت پروفایل سایدبار نمایش داده می‌شود |
| `userRole` | `string` | `''` | نقش کاربر (مثلاً `'مدیر سیستم'`) – برای فیلتر کردن آیتم‌های دارای سطح دسترسی |
| `onChangePassword` | `() => void` | - | تابعی که با کلیک روی آیکون تغییر رمز در کارت کاربر صدا زده می‌شود |
| `onLogout` | `() => void` | - | تابعی که با کلیک روی دکمه «خروج» صدا زده می‌شود |
| `brand` | `React.ReactNode` | - | المان دلخواه برای نمایش برند (لوگو، متن و ...) در هدر سایدبار |
| `title` | `string` | `''` | عنوانی که در سایدبار (کنار لوگو) و به‌عنوان عنوان پیش‌فرض هدر دسکتاپ استفاده می‌شود |
| `headerTitle` | `string` | `''` | عنوان سفارشی برای هدر دسکتاپ (اگر مقدار داشته باشد، جایگزین `title` می‌شود) |
| `className` | `string` | `''` | کلاس‌های اضافی Tailwind برای سایدبار دسکتاپ (برای سفارشی‌سازی بیشتر) |
| `children` | `React.ReactNode` | - | محتوای اصلی صفحه (هر چیزی که بین باز و بسته شدن `AppShell` قرار می‌گیرد) |

---

## ساختار `NavItem`

| فیلد | نوع | توضیحات |
|-------|------|----------|
| `link` | `string` | آدرس مقصد (مثلاً `'/dashboard'`) |
| `label` | `string` | متن نمایشی در منو |
| `access` | `string` (اختیاری) | سطح دسترسی مورد نیاز (اگر با `userRole` برابر نباشد، آیتم نمایش داده نمی‌شود) |
| `icon` | `React.ReactNode` (اختیاری) | آیکون (معمولاً یک `<svg>`) که در کنار عنوان نمایش داده می‌شود |

---

## نحوه استفاده

### ۱. تعریف آیتم‌های منو

```tsx
const navItems = [
  {
    link: '/dashboard',
    label: 'داشبورد',
    icon: <DashboardIcon />,
  },
  {
    link: '/users',
    label: 'کاربران',
    icon: <UsersIcon />,
    access: 'ADMIN',   // فقط کاربران با نقش ADMIN می‌بینند
  },
];
```
### ۲. استفاده در یک layout (مثلاً app/layout.tsx در Next.js)
```tsx
import { AppShell } from '@msalehi79/panta-design-system';

export default function RootLayout({ children }) {
  const pathname = usePathname(); // از next/navigation

  return (
    <html lang="fa" dir="rtl">
      <body>
        <AppShell
          navItems={navItems}
          currentPath={pathname}
          userFullName="علی رضایی"
          userRole="ADMIN"
          onChangePassword={() => console.log('تغییر رمز')}
          onLogout={() => console.log('خروج')}
          title="پنل مدیریت"
          headerTitle="داشبورد"
          brand={<img src="/logo.png" className="h-8" alt="logo" />}
        >
          {children}
        </AppShell>
      </body>
    </html>
  );
}
```
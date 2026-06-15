# هدر (Header)

کامپوننت هدر افقی که در بالای صفحه در حالت دسکتاپ نمایش داده می‌شود. شامل عنوان (title) و دکمه تغییر تم (دارک/لایت) است. این هدر فقط در اندازه‌های بزرگتر از 1024 پیکسل (دسکتاپ) ظاهر می‌شود و در موبایل مخفی می‌گردد (مسئولیت نوار بالای موبایل بر عهده کامپوننت `Navbar` است).

## Props

| نام | نوع | پیش‌فرض | توضیحات |
|------|------|---------|----------|
| `title` | `string` | `'سامانه نظارت بر کارگزاری‌های مبادله رمزارز ایران'` | عنوانی که در هدر نمایش داده می‌شود (اختیاری) |

> **نکته:** این کامپوننت وضعیت باز بودن منو (isOpen، isMobileOpen) و تغییر تم را به صورت داخلی از `useTheme` مدیریت می‌کند. نیازی به ارسال props اضافی نیست.

## نحوه استفاده

### ۱. استفاده در یک لایه‌آوت (مثلاً `app/panel/layout.tsx`)

```tsx
import { Header, ThemeProvider } from '@msalehi79/panta-design-system';
import 'panta_design_system/styles.css';

export default function PanelLayout({ children }) {
  return (
    <ThemeProvider>
      <Header title="پنل مدیریت" />
      <div className="pt-20">{children}</div>
    </ThemeProvider>
  );
}
# توست (Toast)

کامپوننت‌های نمایش پیام‌های موقت (اعلان) با پشتیبانی از انواع موفقیت، خطا و هشدار، موقعیت‌های مختلف و قابلیت تنظیم زمان نمایش. با Context API ساخته شده و در هر جای برنامه قابل فراخوانی است.

## Props

### `ToastProvider`

| نام | نوع | پیش‌فرض | توضیحات |
|------|------|---------|----------|
| `children` | `React.ReactNode` | **اجباری** | محتوای برنامه که باید درون Provider قرار گیرد |

### `useToast()`

هوکی که شیء `{ toast }` را برمی‌گرداند.

#### `toast(message, options?)`

| نام | نوع | پیش‌فرض | توضیحات |
|------|------|---------|----------|
| `message` | `string` | **اجباری** | متن پیام |
| `options.type` | `'success' \| 'danger' \| 'alert'` | `'success'` | نوع پیام (موفقیت، خطا، هشدار) |
| `options.duration` | `number` | `4000` | مدت زمان نمایش پیام (میلی‌ثانیه) |
| `options.position` | `'top-left' \| 'top-right' \| 'top-center' \| 'bottom-left' \| 'bottom-right' \| 'bottom-center'` | `'top-right'` | موقعیت نمایش توست |

## نحوه استفاده

### ۱. اضافه کردن `ToastProvider` در بالاترین سطح (مثلاً `app/layout.tsx`)

```tsx
import { ToastProvider } from '@msalehi79/panta-design-system';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
```

### ۲. استفاده از useToast در هر کامپوننت کلاینت
```tsx
'use client';
import { useToast } from '@msalehi79/panta-design-system';

function MyComponent() {
  const { toast } = useToast();

  return (
    <div className="space-x-2">
      <button onClick={() => toast('عملیات با موفقیت انجام شد')}>
        موفقیت
      </button>
      <button onClick={() => toast('خطا رخ داد', { type: 'danger' })}>
        خطا
      </button>
      <button onClick={() => toast('توجه: لطفاً بررسی کنید', { type: 'alert', duration: 3000 })}>
        هشدار
      </button>
      <button onClick={() => toast('پیام در پایین سمت چپ', { position: 'bottom-left' })}>
        موقعیت سفارشی
      </button>
    </div>
  );
}
```
# مودال (Modal)

کامپوننت مودال جهت نمایش دیالوگ‌ها، فرم‌ها یا هر محتوای دیگری بر روی صفحه. از پورتال استفاده می‌کند تا بالای همه المان‌ها نمایش داده شود. قابلیت بستن با کلیک روی بکدراپ، کلید Escape، دکمه بستن و جلوگیری از اسکرول بدنه را دارد. کاملاً واکنش‌گرا و با تم دارک/لایت هماهنگ است.

## Props

| نام | نوع | پیش‌فرض | توضیحات |
|------|------|---------|----------|
| `open` | `boolean` | **اجباری** | وضعیت باز بودن مودال |
| `onClose` | `() => void` | **اجباری** | تابع بستن مودال (هنگام کلیک روی بکدراپ، Escape یا دکمه بستن صدا زده می‌شود) |
| `title` | `React.ReactNode` | - | عنوان مودال (می‌تواند متن یا JSX باشد) |
| `children` | `React.ReactNode` | **اجباری** | محتوای اصلی مودال |
| `className` | `string` | `''` | کلاس‌های اضافی Tailwind برای پنل مودال |
| `closeOnBackdrop` | `boolean` | `true` | آیا با کلیک روی پس‌زمینه (بکدراپ) مودال بسته شود؟ |
| `closeOnEscape` | `boolean` | `true` | آیا با فشردن کلید Escape مودال بسته شود؟ |
| `showHeader` | `boolean` | `true` | نمایش بخش هدر (شامل عنوان و دکمه بستن) |
| `showCloseButton` | `boolean` | `true` | نمایش دکمه بستن در هدر |
| `maxWidthClass` | `string` | `'max-w-md'` | کلاس Tailwind برای حداکثر عرض پنل (مثلاً `max-w-lg`, `max-w-xl`) |
| `portalTarget` | `HTMLElement \| null` | `document.body` | المان مقصد برای پورتال (به طور پیش‌فرض `body`) |
| `zIndex` | `number` | `9999` | مقدار `z-index` برای کانتینر مودال |
| `ariaLabel` | `string` | `'Modal dialog'` | برچسب `aria-label` برای دسترسی‌پذیری (زمانی که عنوان متنی وجود ندارد) |

## نحوه استفاده

### ۱. مودال ساده با عنوان و دکمه بستن

```tsx
import { Modal, Button } from 'panta_design_system';
import { useState } from 'react';

const [open, setOpen] = useState(false);

<Button variant="primary" onClick={() => setOpen(true)}>باز کردن مودال</Button>

<Modal open={open} onClose={() => setOpen(false)} title="عنوان مودال">
  <p>محتوای مودال اینجا قرار می‌گیرد.</p>
  <div className="mt-4 flex justify-end gap-2">
    <Button variant="danger" onClick={() => setOpen(false)}>بستن</Button>
  </div>
</Modal>
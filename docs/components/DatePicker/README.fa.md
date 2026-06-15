# انتخابگر تاریخ (DatePicker)

کامپوننت انتخابگر تاریخ با پشتیبانی از تقویم **میلادی** و **شمسی (جلالی)**. دارای قابلیت جستجو (بازشو با پورتال)، محدودیت دامنه تاریخ، نمایش هفته‌ها، ناوبری ماه و سال، و خروجی به صورت ISO string. ظاهر آن با دیزاین سیستم هماهنگ است.

## Props

| نام | نوع | پیش‌فرض | توضیحات |
|------|------|---------|----------|
| `value` | `Date \| null` | **اجباری** | مقدار انتخاب شده (شیء Date) |
| `onChange` | `(value: Date \| null) => void` | **اجباری** | تابع فراخوانی هنگام تغییر مقدار (خروجی به صورت Date) |
| `onChangeFormatted` | `(value: string) => void` | - | تابع فراخوانی با خروجی ISO string (مانند `2026-06-01T13:24:53.207Z`) |
| `calendar` | `'gregorian' \| 'jalali'` | `'gregorian'` | نوع تقویم: میلادی یا شمسی |
| `placeholder` | `string` | `'Select date'` | متن نمایشی در حالت خالی |
| `displayFormat` | `'YYYY/MM/DD' \| 'YYYY-MM-DD'` | `'YYYY/MM/DD'` | فرمت نمایش تاریخ در دکمه (فقط نمایشی، تأثیری در خروجی ندارد) |
| `disabled` | `boolean` | `false` | غیرفعال کردن انتخابگر |
| `className` | `string` | `''` | کلاس‌های اضافی Tailwind برای دکمه اصلی |
| `minDate` | `Date` | - | حداقل تاریخ قابل انتخاب |
| `maxDate` | `Date` | - | حداکثر تاریخ قابل انتخاب |
| `closeOnSelect` | `boolean` | `true` | آیا پس از انتخاب یک تاریخ، پنل به طور خودکار بسته شود؟ |

## نحوه استفاده

### ۱. انتخابگر تاریخ میلادی (پیش‌فرض)

```tsx
import { DatePicker } from '@msalehi79/panta-design-system';
import { useState } from 'react';

const [selectedDate, setSelectedDate] = useState<Date | null>(null);

<DatePicker
  value={selectedDate}
  onChange={setSelectedDate}
  onChangeFormatted={(isoString) => {
    console.log('ISO:', isoString); // مثلاً 2026-06-01T13:24:53.207Z
  }}
/>
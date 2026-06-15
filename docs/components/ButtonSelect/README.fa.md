# دکمه‌های انتخابی (ButtonSelect)

کامپوننت مجموعه دکمه‌هایی که مانند دکمه‌های رادیویی عمل می‌کنند. برای انتخاب یک گزینه از بین چند گزینه مناسب است. قابل استفاده در فرم‌ها، فیلترها، و تنظیمات سریع. دارای جهت‌های افقی، عمودی، و شبکه‌ای، سایزهای مختلف، دو نوع ظاهری (پیش‌فرض و پرایمری)، و پشتیبانی از حالت کنترل شده و کنترل نشده.

## Props

| نام | نوع | پیش‌فرض | توضیحات |
|------|------|---------|----------|
| `value` | `string` | - | مقدار کنترل شده (در صورت استفاده، کامپوننت کنترل شده می‌شود) |
| `defaultValue` | `string` | - | مقدار پیش‌فرض در حالت کنترل نشده |
| `onChange` | `(value: string) => void` | - | تابع فراخوانی هنگام تغییر انتخاب |
| `options` | `SwitchOption[]` | **اجباری** | آرایه گزینه‌ها (هر گزینه شامل `label`, `value`, `disabled?`) |
| `dir` | `'rtl' \| 'ltr'` | `'rtl'` | جهت متن و چیدمان |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | اندازه دکمه‌ها |
| `variant` | `'default' \| 'primary'` | `'primary'` | نوع ظاهری دکمه فعال: `primary` (گرادیانت آبی) یا `default` (حاشیه آبی) |
| `orientation` | `'horizontal' \| 'vertical' \| 'grid'` | `'horizontal'` | جهت چیدمان: افقی، عمودی یا شبکه‌ای |
| `columns` | `number` | `4` | تعداد ستون‌ها در حالت `grid` (حداکثر ۱۲ ستون توصیه می‌شود) |
| `fullWidth` | `boolean` | `false` | در حالت افقی، آیا دکمه‌ها کل عرض والد را بگیرند؟ |
| `className` | `string` | `''` | کلاس‌های اضافی Tailwind برای کانتینر اصلی |

### نوع `SwitchOption`

| فیلد | نوع | توضیحات |
|-------|------|----------|
| `label` | `React.ReactNode` | محتوای نمایشی دکمه (می‌تواند متن یا JSX باشد) |
| `value` | `string` | مقدار داخلی گزینه |
| `disabled` | `boolean` (اختیاری) | غیرفعال کردن گزینه |

## نحوه استفاده

### ۱. کنترل شده (Controlled)

```tsx
import { ButtonSelect } from '@msalehi79/panta-design-system';
import { useState } from 'react';

const [selected, setSelected] = useState('option1');

const options = [
  { label: 'گزینه اول', value: 'option1' },
  { label: 'گزینه دوم', value: 'option2' },
  { label: 'گزینه سوم', value: 'option3' },
];

<ButtonSelect
  value={selected}
  onChange={setSelected}
  options={options}
/>
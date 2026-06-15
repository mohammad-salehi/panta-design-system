# نمودار میله‌ای تکی (SingleBarChart)

کامپوننت نمودار میله‌ای برای نمایش یک مجموعه داده (مانند فروش، بازدید، یا هر معیار دیگر). با استفاده از کتابخانه `recharts` ساخته شده و دارای ظاهری شیشه‌ای (glassmorphism)، گرادیانت قابل تنظیم، tooltip شفاف و انیمیشن است. با تم دارک/لایت هماهنگ می‌شود.

## Props

| نام | نوع | پیش‌فرض | توضیحات |
|------|------|---------|----------|
| `data` | `SingleBarChartDataItem[]` | **اجباری** | آرایه داده‌های نمودار (هر آیتم شامل `label`, `value`) |
| `dataLabel` | `string` | `'Value'` | برچسب سری داده (نمایش در tooltip) |
| `height` | `number` | `320` | ارتفاع نمودار (پیکسل) |
| `className` | `string` | `''` | کلاس‌های اضافی Tailwind برای کانتینر بیرونی |
| `barColor` | `string` | `'#3b82f6'` | رنگ میله‌ها (می‌تواند هر کد رنگی مانند `#ef4444` یا `#10b981` باشد) |

### نوع `SingleBarChartDataItem`

| فیلد | نوع | توضیحات |
|-------|------|----------|
| `label` | `string` | برچسب هر دسته (مثلاً نام ماه یا دسته‌بندی) |
| `value` | `number` | مقدار عددی برای آن دسته |

## نحوه استفاده

### ۱. استفاده پایه

```tsx
import { SingleBarChart } from '@msalehi79/panta-design-system';

const chartData = [
  { label: 'فروردین', value: 120 },
  { label: 'اردیبهشت', value: 200 },
  { label: 'خرداد', value: 150 },
];

<SingleBarChart data={chartData} />
```
### ۲. تنظیم برچسب دلخواه و رنگ

```tsx
<SingleBarChart
  data={chartData}
  dataLabel="فروش (میلیون)"
  barColor="#10b981"
/>
```
### ۳. ارتفاع سفارشی

```tsx
<SingleBarChart
  data={chartData}
  height={400}
/>
```
### ۴. اعمال کلاس اضافی برای عرض یا حاشیه

```tsx
<SingleBarChart
  data={chartData}
  className="mx-auto max-w-3xl"
/>
```
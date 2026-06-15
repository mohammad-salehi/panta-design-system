# README.fa

# نمودار خطی تکی (SingleLineChart)

کامپوننت نمودار خطی برای نمایش روند یک مجموعه داده (مانند بازدید ماهانه، قیمت سهام و ...). با استفاده از کتابخانه `recharts` ساخته شده و دارای افکت‌های شیشه‌ای (glassmorphism)، ناحیه زیر خط (area)، گلو (glow) و tooltip شفاف است. رنگ خط و ناحیه قابل تنظیم می‌باشد. با تم دارک/لایت هماهنگ می‌شود.

## Props

| نام | نوع | پیش‌فرض | توضیحات |
|------|------|---------|----------|
| `data` | `SingleLineChartDataItem[]` | **اجباری** | آرایه داده‌های نمودار (هر آیتم شامل `label`, `value`) |
| `dataLabel` | `string` | `'Value'` | برچسب سری داده (نمایش در tooltip) |
| `height` | `number` | `320` | ارتفاع نمودار (پیکسل) |
| `className` | `string` | `''` | کلاس‌های اضافی Tailwind برای کانتینر بیرونی |
| `color` | `string` | `'#10b981'` | رنگ خط و ناحیه زیر آن (می‌تواند هر کد رنگی مانند `#3b82f6`، `#ef4444` و ... باشد) |

### نوع `SingleLineChartDataItem`

| فیلد | نوع | توضیحات |
|-------|------|----------|
| `label` | `string` | برچسب هر نقطه (مثلاً ماه یا بازه زمانی) |
| `value` | `number` | مقدار عددی در آن نقطه |

## نحوه استفاده

### ۱. استفاده پایه

```tsx
import { SingleLineChart } from '@msalehi79/panta-design-system';

const chartData = [
  { label: 'فروردین', value: 120 },
  { label: 'اردیبهشت', value: 200 },
  { label: 'خرداد', value: 150 },
];

<SingleLineChart data={chartData} />
```
### ۲. تنظیم برچسب و رنگ دلخواه

```tsx
<SingleLineChart
  data={chartData}
  dataLabel="بازدید"
  color="#3b82f6"
/>
```
### ۳. ارتفاع سفارشی

```tsx
<SingleLineChart
  data={chartData}
  height={400}
/>
```
### ۴. اعمال کلاس اضافی

```tsx
<SingleLineChart
  data={chartData}
  className="mx-auto max-w-3xl"
/>
```
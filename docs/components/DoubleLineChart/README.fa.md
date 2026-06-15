# نمودار خطی دوگانه (DoubleLineChart)

کامپوننت نمودار خطی دوگانه برای نمایش روند دو مجموعه داده (مانند دارایی و بدهی) در طول زمان. با استفاده از کتابخانه `recharts` ساخته شده و دارای افکت‌های شیشه‌ای (glassmorphism)، گرادیانت، ناحیه زیر خط (area)، گلو (glow) و tooltip شفاف است. با تم دارک/لایت هماهنگ می‌شود.

## Props

| نام | نوع | پیش‌فرض | توضیحات |
|------|------|---------|----------|
| `data` | `DoubleLineChartDataItem[]` | **اجباری** | آرایه داده‌های نمودار (هر آیتم شامل `label`, `x`, `y`) |
| `assetLabel` | `string` | `''` | برچسب سری اول (سبز) در tooltip |
| `liabilityLabel` | `string` | `''` | برچسب سری دوم (قرمز) در tooltip |
| `height` | `number` | `320` | ارتفاع نمودار (پیکسل) |
| `className` | `string` | `''` | کلاس‌های اضافی Tailwind برای کانتینر بیرونی |

### نوع `DoubleLineChartDataItem`

| فیلد | نوع | توضیحات |
|-------|------|----------|
| `label` | `string` | برچسب هر نقطه (مثلاً ماه یا بازه زمانی) |
| `x` | `number` | مقدار سری اول (مثلاً دارایی) |
| `y` | `number` | مقدار سری دوم (مثلاً بدهی) |

## نحوه استفاده

### ۱. استفاده پایه

```tsx
import { DoubleLineChart } from '@msalehi79/panta-design-system';

const chartData = [
  { label: 'فروردین', x: 120, y: 80 },
  { label: 'اردیبهشت', x: 150, y: 90 },
  { label: 'خرداد', x: 180, y: 110 },
];

<DoubleLineChart data={chartData} />
```

### ۲. تنظیم برچسب‌های دلخواه

```tsx
<DoubleLineChart
  data={chartData}
  assetLabel="درآمد"
  liabilityLabel="هزینه"
/>
```

### ۳. ارتفاع سفارشی

```tsx
<DoubleLineChart
  data={chartData}
  height={400}
/>
```

### ۴. اعمال کلاس اضافی

```tsx
<DoubleLineChart
  data={chartData}
  className="mx-auto max-w-4xl"
/>
```
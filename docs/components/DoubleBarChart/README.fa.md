# نمودار میله‌ای دوگانه (DoubleBarChart)

کامپوننت نمودار میله‌ای دوگانه برای مقایسه دو مجموعه داده (مانند دارایی و بدهی). با استفاده از کتابخانه `recharts` ساخته شده و دارای ظاهری شیشه‌ای (glassmorphism) با گرادیانت سبز و صورتی، تابع فرمت‌کننده اعداد (K, M, B)، و قابلیت نمایش tooltip شفاف است. با تم دارک/لایت هماهنگ می‌شود.

## Props

| نام | نوع | پیش‌فرض | توضیحات |
|------|------|---------|----------|
| `data` | `DoubleBarChartDataItem[]` | **اجباری** | آرایه داده‌های نمودار (هر آیتم شامل `label`, `x`, `y`) |
| `assetLabel` | `string` | `''` | برچسب سری اول (سبز) در tooltip |
| `liabilityLabel` | `string` | `''` | برچسب سری دوم (قرمز) در tooltip |
| `height` | `number` | `320` | ارتفاع نمودار (پیکسل) |
| `className` | `string` | `''` | کلاس‌های اضافی Tailwind برای کانتینر بیرونی |

### نوع `DoubleBarChartDataItem`

| فیلد | نوع | توضیحات |
|-------|------|----------|
| `label` | `string` | برچسب هر دسته (مثلاً نام ماه) |
| `x` | `number` | مقدار سری اول (مثلاً دارایی) |
| `y` | `number` | مقدار سری دوم (مثلاً بدهی) |

## نحوه استفاده

### ۱. استفاده پایه

```tsx
import { DoubleBarChart } from '@msalehi79/panta-design-system';

const chartData = [
  { label: 'فروردین', x: 120, y: 80 },
  { label: 'اردیبهشت', x: 150, y: 90 },
  { label: 'خرداد', x: 180, y: 110 },
];

<DoubleBarChart data={chartData} />
```

###  ۲. تنظیم برچسب‌های دلخواه

```tsx

<DoubleBarChart
  data={chartData}
  assetLabel="درآمد"
  liabilityLabel="هزینه"
/>
```
###  ۳. ارتفاع سفارشی
```tsx

<DoubleBarChart
  data={chartData}
  height={400}
/>
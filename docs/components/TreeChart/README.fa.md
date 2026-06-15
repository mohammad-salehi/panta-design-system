# نمودار درختی (TreeChart)

کامپوننت نمودار درختی (Treemap) برای نمایش داده‌های سلسله‌مراتبی با نسبت‌های وزنی. هر مستطیل نشان‌دهنده یک دسته است و مساحت آن متناسب با مقدار عددی آن دسته می‌باشد. با استفاده از کتابخانه `recharts` ساخته شده و دارای افکت‌های شیشه‌ای (glassmorphism)، گرادیانت‌های رنگی، قابلیت hover با بزرگ‌نمایی و tooltip شفاف است.

## Props

| نام | نوع | پیش‌فرض | توضیحات |
|------|------|---------|----------|
| `data` | `TreeChartDataItem[]` | **اجباری** | آرایه داده‌های نمودار (هر آیتم شامل `name`, `value`, `symbol?`) |
| `height` | `number` | `340` | ارتفاع نمودار (پیکسل) |
| `className` | `string` | `''` | کلاس‌های اضافی Tailwind برای کانتینر بیرونی |
| `aspectRatio` | `number` | `4/3` | نسبت ابعاد مستطیل‌ها (عرض به ارتفاع) |
| `valueUnit` | `string` | `''` | واحد مقادیر (مثلاً `'تومان'`, `'عدد'`) که در tooltip و داخل سلول‌ها نمایش داده می‌شود |
| `valueLabel` | `string` | `'Value'` | برچسب مقدار در tooltip |
| `shareLabel` | `string` | `'Share'` | برچسب درصد در tooltip |
| `showValueInCell` | `boolean` | `true` | نمایش مقدار عددی درون سلول (برای سلول‌های بزرگ) |
| `showShareInCell` | `boolean` | `true` | نمایش درصد درون سلول (برای سلول‌های بزرگ) |
| `formatValue` | `(n: number) => string` | `defaultFormat` | تابع سفارشی برای فرمت کردن مقادیر عددی (پیش‌فرض: تبدیل به K, M, B) |

### نوع `TreeChartDataItem`

| فیلد | نوع | توضیحات |
|-------|------|----------|
| `name` | `string` | نام کامل دسته (نمایش در tooltip) |
| `value` | `number` | مقدار عددی آن دسته (تعیین‌کننده مساحت مستطیل) |
| `symbol` | `string` (اختیاری) | نماد کوتاه (مانند نماد سهام) که درون سلول نمایش داده می‌شود |

## نحوه استفاده

### ۱. استفاده پایه

```tsx
import { TreeChart } from '@msalehi79/panta-design-system';

const data = [
  { name: 'فروش داخلی', value: 450, symbol: 'D' },
  { name: 'فروش خارجی', value: 320, symbol: 'E' },
  { name: 'خدمات', value: 280, symbol: 'S' },
];

<TreeChart data={data} />
```
### ۲. تنظیم واحد و برچسب‌های فارسی

```tsx
<TreeChart
  data={data}
  valueUnit="میلیون"
  valueLabel="مقدار"
  shareLabel="درصد"
/>
```
### ۳. ارتفاع و نسبت ابعاد سفارشی

```tsx
<TreeChart
  data={data}
  height={400}
  aspectRatio={16/9}
/>
```
### ۴. مخفی کردن مقادیر درون سلول (فقط نمایش نماد)

```tsx
<TreeChart
  data={data}
  showValueInCell={false}
  showShareInCell={false}
/>
```
### ۵. فرمت سفارشی اعداد

```tsx
const customFormat = (n: number) => new Intl.NumberFormat('fa-IR').format(n);

<TreeChart
  data={data}
  formatValue={customFormat}
/>
```
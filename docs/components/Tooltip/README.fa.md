# Tooltip / راهنما

**English:** A lightweight, fully accessible tooltip that appears on hover or focus. Supports four placements (top, bottom, left, right) with smooth transitions and an arrow.  
**فارسی:** کامپوننت راهنمای سبک و در دسترس که با هاور یا فوکوس ظاهر می‌شود. دارای ۴ موقعیت (بالا، پایین، چپ، راست) با انیمیشن نرم و پیکان.

## Props / پارامترها

| Prop | Type | Default | Description (EN) | توضیحات (FA) |
|------|------|---------|------------------|---------------|
| `content` | `React.ReactNode` | **required** | Content to show inside the tooltip | محتوایی که داخل توضیح نشان داده می‌شود |
| `children` | `React.ReactNode` | **required** | The element the tooltip wraps around | المانی که راهنما به آن متصل می‌شود |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Tooltip position relative to the child | موقعیت نمایش نسبت به فرزند |
| `className` | `string` | `''` | Additional class for the wrapper | کلاس اضافی برای عنصر والد |
| `contentClassName` | `string` | `''` | Additional class for the tooltip bubble | کلاس اضافی برای حباب راهنما |
| `offset` | `number` | `undefined` | (Not yet used, reserved) | (هنوز پیاده‌سازی نشده، رزرو) |
| `disabled` | `boolean` | `false` | Disable the tooltip | غیرفعال کردن راهنما |

## Usage / نحوه استفاده

### 1. Basic usage / استفاده پایه

```tsx
import { Tooltip } from '@msalehi79/panta-design-system';

<Tooltip content="این یک راهنمای ساده است">
  <button className="px-4 py-2 bg-primary text-white rounded">
    هاور کن
  </button>
</Tooltip>
```
### 2. Different placements / موقعیت‌های مختلف

```tsx
<div className="flex gap-8">
  <Tooltip content="بالا" placement="top">
    <button>بالا</button>
  </Tooltip>
  <Tooltip content="پایین" placement="bottom">
    <button>پایین</button>
  </Tooltip>
  <Tooltip content="چپ" placement="left">
    <button>چپ</button>
  </Tooltip>
  <Tooltip content="راست" placement="right">
    <button>راست</button>
  </Tooltip>
</div>
```

### 3. Disabled state / حالت غیرفعال

```tsx
<Tooltip content="این را نمی‌بینید" disabled>
  <button>بدون راهنما</button>
</Tooltip>
```

### 4. Custom styling / استایل سفارشی

```tsx
<Tooltip
  content="راهنمای آبی"
  contentClassName="bg-blue-600 text-white dark:bg-blue-700"
>
  <button>راهنما با استایل دلخواه</button>
</Tooltip>
```

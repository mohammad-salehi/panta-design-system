# Pagination / صفحه‌بندی

**English:** A responsive pagination component with RTL/LTR support, compact mode, and automatic page number calculation.  
**فارسی:** کامپوننت صفحه‌بندی واکنش‌گرا با پشتیبانی از جهت RTL/LTR، حالت فشرده (compact) و محاسبه خودکار شماره صفحات.

## Props / پارامترها

| Prop | Type | Default | Description (EN) | توضیحات (FA) |
|------|------|---------|------------------|---------------|
| `totalItems` | `number` | **required** | Total number of items across all pages | تعداد کل آیتم‌ها در تمام صفحات |
| `pageSize` | `number` | **required** | Number of items per page | تعداد آیتم در هر صفحه |
| `currentPage` | `number` | **required** | Currently active page (1‑based) | صفحه فعال فعلی (شمارش از ۱) |
| `onPageChange` | `(page: number) => void` | **required** | Callback when page changes | تابع هنگام تغییر صفحه |
| `className` | `string` | `''` | Additional CSS classes | کلاس‌های اضافی |
| `rtl` | `boolean` | `false` | Right‑to‑left layout direction | جهت راست‌چین |
| `compact` | `boolean` | `false` | Smaller button sizes and text | اندازه دکمه‌ها و متن کوچک‌تر |

## Usage / نحوه استفاده

```tsx
import { Pagination } from 'panta_design_system';
import { useState } from 'react';

function MyComponent() {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const totalItems = 243;

  return (
    <Pagination
      totalItems={totalItems}
      pageSize={pageSize}
      currentPage={page}
      onPageChange={setPage}
      rtl
      compact={false}
    />
  );
}
# تب‌ها (Tabs)

مجموعه کامپوننت‌های تب برای نمایش محتوای دسته‌بندی شده. دارای خط زیر تب فعال (indicator) که با انیمیشن به آرامی حرکت می‌کند. از جهت‌های RTL و LTR پشتیبانی می‌کند و با تم دارک/لایت هماهنگ است.

## ساختار

کامپوننت‌های این مجموعه شامل:

- **`Tabs`**: کانتینر اصلی که مقدار فعال را نگه می‌دارد.
- **`TabsList`**: لیست دکمه‌های تب (شامل خط زیرین).
- **`TabsTrigger`**: هر دکمه تب (با مقدار value).
- **`TabsContent`**: محتوای هر تب (فقط زمانی نمایش داده می‌شود که تب مربوطه فعال باشد).

## Props

### Tabs

| نام | نوع | پیش‌فرض | توضیحات |
|------|------|---------|----------|
| `defaultValue` | `string` | **اجباری** | مقدار تب فعال در ابتدا (باید با `value` یکی از `TabsTrigger`ها مطابقت داشته باشد) |
| `children` | `React.ReactNode` | **اجباری** | محتوای داخلی (شامل `TabsList` و `TabsContent`) |
| `className` | `string` | `''` | کلاس‌های اضافی برای کانتینر اصلی |

### TabsList

| نام | نوع | پیش‌فرض | توضیحات |
|------|------|---------|----------|
| `children` | `React.ReactNode` | **اجباری** | مجموعه `TabsTrigger`ها |
| `className` | `string` | `''` | کلاس‌های اضافی برای نوار تب‌ها |

### TabsTrigger

| نام | نوع | پیش‌فرض | توضیحات |
|------|------|---------|----------|
| `value` | `string` | **اجباری** | مقدار یکتا برای این تب (باید با `value` در `TabsContent` مطابقت داشته باشد) |
| `children` | `React.ReactNode` | **اجباری** | متن یا محتوای نمایشی روی دکمه |
| `className` | `string` | `''` | کلاس‌های اضافی برای دکمه |

### TabsContent

| نام | نوع | پیش‌فرض | توضیحات |
|------|------|---------|----------|
| `value` | `string` | **اجباری** | مقدار تب مربوطه (باید با `value` یکی از `TabsTrigger`ها مطابقت داشته باشد) |
| `children` | `React.ReactNode` | **اجباری** | محتوایی که در زمان فعال بودن این تب نمایش داده می‌شود |
| `className` | `string` | `''` | کلاس‌های اضافی برای کانتینر محتوا |

## نحوه استفاده

### ۱. استفاده پایه (جهت LTR)

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from 'panta_design_system';

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">پروفایل</TabsTrigger>
    <TabsTrigger value="tab2">تنظیمات</TabsTrigger>
    <TabsTrigger value="tab3">اطلاعیه‌ها</TabsTrigger>
  </TabsList>

  <TabsContent value="tab1">محتوای پروفایل</TabsContent>
  <TabsContent value="tab2">فرم تنظیمات</TabsContent>
  <TabsContent value="tab3">لیست پیام‌ها</TabsContent>
</Tabs>
```
### ۲. استفاده با کلاس‌های سفارشی

```tsx
<Tabs defaultValue="tab1" className="w-full">
  <TabsList className="bg-gray-100 dark:bg-gray-800 rounded-t-xl">
    <TabsTrigger value="tab1" className="px-6">جزئیات</TabsTrigger>
    <TabsTrigger value="tab2">نظرات</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">...</TabsContent>
  <TabsContent value="tab2">...</TabsContent>
</Tabs>
```
### ۳. پشتیبانی از RTL

```tsx
<div dir="rtl">
  <Tabs defaultValue="tab1">
    <TabsList>
      <TabsTrigger value="tab1">صفحه اصلی</TabsTrigger>
      <TabsTrigger value="tab2">درباره ما</TabsTrigger>
    </TabsList>
    <TabsContent value="tab1">محتوای فارسی</TabsContent>
    <TabsContent value="tab2">توضیحات</TabsContent>
  </Tabs>
</div>
```
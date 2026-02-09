# جدول توسعه‌پذیر (ExpandableTable)

کامپوننت جدول با قابلیت نمایش سلسله‌مراتبی (تو در تو)، صفحه‌بندی، ردیف‌های قابل گسترش (expandable) برای نمایش جزئیات، کلیک روی ردیف و نمایش پیشرفت (progress). استایل آن با دیزاین سیستم هماهنگ است و از حالت دارک/لایت پشتیبانی می‌کند.

## Props

### `ExpandableTableProps<T>`

| نام | نوع | توضیحات |
|------|------|----------|
| `data` | `T[]` | **اجباری** – داده‌های اصلی جدول |
| `columns` | `Column<T>[]` | **اجباری** – تعریف ستون‌ها (header, accessorKey/cell, align, width, ...) |
| `className` | `string` | کلاس‌های اضافی برای کانتینر اصلی |
| `pageSize` | `number` | تعداد ردیف‌ها در هر صفحه (در صورت وجود، صفحه‌بندی فعال می‌شود) |
| `getRowId` | `(row: T, path: string) => RowId` | تابع تولید شناسه یکتا برای هر ردیف |
| `getSubRows` | `(row: T) => T[] \| undefined` | تابع استخراج ردیف‌های فرزند (پیش‌فرض: `row.subRows`) |
| `onRowClick` | `(row: T) => void` | تابع فراخوانی هنگام کلیک روی یک ردیف |
| `defaultExpandedIds` | `RowId[]` | آرایه شناسه‌های ردیف‌هایی که در ابتدا باز باشند |
| `renderProgress` | `(value: number) => React.ReactNode` | تابع سفارشی برای نمایش مقدار پیشرفت (در ستون‌هایی که نامشان حاوی `progress` است) |
| `rowDetails` | `(row: T) => React.ReactNode \| React.ReactNode[]` | تابع تولید جزئیات برای ردیف‌های دارای فرزند (در صورت وجود، دکمه گسترش نمایش داده می‌شود) |
| `rowDetailsClassName` | `string` | کلاس‌های اضافی برای کانتینر جزئیات |
| `toolbarSlot` | `React.ReactNode` | نوار ابزار بالای جدول (اختیاری) |
| `footerSlot` | `React.ReactNode` | نوار پایین جدول (اختیاری) |

### نوع `Column<T>`

| فیلد | نوع | توضیحات |
|-------|------|----------|
| `header` | `React.ReactNode` | متن یا محتوای هدر ستون |
| `className` | `string` | کلاس اضافی برای سلول‌های این ستون |
| `cell` | `(row: T) => React.ReactNode` | تابع رندر سفارشی برای سلول (در صورت وجود، `accessorKey` نادیده گرفته می‌شود) |
| `accessorKey` | `keyof T` | کلید دسترسی به مقدار از روی شیء ردیف |
| `align` | `'start' \| 'center' \| 'end'` | ترازبندی متن در سلول |
| `width` | `string \| number` | عرض ستون (می‌تواند پیکسل، درصد یا هر مقدار CSS معتبر باشد) |

## نحوه استفاده

### ۱. تعریف نوع داده و ستون‌ها

```tsx
import { ExpandableTable, Column } from 'panta_design_system';

interface Asset {
  id: string;
  name: string;
  value: number;
  progress?: number;
  subRows?: Asset[];
}

const columns: Column<Asset>[] = [
  { header: 'نام دارایی', accessorKey: 'name', align: 'start' },
  { header: 'مقدار', accessorKey: 'value', align: 'end' },
  { 
    header: 'پیشرفت', 
    accessorKey: 'progress', 
    align: 'center',
    width: '100px' 
  },
];
```
### ۲. استفاده پایه

```tsx
<ExpandableTable
  data={data}
  columns={columns}
  pageSize={10}
  onRowClick={(row) => console.log(row)}
/>
```
### ۳. نمایش جزئیات برای ردیف‌های دارای فرزند

```tsx
const rowDetails = (row: Asset) => (
  <div className="text-sm space-y-1">
    <div>شناسه: {row.id}</div>
    <div>توضیحات اضافی: ...</div>
  </div>
);

<ExpandableTable
  data={data}
  columns={columns}
  rowDetails={rowDetails}
/>
```
### ۴. سفارشی‌سازی نمایش پیشرفت

```tsx
const renderProgress = (value: number) => (
  <div className="w-full bg-gray-200 rounded-full h-2.5">
    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${value}%` }} />
  </div>
);

<ExpandableTable
  data={data}
  columns={columns}
  renderProgress={renderProgress}
/>
```
### ۵. نوار ابزار و فوتر

```tsx
<ExpandableTable
  data={data}
  columns={columns}
  toolbarSlot={<button>افزودن ردیف</button>}
  footerSlot={<div className="text-sm text-center">پایان لیست</div>}
/>
```
# نشان (Badge)

کامپوننت نشان برای نمایش وضعیت، دسته‌بندی یا اطلاعات مکمل در کنار متن. دارای ۵ رنگ (سبز، قرمز، آبی، زرد، بنفش) و ۳ نوع ظاهر (ملایم – soft، پررنگ – solid، حاشیه‌ای – outline) است. با تم دارک/لایت هماهنگ می‌شود.

## Props

| نام | نوع | پیش‌فرض | توضیحات |
|------|------|---------|----------|
| `color` | `'green' \| 'red' \| 'blue' \| 'yellow' \| 'purple'` | `'blue'` | رنگ نشان |
| `variant` | `'soft' \| 'solid' \| 'outline'` | `'soft'` | سبک ظاهری: ملایم، پررنگ یا حاشیه‌ای |
| `className` | `string` | `''` | کلاس‌های اضافی Tailwind برای سفارشی‌سازی |
| `children` | `React.ReactNode` | **اجباری** | محتوای داخل نشان (معمولاً متن) |
| سایر props | `React.HTMLAttributes<HTMLSpanElement>` | - | تمام props استاندارد یک عنصر `span` مانند `onClick`, `id`, `title` و ... |

## نحوه استفاده

### ۱. رنگ‌ها و واریانت‌های مختلف

```tsx
import { Badge } from 'panta_design_system';

<Badge color="green">تأیید شده</Badge>
<Badge color="red" variant="solid">خطا</Badge>
<Badge color="yellow" variant="outline">در انتظار</Badge>
<Badge color="purple">ویژه</Badge>
```
### ۲. استفاده با واریانت ملایم (پیش‌فرض)

```tsx
<Badge color="blue">جدید</Badge>
<Badge color="green">فعال</Badge>
```
### ۳. واریانت پررنگ (solid)

```tsx
<Badge color="red" variant="solid">غیرفعال</Badge>
<Badge color="yellow" variant="solid">هشدار</Badge>
```
### ۴. واریانت حاشیه‌ای (outline)

```tsx
<Badge color="green" variant="outline">پایدار</Badge>
<Badge color="purple" variant="outline">آزمایشی</Badge>
```
### ۵. ترکیب با کلاس‌های اضافی

```tsx
<Badge className="ml-2 text-xs">با فاصله</Badge>
```

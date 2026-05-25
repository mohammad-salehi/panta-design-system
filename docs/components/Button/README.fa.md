# دکمه (Button)

کامپوننت دکمه برای انجام اقدامات کاربر. دارای سه نوع ظاهری (primary، danger، warning) و سه اندازه (sm، md، lg) است. از گرادیانت استفاده می‌کند و از حالت دارک/لایت پشتیبانی می‌کند.

## Props

| نام | نوع | پیش‌فرض | توضیحات |
|------|------|---------|----------|
| `variant` | `'primary' \| 'danger' \| 'warning'` | `'primary'` | نوع ظاهری دکمه: primary (آبی گرادیانت)، danger (قرمز گرادیانت)، warning (زرد گرادیانت) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | اندازه دکمه: sm (کوچک)، md (متوسط)، lg (بزرگ) |
| `className` | `string` | `''` | کلاس‌های اضافی Tailwind برای سفارشی‌سازی (مانند `w-48`، `mt-4` و ...) |
| سایر props | `React.ButtonHTMLAttributes` | - | تمام props استاندارد دکمه مانند `onClick`، `disabled`، `type`، `id` و ... |

## نحوه استفاده

```tsx
import { Button } from 'panta_design_system';

۱. اصلی (primary)
<Button variant="primary" onClick={() => alert('کلیک شد')}>
 اصلی
</Button>

۲. خطر (danger)
<Button variant="danger" size="sm">
  حذف
</Button>

۳. هشدار (warning)
<Button variant="warning" size="lg">
  هشدار
</Button>

۴. با عرض دلخواه (با کلاس Tailwind)
<Button variant="primary" className="w-48">
  عرض ۴۸ پیکسل
</Button>

۵. غیرفعال
<Button variant="primary" disabled>
  غیرفعال
</Button>
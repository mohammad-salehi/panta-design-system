# Input / ورودی

**English:** A customizable input field with support for labels, hints, error/success states, left/right icons, password toggle, and full-width option.  
**فارسی:** فیلد ورودی قابل تنظیم با پشتیبانی از برچسب، راهنما، وضعیت خطا/موفقیت، آیکون چپ/راست، نمایش/مخفی کردن رمز عبور و گزینه تمام‌عرض.

## Props / پارامترها

| Prop | Type | Default | Description (EN) | توضیحات (FA) |
|------|------|---------|------------------|---------------|
| `type` | `'text' \| 'email' \| 'password' \| 'number' \| 'tel' \| 'url' \| 'search'` | `'text'` | Input type | نوع ورودی |
| `label` | `string` | `undefined` | Label text | متن برچسب |
| `hint` | `string` | `undefined` | Helper text below input | متن راهنما در پایین |
| `error` | `string` | `undefined` | Error message (red) | پیام خطا (قرمز) |
| `success` | `string` | `undefined` | Success message (green) | پیام موفقیت (سبز) |
| `leftIcon` | `React.ReactNode` | `undefined` | Icon on the left side | آیکون در سمت چپ |
| `rightIcon` | `React.ReactNode` | `undefined` | Icon on the right side (not shown for password type) | آیکون در سمت راست (برای رمز نمایش داده نمی‌شود) |
| `enablePasswordToggle` | `boolean` | `true` | Show/hide toggle for password type | دکمه نمایش/مخفی برای نوع password |
| `fullWidth` | `boolean` | `true` | Take full width of parent container | عرض کامل والد |
| `disabled` | `boolean` | `false` | Disable the input | غیرفعال کردن ورودی |
| `required` | `boolean` | `false` | Mark as required (shows asterisk) | علامت ضروری (ستاره) |
| سایر props | `React.InputHTMLAttributes<HTMLInputElement>` | - | Standard input attributes like `placeholder`, `value`, `onChange`, etc. | ویژگی‌های استاندارد input مانند placeholder، value، onChange و ... |

## Usage / نحوه استفاده

```tsx
import { Input, IconMail } from 'panta_design_system';

// 1. Basic input
<Input placeholder="نام خود را وارد کنید" />

// 2. With label and required
<Input label="ایمیل" type="email" required placeholder="example@domain.com" />

// 3. With error message
<Input label="رمز عبور" type="password" error="رمز عبور باید حداقل ۸ کاراکتر باشد" />

// 4. With left icon and hint
<Input label="ایمیل" leftIcon={<IconMail />} hint="ایمیل سازمانی خود را وارد کنید" />

// 5. Disabled state
<Input label="نام کاربری" value="علی رضایی" disabled />

// 6. Without full width
<Input fullWidth={false} placeholder="عرض خودکار" />
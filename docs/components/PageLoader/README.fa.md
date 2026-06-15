# PageLoader / بارگذاری صفحه

کامپوننت نمایش بارگذاری در سطح کل صفحه (full‑screen) با دو حالت: **loader** (اسپینر + متن) و **spinner** (متن با انیمیشن حروف).

## Props

| Prop | Type | Default | Description (EN) | توضیحات (FA) |
|------|------|---------|------------------|---------------|
| `open` | `boolean` | `true` | Controls visibility of the loader | کنترل نمایش بارگذار |
| `text` | `string` | **required** | Text to display (static in `loader` mode, animated in `spinner` mode) | متنی که نمایش داده می‌شود (در حالت `loader` استاتیک، در حالت `spinner` با انیمیشن حروف) |
| `backdrop` | `boolean` | `true` | Show a semi‑transparent background | نمایش پس‌زمینه نیمه‌شفاف |
| `blur` | `boolean` | `true` | Apply backdrop blur effect | اعمال افکت بلور به پس‌زمینه |
| `mode` | `'loader' \| 'spinner'` | `'loader'` | Visual style: `loader` (spinner + static text) or `spinner` (animated character‑by‑character text) | نوع نمایش: `loader` (اسپینر + متن ثابت) یا `spinner` (متن با انیمیشن حروف) |
| `className` | `string` | `''` | Additional CSS classes | کلاس‌های اضافی |

## Usage / نحوه استفاده

```tsx
import { PageLoader } from '@msalehi79/panta-design-system';

// 1. Loader mode (default)
<PageLoader text="در حال بارگذاری..." />

// 2. Spinner mode (animated text)
<PageLoader mode="spinner" text="CED Portal" />

// 3. Without backdrop and blur
<PageLoader text="Loading" backdrop={false} blur={false} />

// 4. Custom open state
<PageLoader open={isLoading} text="Please wait" mode="spinner" />
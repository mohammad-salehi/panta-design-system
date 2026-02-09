# Loader / بارگذاری

**English:** A component for displaying loading states in two modes: normal (spinner + text) and skeleton (shimmer lines).  
**فارسی:** کامپوننت نمایش وضعیت بارگذاری داده‌ها در دو حالت: اسپینر+متن (normal) و اسکلت‌لودینگ (skeleton).

## Props / پارامترها

| Prop | Type | Default | Description (EN) | توضیحات (FA) |
|------|------|---------|------------------|---------------|
| `mode` | `'normal' \| 'skeleton'` | `'normal'` | Loading mode: normal spinner or skeleton | نوع نمایش بارگذاری |
| `text` | `string` | `'در حال بارگذاری...'` | Text shown below spinner (normal mode) | متن زیر اسپینر |
| `count` | `number` | `4` | Number of skeleton items (skeleton mode) | تعداد آیتم‌های اسکلت |
| `skeletonHeight` | `number` | `14` | Height of first line in each skeleton item (px) | ارتفاع خط اول هر آیتم اسکلت (پیکسل) |
| `withAvatar` | `boolean` | `false` | Show a circular avatar on the left (skeleton mode) | نمایش آواتار دایره‌ای در کنار خطوط |
| `className` | `string` | `''` | Additional CSS classes | کلاس‌های اضافی |

## Usage / نحوه استفاده

```tsx
import { Loader } from 'panta_design_system';

// 1. Normal mode
<Loader />
<Loader text="Fetching data..." />

// 2. Skeleton mode (without avatar)
<Loader mode="skeleton" count={6} skeletonHeight={16} />

// 3. Skeleton mode with avatar
<Loader mode="skeleton" withAvatar count={5} skeletonHeight={20} />

// 4. Full customization
<Loader mode="skeleton" count={8} skeletonHeight={18} withAvatar className="mt-4 p-2" />
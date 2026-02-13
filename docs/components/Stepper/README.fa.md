# Stepper / مراحل‌بندی

**English:** A visual stepper component that displays progress through a sequence of steps. Supports active, completed, and pending states with animated borders and glass‑morphism styling.  
**فارسی:** کامپوننت نمایش مراحل که پیشرفت را در یک دنباله نشان می‌دهد. از حالت‌های فعال، کامل و در انتظار پشتیبانی می‌کند و دارای حاشیه متحرک و استایل شیشه‌ای است.

## Props / پارامترها

| Prop | Type | Default | Description (EN) | توضیحات (FA) |
|------|------|---------|------------------|---------------|
| `step` | `number` | **required** | Current step index (1‑based) | مرحله فعلی (شمارش از ۱) |
| `steps` | `StepperItem[]` | **required** | Array of step titles | آرایه عناوین مراحل |
| `className` | `string` | `''` | Additional CSS classes | کلاس‌های اضافی |

### `StepperItem` Type

| Field | Type | Description |
|-------|------|-------------|
| `title` | `string` | Display text for the step |

## Usage / نحوه استفاده

### 1. Basic usage / استفاده پایه

```tsx
import { Stepper } from '@msalehi79/panta-design-system';

const steps = [
  { title: 'اطلاعات شخصی' },
  { title: 'اطلاعات شغلی' },
  { title: 'تأیید نهایی' },
];

<Stepper step={2} steps={steps} />
```
### 2. Different steps / مراحل مختلف

```tsx
<Stepper step={1} steps={steps} /> // مرحله اول فعال
<Stepper step={3} steps={steps} /> // همه مراحل کامل
```
### 3. Custom className / کلاس سفارشی

```tsx
<Stepper step={2} steps={steps} className="justify-between" />
```

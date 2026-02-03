# جعبه (Box)

کامپوننت جعبه یک کارت لوکس با پس‌زمینه شیشه‌ای (glassmorphism)، حاشیه گرد، سایه و قابلیت جمع‌شدگی (collapsible) است. برای نمایش اطلاعات، فرم‌ها، آمار، یا هر محتوای دیگری در پنل‌های مدیریتی مناسب است. از تم دارک/لایت پشتیبانی می‌کند.

## Props

| نام | نوع | پیش‌فرض | توضیحات |
|------|------|---------|----------|
| `dir` | `'rtl' \| 'ltr'` | `'rtl'` | جهت متن و چیدمان داخلی |
| `title` | `React.ReactNode` | - | عنوان اصلی جعبه (در هدر سمت راست) |
| `description` | `React.ReactNode` | - | توضیحات زیر عنوان (اختیاری) |
| `icon` | `React.ReactNode` | - | آیکون سمت راست عنوان (قبل از متن) |
| `actions` | `React.ReactNode` | - | دکمه‌ها یا المان‌های عملیاتی در هدر (سمت چپ) |
| `children` | `React.ReactNode` | - | محتوای اصلی جعبه (در بخش مرکزی) |
| `footer` | `React.ReactNode` | - | محتوای پایین جعبه (قسمت فوتر) |
| `className` | `string` | `''` | کلاس‌های اضافی Tailwind برای کانتینر اصلی |
| `collapsible` | `boolean` | `false` | آیا جعبه قابلیت جمع/باز شدن دارد؟ |
| `defaultCollapsed` | `boolean` | `false` | وضعیت اولیه جمع‌شدگی (اگر `collapsible` فعال باشد) |
| `onToggle` | `(collapsed: boolean) => void` | - | تابع فراخوانی هنگام تغییر وضعیت جمع/باز (در صورت فعال بودن `collapsible`) |

## نحوه استفاده

### ۱. جعبه ساده با عنوان و محتوا

```tsx
import { Box } from 'panta_design_system';

<Box
    icon={<MoreVerticalIcon size={20} />}
    title="عنوان"
    description="انتخاب گزینه برای مشاهده اطلاعات"
    actions={
        <Button variant="warning">
            تنظیمات
        </Button>
    }
    footer={
        <div className="text-sm text-muted-foreground">
            آخرین بروزرسانی: امروز
        </div>
    }
>
    <SearchableSelect
        options={brokers}
        placeholder="همه تنظیمات"
        onChange={(val) => console.log("selected:", val)} value={""}
    />
</Box>
# انتخابگر جستجوگر (SearchableSelect)

کامپوننت انتخابگر با قابلیت جستجو و پشتیبانی از حالت بارگذاری و جهت‌دهی راست‌چین/چپ‌چین. ظاهر آن با دیزاین سیستم هماهنگ است و از پورتل (portal) برای نمایش dropdown استفاده می‌کند تا از المان‌های دیگر صفحه عبور کند.

## Props

| نام | نوع | پیش‌فرض | توضیحات |
|------|------|---------|----------|
| `label` | `string` | - | برچسب بالای دکمه (اختیاری) |
| `value` | `string` | **اجباری** | مقدار انتخاب شده (مربوط به `value` در گزینه‌ها) |
| `onChange` | `(value: string) => void` | **اجباری** | تابع فراخوانی هنگام تغییر انتخاب |
| `options` | `Option[]` | **اجباری** | آرایه گزینه‌ها (هر گزینه شامل `id?`, `label`, `value`) |
| `placeholder` | `string` | `'انتخاب کنید...'` | متن نمایشی زمانی که هیچ گزینه‌ای انتخاب نشده است |
| `searchable` | `boolean` | `false` | فعال کردن جستجو در dropdown |
| `searchPlaceholder` | `string` | `'جستجو...'` | placeholder فیلد جستجو |
| `allLabel` | `string` | - | اگر ارائه شود، گزینه «همه» با مقدار خالی (`value: ""`) به ابتدا اضافه می‌شود |
| `loading` | `boolean` | `false` | وضعیت بارگذاری – اگر `true`، به جای گزینه‌ها پیام «در حال بارگذاری...» نمایش داده می‌شود |
| `direction` | `'rtl' \| 'ltr'` | `'rtl'` | جهت متن و چیدمان |
| `className` | `string` | `''` | کلاس‌های اضافی Tailwind برای container اصلی |
| `disabled` | `boolean` | `false` | غیرفعال کردن دکمه انتخابگر |

### نوع `Option`

| فیلد | نوع | توضیحات |
|-------|------|----------|
| `id` | `string \| number` (اختیاری) | شناسه یکتا (در صورت نبودن، از `value` استفاده می‌شود) |
| `label` | `string` | متن نمایشی گزینه |
| `value` | `string` | مقدار داخلی گزینه |

## نحوه استفاده

### ۱. انتخابگر ساده بدون جستجو

```tsx
import { SearchableSelect } from '@msalehi79/panta-design-system';

const [city, setCity] = useState('');

const cities = [
  { value: 'tehran', label: 'تهران' },
  { value: 'mashhad', label: 'مشهد' },
  { value: 'isfahan', label: 'اصفهان' },
];

<SearchableSelect
  label="شهر"
  value={city}
  onChange={setCity}
  options={cities}
  placeholder="شهر خود را انتخاب کنید"
/>


# DatePicker Component

A date picker component supporting **Gregorian** and **Jalali (Persian)** calendars. Features portal dropdown, date range limits, month/year navigation, and ISO string output. Styled according to the design system.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `Date \| null` | **required** | Currently selected date (Date object) |
| `onChange` | `(value: Date \| null) => void` | **required** | Callback when date changes (returns Date object) |
| `onChangeFormatted` | `(value: string) => void` | - | Callback with ISO string output (e.g., `2026-06-01T13:24:53.207Z`) |
| `calendar` | `'gregorian' \| 'jalali'` | `'gregorian'` | Calendar type: Gregorian or Jalali (Persian) |
| `placeholder` | `string` | `'Select date'` | Placeholder text when no date is selected |
| `displayFormat` | `'YYYY/MM/DD' \| 'YYYY-MM-DD'` | `'YYYY/MM/DD'` | Display format in the trigger button (display only, does not affect output) |
| `disabled` | `boolean` | `false` | Disables the date picker |
| `className` | `string` | `''` | Additional Tailwind classes for the trigger button |
| `minDate` | `Date` | - | Minimum selectable date |
| `maxDate` | `Date` | - | Maximum selectable date |
| `closeOnSelect` | `boolean` | `true` | Whether to close the panel automatically after selecting a date |

## Usage

### 1. Gregorian date picker (default)

```tsx
import { DatePicker } from 'panta_design_system';
import { useState } from 'react';

const [selectedDate, setSelectedDate] = useState<Date | null>(null);

<DatePicker
  value={selectedDate}
  onChange={setSelectedDate}
  onChangeFormatted={(isoString) => {
    console.log('ISO:', isoString); // e.g., 2026-06-01T13:24:53.207Z
  }}
/>
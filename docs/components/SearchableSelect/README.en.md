
# SearchableSelect Component

A dropdown select component with optional search, loading state, and RTL/LTR support. Styled according to the design system and uses a portal to render the dropdown above all other elements.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Optional label above the button |
| `value` | `string` | **required** | Currently selected value (matches an option's `value`) |
| `onChange` | `(value: string) => void` | **required** | Callback when selection changes |
| `options` | `Option[]` | **required** | Array of options (each with `id?`, `label`, `value`) |
| `placeholder` | `string` | `'انتخاب کنید...'` | Placeholder text when no option is selected |
| `searchable` | `boolean` | `false` | Enable search input inside dropdown |
| `searchPlaceholder` | `string` | `'جستجو...'` | Placeholder for search input |
| `allLabel` | `string` | - | If provided, adds an "All" option with `value: ""` at the top |
| `loading` | `boolean` | `false` | Loading state – shows "Loading..." message instead of options |
| `direction` | `'rtl' \| 'ltr'` | `'rtl'` | Text and layout direction |
| `className` | `string` | `''` | Additional Tailwind classes for the container |
| `disabled` | `boolean` | `false` | Disables the select button |

### `Option` Type

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string \| number` (optional) | Unique identifier (falls back to `value`) |
| `label` | `string` | Display text |
| `value` | `string` | Internal value |

## Usage

### 1. Basic select without search

```tsx
import { SearchableSelect } from 'panta_design_system';

const [city, setCity] = useState('');

const cities = [
  { value: 'tehran', label: 'Tehran' },
  { value: 'mashhad', label: 'Mashhad' },
  { value: 'isfahan', label: 'Isfahan' },
];

<SearchableSelect
  label="City"
  value={city}
  onChange={setCity}
  options={cities}
  placeholder="Select a city"
/>
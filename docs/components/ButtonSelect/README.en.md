
# ButtonSelect Component

A set of buttons that behave like radio buttons. Suitable for selecting one option from a list. Can be used in forms, filters, and quick settings. Supports horizontal, vertical, and grid layouts, different sizes, two visual variants (default and primary), and both controlled/uncontrolled modes.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Controlled value (if provided, component becomes controlled) |
| `defaultValue` | `string` | - | Default value for uncontrolled mode |
| `onChange` | `(value: string) => void` | - | Callback when selection changes |
| `options` | `SwitchOption[]` | **required** | Array of options (each with `label`, `value`, `disabled?`) |
| `dir` | `'rtl' \| 'ltr'` | `'rtl'` | Text and layout direction |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `variant` | `'default' \| 'primary'` | `'primary'` | Visual style of the active button: `primary` (blue gradient) or `default` (blue border) |
| `orientation` | `'horizontal' \| 'vertical' \| 'grid'` | `'horizontal'` | Layout direction: horizontal, vertical, or grid |
| `columns` | `number` | `4` | Number of columns in `grid` mode (recommended 1–12) |
| `fullWidth` | `boolean` | `false` | In horizontal mode, whether buttons take full width of the parent |
| `className` | `string` | `''` | Additional Tailwind classes for the container |

### `SwitchOption` Type

| Field | Type | Description |
|-------|------|-------------|
| `label` | `React.ReactNode` | Button content (can be text or JSX) |
| `value` | `string` | Internal value of the option |
| `disabled` | `boolean` (optional) | Disables the option |

## Usage

### 1. Controlled mode

```tsx
import { ButtonSelect } from '@msalehi79/panta-design-system';
import { useState } from 'react';

const [selected, setSelected] = useState('option1');

const options = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
];

<ButtonSelect
  value={selected}
  onChange={setSelected}
  options={options}
/>
# Input Component

**English:** A customizable input field with support for labels, hints, error/success states, left/right icons, password toggle, and full-width option.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'text' \| 'email' \| 'password' \| 'number' \| 'tel' \| 'url' \| 'search'` | `'text'` | Input type |
| `label` | `string` | `undefined` | Label text |
| `hint` | `string` | `undefined` | Helper text below input |
| `error` | `string` | `undefined` | Error message (red) |
| `success` | `string` | `undefined` | Success message (green) |
| `leftIcon` | `React.ReactNode` | `undefined` | Icon on the left side |
| `rightIcon` | `React.ReactNode` | `undefined` | Icon on the right side (not shown for password type) |
| `enablePasswordToggle` | `boolean` | `true` | Show/hide toggle for password type |
| `fullWidth` | `boolean` | `true` | Take full width of parent container |
| `disabled` | `boolean` | `false` | Disable the input |
| `required` | `boolean` | `false` | Mark as required (shows asterisk) |
| other props | `React.InputHTMLAttributes<HTMLInputElement>` | - | Standard input attributes like `placeholder`, `value`, `onChange`, etc. |

## Usage

```tsx
import { Input, IconMail } from 'panta_design_system';

// 1. Basic input
<Input placeholder="Enter your name" />

// 2. With label and required
<Input label="Email" type="email" required placeholder="example@domain.com" />

// 3. With error message
<Input label="Password" type="password" error="Password must be at least 8 characters" />

// 4. With left icon and hint
<Input label="Email" leftIcon={<IconMail />} hint="Enter your work email" />

// 5. Disabled state
<Input label="Username" value="Ali Rezaei" disabled />

// 6. Without full width
<Input fullWidth={false} placeholder="Auto width" />
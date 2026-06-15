# Button Component

The Button component is used for user actions. It comes with three visual variants (primary, danger, warning) and three sizes (sm, md, lg). It uses gradients and supports dark/light mode.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'danger' \| 'warning'` | `'primary'` | Visual style: primary (blue gradient), danger (red gradient), warning (yellow gradient) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size: sm (small), md (medium), lg (large) |
| `className` | `string` | `''` | Additional Tailwind classes for customization (e.g., `w-48`, `mt-4`, etc.) |
| Other props | `React.ButtonHTMLAttributes` | - | Standard button props like `onClick`, `disabled`, `type`, `id`, etc. |

## Usage

```tsx
import { Button } from '@msalehi79/panta-design-system';

1. Primary
<Button variant="primary" onClick={() => alert('Clicked')}>
  Primary
</Button>

2. Danger
<Button variant="danger" size="sm">
  Delete
</Button>

3. Warning
<Button variant="warning" size="lg">
  Warning
</Button>

4. Custom width (using Tailwind class)
<Button variant="primary" className="w-48">
  Width 48px
</Button>

5. Disabled
<Button variant="primary" disabled>
  Disabled
</Button>
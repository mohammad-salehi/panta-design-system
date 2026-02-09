# Badge Component

A badge component for displaying statuses, categories, or supplementary information. Available in 5 colors (green, red, blue, yellow, purple) and 3 visual variants (soft, solid, outline). Compatible with dark/light theme.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `'green' \| 'red' \| 'blue' \| 'yellow' \| 'purple'` | `'blue'` | Badge color |
| `variant` | `'soft' \| 'solid' \| 'outline'` | `'soft'` | Visual style: soft, solid, or outline |
| `className` | `string` | `''` | Additional Tailwind classes for customization |
| `children` | `React.ReactNode` | **required** | Badge content (usually text) |
| Other props | `React.HTMLAttributes<HTMLSpanElement>` | - | All standard `span` attributes like `onClick`, `id`, `title`, etc. |

## Usage

### 1. Different colors and variants

```tsx
import { Badge } from 'panta_design_system';

<Badge color="green">Approved</Badge>
<Badge color="red" variant="solid">Error</Badge>
<Badge color="yellow" variant="outline">Pending</Badge>
<Badge color="purple">Special</Badge>
```
### 2. Soft variant (default)

```tsx
<Badge color="blue">New</Badge>
<Badge color="green">Active</Badge>
```
### 3. Solid variant

```tsx
<Badge color="red" variant="solid">Disabled</Badge>
<Badge color="yellow" variant="solid">Warning</Badge>
```
### 4. Outline variant

```tsx
<Badge color="green" variant="outline">Stable</Badge>
<Badge color="purple" variant="outline">Beta</Badge>
```
### 5. With extra classes

```tsx
<Badge className="ml-2 text-xs">With margin</Badge>
```
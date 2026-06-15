# PageLoader

A full‑screen loading component with two modes: **loader** (spinner + static text) and **spinner** (animated character‑by‑character text).

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | `true` | Controls visibility of the loader |
| `text` | `string` | **required** | Text to display (static in `loader` mode, animated in `spinner` mode) |
| `backdrop` | `boolean` | `true` | Show a semi‑transparent background |
| `blur` | `boolean` | `true` | Apply backdrop blur effect |
| `mode` | `'loader' \| 'spinner'` | `'loader'` | Visual style: `loader` (spinner + static text) or `spinner` (animated character‑by‑character text) |
| `className` | `string` | `''` | Additional CSS classes |

## Usage

```tsx
import { PageLoader } from '@msalehi79/panta-design-system';

// 1. Loader mode (default)
<PageLoader text="Loading..." />

// 2. Spinner mode (animated text)
<PageLoader mode="spinner" text="CED Portal" />

// 3. Without backdrop and blur
<PageLoader text="Loading" backdrop={false} blur={false} />

// 4. Custom open state
<PageLoader open={isLoading} text="Please wait" mode="spinner" />
# Loader Component

A component for displaying loading states in two modes: normal (spinner + text) and skeleton (shimmer lines). Compatible with dark/light theme.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `'normal' \| 'skeleton'` | `'normal'` | Loading mode: normal spinner or skeleton |
| `text` | `string` | `'در حال بارگذاری...'` | Text shown below spinner (normal mode) |
| `count` | `number` | `4` | Number of skeleton items (skeleton mode) |
| `skeletonHeight` | `number` | `14` | Height of first line in each skeleton item (px) |
| `withAvatar` | `boolean` | `false` | Show a circular avatar on the left (skeleton mode) |
| `className` | `string` | `''` | Additional CSS classes |

## Usage

```tsx
import { Loader } from 'panta_design_system';

// 1. Normal mode
<Loader />
<Loader text="Fetching data..." />

// 2. Skeleton mode (without avatar)
<Loader mode="skeleton" count={6} skeletonHeight={16} />

// 3. Skeleton mode with avatar
<Loader mode="skeleton" withAvatar count={5} skeletonHeight={20} />

// 4. Full customization
<Loader mode="skeleton" count={8} skeletonHeight={18} withAvatar className="mt-4 p-2" />
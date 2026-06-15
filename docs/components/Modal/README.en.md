
# Modal Component

A modal dialog component for displaying content on top of the page. Uses a portal to render above all elements. Supports closing via backdrop click, Escape key, or close button. Prevents body scrolling when open. Fully responsive and compatible with dark/light theme.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | **required** | Controls modal visibility |
| `onClose` | `() => void` | **required** | Callback when modal should close (triggered by backdrop, Escape, or close button) |
| `title` | `React.ReactNode` | - | Modal title (can be text or JSX) |
| `children` | `React.ReactNode` | **required** | Modal content |
| `className` | `string` | `''` | Additional Tailwind classes for the modal panel |
| `closeOnBackdrop` | `boolean` | `true` | Whether clicking on the backdrop closes the modal |
| `closeOnEscape` | `boolean` | `true` | Whether pressing Escape closes the modal |
| `showHeader` | `boolean` | `true` | Show header section (title + close button) |
| `showCloseButton` | `boolean` | `true` | Show close button in the header |
| `maxWidthClass` | `string` | `'max-w-md'` | Tailwind max-width class for the panel (e.g., `max-w-lg`, `max-w-xl`) |
| `portalTarget` | `HTMLElement \| null` | `document.body` | Portal mount target (defaults to `body`) |
| `zIndex` | `number` | `9999` | CSS `z-index` for the modal container |
| `ariaLabel` | `string` | `'Modal dialog'` | `aria-label` for accessibility (used when title is not a string) |

## Usage

### 1. Simple modal with title and close button

```tsx
import { Modal, Button } from '@msalehi79/panta-design-system';
import { useState } from 'react';

const [open, setOpen] = useState(false);

<Button variant="primary" onClick={() => setOpen(true)}>Open Modal</Button>

<Modal open={open} onClose={() => setOpen(false)} title="Modal Title">
  <p>Modal content goes here.</p>
  <div className="mt-4 flex justify-end gap-2">
    <Button variant="danger" onClick={() => setOpen(false)}>Close</Button>
  </div>
</Modal>
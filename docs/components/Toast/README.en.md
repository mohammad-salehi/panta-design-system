
# Toast Component

A set of components for displaying temporary notifications (toasts) with support for success, error, and warning types, multiple positions, and customizable duration. Built with React Context API and can be triggered from anywhere in the app.

## Props

### `ToastProvider`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | **required** | Application content to be wrapped |

### `useToast()`

Hook that returns `{ toast }`.

#### `toast(message, options?)`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `message` | `string` | **required** | Toast message text |
| `options.type` | `'success' \| 'danger' \| 'alert'` | `'success'` | Visual type (success, error, warning) |
| `options.duration` | `number` | `4000` | Display duration in milliseconds |
| `options.position` | `'top-left' \| 'top-right' \| 'top-center' \| 'bottom-left' \| 'bottom-right' \| 'bottom-center'` | `'top-right'` | Toast position |

## Usage

### 1. Add `ToastProvider` at the top level (e.g., `app/layout.tsx`)

```tsx
import { ToastProvider } from '@msalehi79/panta-design-system';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
```
### 2. Use useToast inside any client component

```tsx
'use client';
import { useToast } from '@msalehi79/panta-design-system';

function MyComponent() {
  const { toast } = useToast();

  return (
    <div className="space-x-2">
      <button onClick={() => toast('Operation completed successfully')}>
        Success
      </button>
      <button onClick={() => toast('An error occurred', { type: 'danger' })}>
        Error
      </button>
      <button onClick={() => toast('Please check this', { type: 'alert', duration: 3000 })}>
        Warning
      </button>
      <button onClick={() => toast('Custom position', { position: 'bottom-left' })}>
        Bottom‑left
      </button>
    </div>
  );
}
```
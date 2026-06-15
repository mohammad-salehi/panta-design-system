# Pagination Component

**English:** A responsive pagination component with RTL/LTR support, compact mode, and automatic page number calculation.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `totalItems` | `number` | **required** | Total number of items across all pages |
| `pageSize` | `number` | **required** | Number of items per page |
| `currentPage` | `number` | **required** | Currently active page (1‑based) |
| `onPageChange` | `(page: number) => void` | **required** | Callback when page changes |
| `className` | `string` | `''` | Additional CSS classes |
| `rtl` | `boolean` | `false` | Right‑to‑left layout direction |
| `compact` | `boolean` | `false` | Smaller button sizes and text |

## Usage

```tsx
import { Pagination } from '@msalehi79/panta-design-system';
import { useState } from 'react';

function MyComponent() {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const totalItems = 243;

  return (
    <Pagination
      totalItems={totalItems}
      pageSize={pageSize}
      currentPage={page}
      onPageChange={setPage}
      rtl
      compact={false}
    />
  );
}
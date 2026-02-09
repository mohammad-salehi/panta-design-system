# Expandable Table (ExpandableTable)

A hierarchical table component supporting nested rows, pagination, expandable rows for details, row click callback, and progress rendering. Styled according to the design system with dark/light theme support.

## Props

### `ExpandableTableProps<T>`

| Name | Type | Description |
|------|------|-------------|
| `data` | `T[]` | **required** – Main table data |
| `columns` | `Column<T>[]` | **required** – Column definitions (header, accessorKey/cell, align, width, etc.) |
| `className` | `string` | Additional CSS class for the outer container |
| `pageSize` | `number` | Number of rows per page (enables pagination) |
| `getRowId` | `(row: T, path: string) => RowId` | Function to generate a unique ID for each row |
| `getSubRows` | `(row: T) => T[] \| undefined` | Function to extract child rows (default: `row.subRows`) |
| `onRowClick` | `(row: T) => void` | Callback when a row is clicked |
| `defaultExpandedIds` | `RowId[]` | Array of row IDs that should be initially expanded |
| `renderProgress` | `(value: number) => React.ReactNode` | Custom function to render progress values (for columns named "progress") |
| `rowDetails` | `(row: T) => React.ReactNode \| React.ReactNode[]` | Function returning details for rows that have children (shows expand button) |
| `rowDetailsClassName` | `string` | Additional CSS class for the details container |
| `toolbarSlot` | `React.ReactNode` | Optional toolbar content above the table |
| `footerSlot` | `React.ReactNode` | Optional footer content below the table |

### `Column<T>` Type

| Field | Type | Description |
|-------|------|-------------|
| `header` | `React.ReactNode` | Column header text or content |
| `className` | `string` | Additional CSS class for cells in this column |
| `cell` | `(row: T) => React.ReactNode` | Custom cell render function (overrides `accessorKey`) |
| `accessorKey` | `keyof T` | Key to access the value from the row object |
| `align` | `'start' \| 'center' \| 'end'` | Text alignment within cells |
| `width` | `string \| number` | Column width (pixels, percentage, or any valid CSS value) |

## Usage

### 1. Define data type and columns

```tsx
import { ExpandableTable, Column } from 'panta_design_system';

interface Asset {
  id: string;
  name: string;
  value: number;
  progress?: number;
  subRows?: Asset[];
}

const columns: Column<Asset>[] = [
  { header: 'Asset Name', accessorKey: 'name', align: 'start' },
  { header: 'Value', accessorKey: 'value', align: 'end' },
  { 
    header: 'Progress', 
    accessorKey: 'progress', 
    align: 'center',
    width: '100px' 
  },
];
```
### 2. Basic usage

```tsx
<ExpandableTable
  data={data}
  columns={columns}
  pageSize={10}
  onRowClick={(row) => console.log(row)}
/>
```
### 3. Display details for parent rows

```tsx
const rowDetails = (row: Asset) => (
  <div className="text-sm space-y-1">
    <div>ID: {row.id}</div>
    <div>Additional info: ...</div>
  </div>
);

<ExpandableTable
  data={data}
  columns={columns}
  rowDetails={rowDetails}
/>
```
### 4. Custom progress rendering

```tsx
const renderProgress = (value: number) => (
  <div className="w-full bg-gray-200 rounded-full h-2.5">
    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${value}%` }} />
  </div>
);

<ExpandableTable
  data={data}
  columns={columns}
  renderProgress={renderProgress}
/>
```
### 5. Toolbar and footer

```tsx
<ExpandableTable
  data={data}
  columns={columns}
  toolbarSlot={<button>Add Row</button>}
  footerSlot={<div className="text-sm text-center">End of list</div>}
/>
```
# DoubleBarChart Component

A dual bar chart component for comparing two datasets (e.g., assets and liabilities). Built with the `recharts` library, featuring glassmorphism styling, green and pink gradients, a number formatter (K, M, B), and a transparent tooltip. Compatible with dark/light theme.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `DoubleBarChartDataItem[]` | **required** | Array of chart data (each item contains `label`, `x`, `y`) |
| `assetLabel` | `string` | `''` | Label for the first series (green) in the tooltip |
| `liabilityLabel` | `string` | `''` | Label for the second series (red) in the tooltip |
| `height` | `number` | `320` | Chart height in pixels |
| `className` | `string` | `''` | Additional Tailwind classes for the outer container |

### `DoubleBarChartDataItem` Type

| Field | Type | Description |
|-------|------|-------------|
| `label` | `string` | Category label (e.g., month name) |
| `x` | `number` | Value for the first series (e.g., assets) |
| `y` | `number` | Value for the second series (e.g., liabilities) |

## Usage

### 1. Basic usage

```tsx
import { DoubleBarChart } from '@msalehi79/panta-design-system';

const chartData = [
  { label: 'Farvardin', x: 120, y: 80 },
  { label: 'Ordibehesht', x: 150, y: 90 },
  { label: 'Khordad', x: 180, y: 110 },
];

<DoubleBarChart data={chartData} />
```

### 2. Custom labels

```tsx
<DoubleBarChart
  data={chartData}
  assetLabel="Income"
  liabilityLabel="Expense"
/>
```

### 3. Custom height
```tsx

<DoubleBarChart
  data={chartData}
  height={400}
/>

# Circle Chart (CircleChart)

A donut/pie chart component for displaying proportions of a dataset. Built with the `recharts` library, featuring percentage labels, total value in the center, and a legend. Colors can be auto‑assigned or customized. Compatible with dark/light theme.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `CircleChartItem[]` | **required** | Array of chart data (each item has `label`, `value`, `color?`) |
| `unit` | `string` | - | Unit of the values (e.g., `'USD'`, `'items'`) displayed in tooltip and center |
| `height` | `number` | `340` | Chart height in pixels |
| `dir` | `'rtl' \| 'ltr'` | `'ltr'` | Text and legend layout direction |
| `className` | `string` | `''` | Additional Tailwind classes for the outer container |

### `CircleChartItem` Type

| Field | Type | Description |
|-------|------|-------------|
| `label` | `string` | Label for each slice |
| `value` | `number` | Numerical value of the slice |
| `color` | `string` (optional) | Custom color for the slice (falls back to default palette) |

## Usage

### 1. Basic usage

```tsx
import { CircleChart } from 'panta_design_system';

const data = [
  { label: 'Assets', value: 250 },
  { label: 'Liabilities', value: 120 },
  { label: 'Equity', value: 180 },
];

<CircleChart data={data} />
```
### 2. Custom unit and RTL direction

```tsx
<CircleChart
  data={data}
  unit="million USD"
  dir="rtl"
/>
```
### 3. Custom height

```tsx
<CircleChart
  data={data}
  height={400}
/>
```
### 4. Custom colors

```tsx
const dataWithColors = [
  { label: 'Sales', value: 100, color: '#10b981' },
  { label: 'Returns', value: 30, color: '#ef4444' },
];

<CircleChart data={dataWithColors} />
```
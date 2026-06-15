# Double Line Chart (DoubleLineChart)

A dual line chart component for visualizing the trend of two datasets (e.g., assets and liabilities) over time. Built with the `recharts` library, featuring glassmorphism effects, gradients, area under the line, glow, and a transparent tooltip. Compatible with dark/light theme.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `DoubleLineChartDataItem[]` | **required** | Array of chart data (each item contains `label`, `x`, `y`) |
| `assetLabel` | `string` | `''` | Label for the first series (green) in the tooltip |
| `liabilityLabel` | `string` | `''` | Label for the second series (red) in the tooltip |
| `height` | `number` | `320` | Chart height in pixels |
| `className` | `string` | `''` | Additional Tailwind classes for the outer container |

### `DoubleLineChartDataItem` Type

| Field | Type | Description |
|-------|------|-------------|
| `label` | `string` | Label for each point (e.g., month or time period) |
| `x` | `number` | Value for the first series (e.g., assets) |
| `y` | `number` | Value for the second series (e.g., liabilities) |

## Usage

### 1. Basic usage

```tsx
import { DoubleLineChart } from '@msalehi79/panta-design-system';

const chartData = [
  { label: 'Jan', x: 120, y: 80 },
  { label: 'Feb', x: 150, y: 90 },
  { label: 'Mar', x: 180, y: 110 },
];

<DoubleLineChart data={chartData} />
```
### 2. Custom labels

```tsx
<DoubleLineChart
  data={chartData}
  assetLabel="Revenue"
  liabilityLabel="Expenses"
/>
```
### 3. Custom height

```tsx
<DoubleLineChart
  data={chartData}
  height={400}
/>
```
### 4. Additional class

```tsx
<DoubleLineChart
  data={chartData}
  className="mx-auto max-w-4xl"
/>
```
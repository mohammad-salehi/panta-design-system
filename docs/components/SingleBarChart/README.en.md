
# Single Bar Chart (SingleBarChart)

A bar chart component for displaying a single dataset (e.g., sales, visits, or any metric). Built with the `recharts` library, featuring glassmorphism styling, a customizable gradient, transparent tooltip, and animation. Compatible with dark/light theme.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `SingleBarChartDataItem[]` | **required** | Array of chart data (each item contains `label`, `value`) |
| `dataLabel` | `string` | `'Value'` | Label for the data series (displayed in tooltip) |
| `height` | `number` | `320` | Chart height in pixels |
| `className` | `string` | `''` | Additional Tailwind classes for the outer container |
| `barColor` | `string` | `'#3b82f6'` | Color of the bars (any valid CSS color, e.g., `#ef4444` or `#10b981`) |

### `SingleBarChartDataItem` Type

| Field | Type | Description |
|-------|------|-------------|
| `label` | `string` | Category label (e.g., month name) |
| `value` | `number` | Numerical value for that category |

## Usage

### 1. Basic usage

```tsx
import { SingleBarChart } from '@msalehi79/panta-design-system';

const chartData = [
  { label: 'Jan', value: 120 },
  { label: 'Feb', value: 200 },
  { label: 'Mar', value: 150 },
];

<SingleBarChart data={chartData} />
```
### 2. Custom label and bar color

```tsx
<SingleBarChart
  data={chartData}
  dataLabel="Sales (million)"
  barColor="#10b981"
/>
```
### 3. Custom height

```tsx
<SingleBarChart
  data={chartData}
  height={400}
/>
```
### 4. Additional class for width or margin

```tsx
<SingleBarChart
  data={chartData}
  className="mx-auto max-w-3xl"
/>
```

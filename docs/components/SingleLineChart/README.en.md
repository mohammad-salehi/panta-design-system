
# Single Line Chart (SingleLineChart)

A line chart component for visualizing the trend of a single dataset (e.g., monthly visits, stock prices). Built with the `recharts` library, featuring glassmorphism styling, area under the line, glow effect, and a transparent tooltip. The line and area colors are customizable. Compatible with dark/light theme.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `SingleLineChartDataItem[]` | **required** | Array of chart data (each item contains `label`, `value`) |
| `dataLabel` | `string` | `'Value'` | Label for the data series (displayed in tooltip) |
| `height` | `number` | `320` | Chart height in pixels |
| `className` | `string` | `''` | Additional Tailwind classes for the outer container |
| `color` | `string` | `'#10b981'` | Color of the line and the area gradient (any CSS color, e.g., `#3b82f6`, `#ef4444`) |

### `SingleLineChartDataItem` Type

| Field | Type | Description |
|-------|------|-------------|
| `label` | `string` | Label for each point (e.g., month or time period) |
| `value` | `number` | Numerical value at that point |

## Usage

### 1. Basic usage

```tsx
import { SingleLineChart } from '@msalehi79/panta-design-system';

const chartData = [
  { label: 'Jan', value: 120 },
  { label: 'Feb', value: 200 },
  { label: 'Mar', value: 150 },
];

<SingleLineChart data={chartData} />
```
### 2. Custom label and line color

```tsx
<SingleLineChart
  data={chartData}
  dataLabel="Visits"
  color="#3b82f6"
/>
```
### 3. Custom height

```tsx
<SingleLineChart
  data={chartData}
  height={400}
/>
```
### 4. Additional class

```tsx
<SingleLineChart
  data={chartData}
  className="mx-auto max-w-3xl"
/>
```
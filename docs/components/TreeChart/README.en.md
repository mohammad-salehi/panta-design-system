
# Tree Chart (TreeChart)

A treemap component for displaying hierarchical data with weighted proportions. Each rectangle represents a category, and its area is proportional to the category's value. Built with the `recharts` library, featuring glassmorphism styling, color gradients, hover effects with glow, and a transparent tooltip.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `TreeChartDataItem[]` | **required** | Array of chart data (each item contains `name`, `value`, `symbol?`) |
| `height` | `number` | `340` | Chart height in pixels |
| `className` | `string` | `''` | Additional Tailwind classes for the outer container |
| `aspectRatio` | `number` | `4/3` | Aspect ratio of rectangles (width/height) |
| `valueUnit` | `string` | `''` | Unit of values (e.g., `'USD'`, `'items'`) displayed in tooltip and cells |
| `valueLabel` | `string` | `'Value'` | Label for values in tooltip |
| `shareLabel` | `string` | `'Share'` | Label for percentage share in tooltip |
| `showValueInCell` | `boolean` | `true` | Show numerical value inside cells (when space permits) |
| `showShareInCell` | `boolean` | `true` | Show percentage inside cells (when space permits) |
| `formatValue` | `(n: number) => string` | `defaultFormat` | Custom function to format numerical values (default: K, M, B) |

### `TreeChartDataItem` Type

| Field | Type | Description |
|-------|------|-------------|
| `name` | `string` | Full name of the category (displayed in tooltip) |
| `value` | `number` | Numerical value (determines rectangle area) |
| `symbol` | `string` (optional) | Short symbol (e.g., stock ticker) displayed inside the cell |

## Usage

### 1. Basic usage

```tsx
import { TreeChart } from 'panta_design_system';

const data = [
  { name: 'Domestic Sales', value: 450, symbol: 'D' },
  { name: 'International Sales', value: 320, symbol: 'I' },
  { name: 'Services', value: 280, symbol: 'S' },
];

<TreeChart data={data} />
```
### 2. Custom unit and labels

```tsx
<TreeChart
  data={data}
  valueUnit="M"
  valueLabel="Amount"
  shareLabel="Share"
/>
```
### 3. Custom height and aspect ratio

```tsx
<TreeChart
  data={data}
  height={400}
  aspectRatio={16/9}
/>
```
### 4. Hide values inside cells (show symbols only)

```tsx
<TreeChart
  data={data}
  showValueInCell={false}
  showShareInCell={false}
/>
```
### 5. Custom number formatting

```tsx
const customFormat = (n: number) => new Intl.NumberFormat('en-US').format(n);

<TreeChart
  data={data}
  formatValue={customFormat}
/>
```

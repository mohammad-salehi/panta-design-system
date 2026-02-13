# Tooltip Component

A lightweight, accessible tooltip that appears on hover or focus. Supports four placements (top, bottom, left, right) with smooth transitions and an arrow.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `React.ReactNode` | **required** | Content to show inside the tooltip |
| `children` | `React.ReactNode` | **required** | The element the tooltip wraps around |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Tooltip position relative to the child |
| `className` | `string` | `''` | Additional class for the wrapper element |
| `contentClassName` | `string` | `''` | Additional class for the tooltip bubble |
| `offset` | `number` | `undefined` | (Reserved for future use) Manual offset |
| `disabled` | `boolean` | `false` | Disable the tooltip |

## Usage

### 1. Basic usage

```tsx
import { Tooltip } from '@msalehi79/panta-design-system';

<Tooltip content="This is a simple tooltip">
  <button className="px-4 py-2 bg-primary text-white rounded">
    Hover me
  </button>
</Tooltip>
```
### 2. Different placements

```tsx
<div className="flex gap-8">
  <Tooltip content="Top" placement="top">
    <button>Top</button>
  </Tooltip>
  <Tooltip content="Bottom" placement="bottom">
    <button>Bottom</button>
  </Tooltip>
  <Tooltip content="Left" placement="left">
    <button>Left</button>
  </Tooltip>
  <Tooltip content="Right" placement="right">
    <button>Right</button>
  </Tooltip>
</div>
```
### 3. Disabled state

```tsx
<Tooltip content="You won't see this" disabled>
  <button>No tooltip</button>
</Tooltip>
```
### 4. Custom styling

```tsx
<Tooltip
  content="Blue tooltip"
  contentClassName="bg-blue-600 text-white dark:bg-blue-700"
>
  <button>Styled tooltip</button>
</Tooltip>
```
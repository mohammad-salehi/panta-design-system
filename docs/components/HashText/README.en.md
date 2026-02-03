
# HashText Component

A component to display shortened text (e.g., transaction hashes, wallet addresses, tokens) with copy functionality. Shows the beginning and end of the text and replaces the middle with a separator.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | **required** | The full original text |
| `startChars` | `number` | `6` | Number of characters to show from the start |
| `endChars` | `number` | `4` | Number of characters to show from the end |
| `separator` | `string` | `'…'` | Separator between the start and end parts |
| `className` | `string` | `''` | Additional Tailwind classes for the container |
| `showCopyButton` | `boolean` | `true` | Show copy button |
| `copyOnClickText` | `boolean` | `false` | Whether clicking on the text also triggers copy |

## Usage

### 1. Basic usage

```tsx
import { HashText } from 'panta_design_system';

<HashText text="0x71C7656EC7ab88b098defB751B7401B5f6d8976F" />
// Output: 0x71C7…76F
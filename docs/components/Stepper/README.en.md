# Stepper Component

A visual stepper component that displays progress through a sequence of steps. Supports active, completed, and pending states with animated borders and glass‑morphism styling.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `step` | `number` | **required** | Current step index (1‑based) |
| `steps` | `StepperItem[]` | **required** | Array of step titles |
| `className` | `string` | `''` | Additional CSS classes |

### `StepperItem` Type

| Field | Type | Description |
|-------|------|-------------|
| `title` | `string` | Display text for the step |

## Usage

### 1. Basic usage

```tsx
import { Stepper } from '@msalehi79/panta-design-system';

const steps = [
  { title: 'Personal Info' },
  { title: 'Employment Details' },
  { title: 'Final Confirmation' },
];

<Stepper step={2} steps={steps} />
```
### 2. Different steps

```tsx
<Stepper step={1} steps={steps} /> // first step active
<Stepper step={3} steps={steps} /> // all steps completed
```
### 3. Custom className

```tsx
<Stepper step={2} steps={steps} className="justify-between" />
```
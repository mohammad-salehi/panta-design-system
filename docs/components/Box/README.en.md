# Box Component

A luxury card component with glassmorphism background, rounded corners, shadow, and optional collapsible behavior. Ideal for displaying information, forms, statistics, or any content in admin panels. Supports dark/light theme.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `dir` | `'rtl' \| 'ltr'` | `'rtl'` | Text and layout direction |
| `title` | `React.ReactNode` | - | Main title (displayed on the right side of the header) |
| `description` | `React.ReactNode` | - | Subtitle or description below the title |
| `icon` | `React.ReactNode` | - | Icon displayed to the left of the title (before text) |
| `actions` | `React.ReactNode` | - | Action buttons or elements in the header (left side) |
| `children` | `React.ReactNode` | - | Main content of the box |
| `footer` | `React.ReactNode` | - | Footer content at the bottom of the box |
| `className` | `string` | `''` | Additional Tailwind classes for the outer container |
| `collapsible` | `boolean` | `false` | Whether the box can be collapsed/expanded |
| `defaultCollapsed` | `boolean` | `false` | Initial collapsed state (if `collapsible` is true) |
| `onToggle` | `(collapsed: boolean) => void` | - | Callback when collapse/expand state changes |

## Usage

### 1. Simple box with title and content

```tsx
import { Box } from 'panta_design_system';

<Box
    icon={<MoreVerticalIcon size={20} />}
    title="title"
    description="select option"
    actions={
        <Button variant="warning">
            Setting
        </Button>
    }
    footer={
        <div className="text-sm text-muted-foreground">
            Last update: today
        </div>
    }
>
    <SearchableSelect
        options={brokers}
        placeholder="All Setting"
        onChange={(val) => console.log("selected:", val)} value={""}
    />
</Box>
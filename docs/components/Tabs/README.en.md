
# Tabs Component

A set of tab components for displaying categorized content. Includes an animated indicator (underline) that moves smoothly under the active tab. Supports RTL and LTR directions and is compatible with dark/light theme.

## Structure

The component set includes:

- **`Tabs`**: Root container that holds the active value.
- **`TabsList`**: Container for the tab buttons (includes the underline indicator).
- **`TabsTrigger`**: Each tab button (with a unique `value`).
- **`TabsContent`**: Content panel for each tab (only rendered when the corresponding tab is active).

## Props

### Tabs

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultValue` | `string` | **required** | Initial active tab value (must match a `TabsTrigger` value) |
| `children` | `React.ReactNode` | **required** | Inner content (includes `TabsList` and `TabsContent`) |
| `className` | `string` | `''` | Additional CSS classes for the container |

### TabsList

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | **required** | The `TabsTrigger` components |
| `className` | `string` | `''` | Additional CSS classes for the tab bar |

### TabsTrigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | **required** | Unique value for this tab (must match the `value` of a `TabsContent`) |
| `children` | `React.ReactNode` | **required** | Display text or content for the button |
| `className` | `string` | `''` | Additional CSS classes for the button |

### TabsContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | **required** | Matches the `value` of a `TabsTrigger` |
| `children` | `React.ReactNode` | **required** | Content to show when this tab is active |
| `className` | `string` | `''` | Additional CSS classes for the content container |

## Usage

### 1. Basic usage (LTR)

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from 'panta_design_system';

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Profile</TabsTrigger>
    <TabsTrigger value="tab2">Settings</TabsTrigger>
    <TabsTrigger value="tab3">Notifications</TabsTrigger>
  </TabsList>

  <TabsContent value="tab1">Profile content</TabsContent>
  <TabsContent value="tab2">Settings form</TabsContent>
  <TabsContent value="tab3">Messages list</TabsContent>
</Tabs>
```
### 2. Custom styling

```tsx
<Tabs defaultValue="tab1" className="w-full">
  <TabsList className="bg-gray-100 dark:bg-gray-800 rounded-t-xl">
    <TabsTrigger value="tab1" className="px-6">Details</TabsTrigger>
    <TabsTrigger value="tab2">Comments</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">...</TabsContent>
  <TabsContent value="tab2">...</TabsContent>
</Tabs>
```
### 3. RTL support

```tsx
<div dir="rtl">
  <Tabs defaultValue="tab1">
    <TabsList>
      <TabsTrigger value="tab1">Home</TabsTrigger>
      <TabsTrigger value="tab2">About</TabsTrigger>
    </TabsList>
    <TabsContent value="tab1">محتوا به فارسی</TabsContent>
    <TabsContent value="tab2">توضیحات</TabsContent>
  </Tabs>
</div>
```
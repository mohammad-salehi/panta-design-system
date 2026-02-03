
# Header Component

The Header component is a horizontal bar displayed at the top of the page on desktop screens. It includes a title and a theme toggle button (dark/light mode). This header is only visible on viewports larger than 1024px (desktop) and is hidden on mobile (the mobile top bar is handled by the `Navbar` component).

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `'سامانه نظارت بر کارگزاری‌های مبادله رمزارز ایران'` | Title displayed in the header (optional) |

> **Note:** This component internally manages the open states (`isOpen`, `isMobileOpen`) and uses `useTheme` for theme switching. No additional props are required.

## Usage

### 1. Use inside a layout (e.g., `app/panel/layout.tsx`)

```tsx
import { Header, ThemeProvider } from 'panta_design_system';
import 'panta_design_system/styles.css';

export default function PanelLayout({ children }) {
  return (
    <ThemeProvider>
      <Header title="Admin Panel" />
      <div className="pt-20">{children}</div>
    </ThemeProvider>
  );
}
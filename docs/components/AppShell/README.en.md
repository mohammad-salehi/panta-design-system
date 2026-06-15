# AppShell Component

The `AppShell` component is a complete, ready‑to‑use layout for building web applications with an admin‑panel‑style structure. It includes:

- Responsive sidebar (desktop & mobile)
- Desktop header bar
- Mobile top bar (hamburger menu + theme toggle)
- Sticky footer
- Dark/light theme management
- Toast notifications provider

By using this component, you don't need to manually wire up `ThemeProvider`, `ToastProvider`, sidebar layout, header, or footer.

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `navItems` | `NavItem[]` | **required** | Array of sidebar menu items (see `NavItem` structure below) |
| `currentPath` | `string` | **required** | Current route path – used to highlight the active menu item |
| `userFullName` | `string` | `'User'` | Full name displayed in the sidebar user card |
| `userRole` | `string` | `''` | User role (e.g., `'Admin'`) – used for filtering items with `access` |
| `onChangePassword` | `() => void` | `-` | Callback when the change password button is clicked |
| `onLogout` | `() => void` | `-` | Callback when the logout button is clicked |
| `brand` | `React.ReactNode` | `-` | Custom brand element (logo, text, etc.) shown in the sidebar header |
| `title` | `string` | `''` | Title shown in the sidebar (next to brand) and used as fallback for desktop header |
| `headerTitle` | `string` | `''` | Custom title for the desktop header (overrides `title` when provided) |
| `className` | `string` | `''` | Additional Tailwind CSS classes for the desktop sidebar |
| `children` | `React.ReactNode` | `-` | Main page content |

---

## `NavItem` Structure

| Field | Type | Description |
|-------|------|-------------|
| `link` | `string` | Destination URL (e.g., `'/dashboard'`) |
| `label` | `string` | Display text |
| `access` | `string` (optional) | Required role – item hidden if `access` !== `userRole` |
| `icon` | `React.ReactNode` (optional) | Icon element (usually an `<svg>`) displayed next to the label |

---

## Usage

### 1. Define menu items

```tsx
const navItems = [
  {
    link: '/dashboard',
    label: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    link: '/users',
    label: 'Users',
    icon: <UsersIcon />,
    access: 'ADMIN',
  },
];
```
### Use in a layout (e.g., Next.js App Router app/layout.tsx)

```tsx
import { AppShell } from '@msalehi79/panta-design-system';

export default function RootLayout({ children }) {
  const pathname = usePathname(); // from 'next/navigation'

  return (
    <html lang="en" dir="ltr">
      <body>
        <AppShell
          navItems={navItems}
          currentPath={pathname}
          userFullName="Ali Rezaei"
          userRole="ADMIN"
          onChangePassword={() => console.log('change password')}
          onLogout={() => console.log('logout')}
          title="Admin Panel"
          headerTitle="Dashboard"
          brand={<img src="/logo.png" className="h-8" alt="logo" />}
        >
          {children}
        </AppShell>
      </body>
    </html>
  );
}
```
# Navbar Component

The Navbar component (side menu) for admin panels. Includes a header (brand, title), user card, main navigation, and a logout button. Fully responsive with desktop and mobile modes. Supports dark/light theme.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `navItems` | `NavItem[]` | **required** | Array of menu items (each with `link`, `label`, `access?`, `icon?`) |
| `isOpen` | `boolean` | **required** | Desktop sidebar open state (controlled by parent) |
| `setIsOpen` | `(open: boolean) => void` | **required** | Function to change desktop sidebar state |
| `isMobileOpen` | `boolean` | **required** | Mobile sidebar open state (controlled by parent) |
| `setIsMobileOpen` | `(open: boolean) => void` | **required** | Function to change mobile sidebar state |
| `currentPath` | `string` | **required** | Current route path (to highlight active item) |
| `userFullName` | `string` | `'User'` | Full name displayed in the user card |
| `userRole` | `string` | `''` | User role (e.g., `'Admin'`) |
| `title` | `string` | **required** | Site title |
| `onChangePassword` | `() => void` | `-` | Callback when the change password button is clicked |
| `onLogout` | `() => void` | `-` | Callback when the logout button is clicked |
| `brand` | `React.ReactNode` | `-` | Brand element (logo or name) in the sidebar header |
| `className` | `string` | `''` | Additional Tailwind classes for customization |

### `NavItem` Type

| Field | Type | Description |
|-------|------|-------------|
| `link` | `string` | Destination URL (e.g., `'/panel/dashboard'`) |
| `label` | `string` | Display text |
| `access` | `string` (optional) | Required role; item hidden if `access` !== `userRole` |
| `icon` | `React.ReactNode` (optional) | Icon (usually an `<svg>`) |

## Usage Example

### 1. Define menu items

```tsx
'use client';

import { NavItem } from '@msalehi79/panta-design-system';

const navItems: NavItem[] = [
  {
    link: '/panel/dashboard',
    label: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    link: '/panel/exchanges',
    label: 'Exchanges',
    icon: <ExchangeIcon />,
    access: 'ADMIN',
  },
];

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from '@msalehi79/panta-design-system';

export default function PanelLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [...]; // your items

  const handleLogout = () => {
    // clear token, redirect to login
  };

  const handleChangePassword = () => {
    // open change password modal
  };

  return (
    <div>
      <Navbar
        navItems={navItems}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        currentPath={pathname}
        userFullName="Ali Rezaei"
        userRole="Admin"
        onChangePassword={handleChangePassword}
        onLogout={handleLogout}
        brand={<img src="/logo.svg" className="h-8" alt="logo" />}
      />
      <main className="lg:ml-64 p-6">{children}</main>
    </div>
  );
}
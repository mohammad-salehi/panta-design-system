import React from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'danger' | 'warning';
    size?: 'sm' | 'md' | 'lg';
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

type Theme = 'light' | 'dark';
interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}
declare const ThemeProvider: ({ children }: {
    children: React.ReactNode;
}) => react_jsx_runtime.JSX.Element;
declare const useTheme: () => ThemeContextType;

type HeaderProps = {
    title?: string;
};
declare function Header({ title }: HeaderProps): react_jsx_runtime.JSX.Element;

interface NavItem {
    link: string;
    label: string;
    access?: string;
    icon?: React.ReactNode;
}
interface NavbarProps {
    navItems: NavItem[];
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    isMobileOpen: boolean;
    setIsMobileOpen: (open: boolean) => void;
    userFullName?: string;
    userRole?: string;
    onChangePassword?: () => void;
    onLogout?: () => void;
    brand?: React.ReactNode;
    className?: string;
    currentPath: string;
}
declare const Navbar: React.FC<NavbarProps>;

type Option = {
    id?: string | number;
    label: string;
    value: string;
};
type SearchableSelectProps = {
    label?: string;
    value: string;
    onChange: (value: string) => void;
    options: Option[];
    placeholder?: string;
    searchable?: boolean;
    searchPlaceholder?: string;
    allLabel?: string;
    loading?: boolean;
    direction?: "rtl" | "ltr";
    className?: string;
    disabled?: boolean;
};
declare function SearchableSelect({ label, value, onChange, options, placeholder, searchable, searchPlaceholder, allLabel, loading, direction, className, disabled, }: SearchableSelectProps): react_jsx_runtime.JSX.Element;

type ModalProps = {
    open: boolean;
    onClose: () => void;
    title?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
    /**
     * Close on backdrop click
     * default: true
     */
    closeOnBackdrop?: boolean;
    /**
     * Close on Escape key
     * default: true
     */
    closeOnEscape?: boolean;
    /**
     * Show header section (title + close button)
     * default: true
     */
    showHeader?: boolean;
    /**
     * Render close button
     * default: true
     */
    showCloseButton?: boolean;
    /**
     * Modal max-width tailwind class
     * default: max-w-md
     */
    maxWidthClass?: string;
    /**
     * Portal mount target (default: document.body)
     */
    portalTarget?: HTMLElement | null;
    /**
     * Container z-index (default: 9999)
     */
    zIndex?: number;
    /**
     * Optional aria label when no title is provided
     */
    ariaLabel?: string;
};
declare function Modal({ open, onClose, title, children, className, closeOnBackdrop, closeOnEscape, showHeader, showCloseButton, maxWidthClass, portalTarget, zIndex, ariaLabel, }: ModalProps): React.ReactPortal;

export { Button, type ButtonProps, Header, type HeaderProps, Modal, type ModalProps, type NavItem, Navbar, type NavbarProps, SearchableSelect, type SearchableSelectProps, ThemeProvider, useTheme };

import React, { ReactNode } from 'react';
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

type CalendarType = "gregorian" | "jalali";
type DisplayFormat = "YYYY/MM/DD" | "YYYY-MM-DD";
type DatePickerValue = Date | null;
type DatePickerProps = {
    value: DatePickerValue;
    onChange: (value: DatePickerValue) => void;
    /**
     * خروجی نهایی برای هر دو تقویم:
     * همیشه ISO string
     * مثال:
     * 2026-06-01T13:24:53.207Z
     */
    onChangeFormatted?: (value: string) => void;
    calendar?: CalendarType;
    placeholder?: string;
    /**
     * فقط برای نمایش داخل دکمه
     * روی خروجی callback اثری ندارد
     */
    displayFormat?: DisplayFormat;
    disabled?: boolean;
    className?: string;
    minDate?: Date;
    maxDate?: Date;
    closeOnSelect?: boolean;
};
declare function DatePicker({ value, onChange, onChangeFormatted, calendar, placeholder, displayFormat, disabled, className, minDate, maxDate, closeOnSelect, }: DatePickerProps): react_jsx_runtime.JSX.Element;

type BoxProps = {
    dir?: "rtl" | "ltr";
    title?: React.ReactNode;
    description?: React.ReactNode;
    icon?: React.ReactNode;
    actions?: React.ReactNode;
    children?: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
    collapsible?: boolean;
    defaultCollapsed?: boolean;
    onToggle?: (collapsed: boolean) => void;
};
declare function Box({ dir, title, description, icon, actions, children, footer, className, collapsible, defaultCollapsed, onToggle, }: BoxProps): react_jsx_runtime.JSX.Element;

type SwitchOption = {
    label: React.ReactNode;
    value: string;
    disabled?: boolean;
};
interface ButtonSelectProps {
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    options: SwitchOption[];
    dir?: "rtl" | "ltr";
    size?: "sm" | "md" | "lg";
    variant?: "default" | "primary";
    orientation?: "horizontal" | "vertical" | "grid";
    columns?: number;
    fullWidth?: boolean;
    className?: string;
}
declare function ButtonSelect({ value, defaultValue, onChange, options, dir, size, variant, orientation, columns, fullWidth, className, }: ButtonSelectProps): react_jsx_runtime.JSX.Element;

interface HashTextProps {
    text: string;
    startChars?: number;
    endChars?: number;
    separator?: string;
    className?: string;
    showCopyButton?: boolean;
    copyOnClickText?: boolean;
}
declare const HashText: React.FC<HashTextProps>;

type DoubleBarChartDataItem = {
    label: string;
    x: number;
    y: number;
};
interface Props$1 {
    data: DoubleBarChartDataItem[];
    assetLabel?: string;
    liabilityLabel?: string;
    height?: number;
    className?: string;
}
declare const DoubleBarChart: React.FC<Props$1>;

type DoubleLineChartDataItem = {
    label: string;
    x: number;
    y: number;
};
interface Props {
    data: DoubleLineChartDataItem[];
    assetLabel?: string;
    liabilityLabel?: string;
    height?: number;
    className?: string;
}
declare const DoubleLineChart: React.FC<Props>;

type SingleBarChartDataItem = {
    label: string;
    value: number;
};
interface SingleBarChartProps {
    data: SingleBarChartDataItem[];
    dataLabel?: string;
    height?: number;
    className?: string;
    barColor?: string;
}
declare const SingleBarChart: React.FC<SingleBarChartProps>;

type SingleLineChartDataItem = {
    label: string;
    value: number;
};
interface SingleLineChartProps {
    data: SingleLineChartDataItem[];
    dataLabel?: string;
    height?: number;
    className?: string;
    color?: string;
}
declare const SingleLineChart: React.FC<SingleLineChartProps>;

type CircleChartItem = {
    label: string;
    value: number;
    color?: string;
};
type CircleChartProps = {
    unit?: string;
    data: CircleChartItem[];
    height?: number;
    dir?: "rtl" | "ltr";
    className?: string;
};
declare function CircleChart({ unit, data, height, dir, className, }: CircleChartProps): react_jsx_runtime.JSX.Element;

type TreeChartDataItem = {
    name: string;
    value: number;
    symbol?: string;
};
interface TreeMapChartProps {
    data: TreeChartDataItem[];
    height?: number;
    className?: string;
    aspectRatio?: number;
    valueUnit?: string;
    valueLabel?: string;
    shareLabel?: string;
    showValueInCell?: boolean;
    showShareInCell?: boolean;
    formatValue?: (n: number) => string;
}
declare const TreeChart: React.FC<TreeMapChartProps>;

type TabsProps = {
    defaultValue: string;
    children: ReactNode;
    className?: string;
};
type TabsListProps = {
    children: ReactNode;
    className?: string;
};
type TabsTriggerProps = {
    value: string;
    children: ReactNode;
    className?: string;
};
type TabsContentProps = {
    value: string;
    children: ReactNode;
    className?: string;
};
declare function Tabs({ defaultValue, children, className }: TabsProps): react_jsx_runtime.JSX.Element;
declare function TabsList({ children, className }: TabsListProps): react_jsx_runtime.JSX.Element;
declare function TabsTrigger({ value, children, className, }: TabsTriggerProps): react_jsx_runtime.JSX.Element;
declare function TabsContent({ value, children, className, }: TabsContentProps): react_jsx_runtime.JSX.Element;

export { Box, type BoxProps, Button, type ButtonProps, ButtonSelect, type ButtonSelectProps, CircleChart, type CircleChartProps, DatePicker, type DatePickerProps, type DatePickerValue, DoubleBarChart, type DoubleBarChartDataItem, DoubleLineChart, type DoubleLineChartDataItem, HashText, type HashTextProps, Header, type HeaderProps, Modal, type ModalProps, type NavItem, Navbar, type NavbarProps, SearchableSelect, type SearchableSelectProps, SingleBarChart, type SingleBarChartDataItem, SingleLineChart, type SingleLineChartDataItem, Tabs, TabsContent, TabsList, type TabsProps, TabsTrigger, ThemeProvider, TreeChart, type TreeChartDataItem, useTheme };

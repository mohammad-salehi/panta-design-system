import * as React$1 from 'react';
import React__default, { ReactNode } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

interface ButtonProps extends React__default.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'danger' | 'warning';
    size?: 'sm' | 'md' | 'lg';
}
declare const Button: React__default.ForwardRefExoticComponent<ButtonProps & React__default.RefAttributes<HTMLButtonElement>>;

type Theme = 'light' | 'dark';
interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}
declare const ThemeProvider: ({ children }: {
    children: React__default.ReactNode;
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
    icon?: React__default.ReactNode;
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
    brand?: React__default.ReactNode;
    className?: string;
    currentPath: string;
}
declare const Navbar: React__default.FC<NavbarProps>;

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
    title?: React__default.ReactNode;
    children: React__default.ReactNode;
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
declare function Modal({ open, onClose, title, children, className, closeOnBackdrop, closeOnEscape, showHeader, showCloseButton, maxWidthClass, portalTarget, zIndex, ariaLabel, }: ModalProps): React__default.ReactPortal;

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
    title?: React__default.ReactNode;
    description?: React__default.ReactNode;
    icon?: React__default.ReactNode;
    actions?: React__default.ReactNode;
    children?: React__default.ReactNode;
    footer?: React__default.ReactNode;
    className?: string;
    collapsible?: boolean;
    defaultCollapsed?: boolean;
    onToggle?: (collapsed: boolean) => void;
};
declare function Box({ dir, title, description, icon, actions, children, footer, className, collapsible, defaultCollapsed, onToggle, }: BoxProps): react_jsx_runtime.JSX.Element;

type SwitchOption = {
    label: React__default.ReactNode;
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
declare const HashText: React__default.FC<HashTextProps>;

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
declare const DoubleBarChart: React__default.FC<Props$1>;

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
declare const DoubleLineChart: React__default.FC<Props>;

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
declare const SingleBarChart: React__default.FC<SingleBarChartProps>;

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
declare const SingleLineChart: React__default.FC<SingleLineChartProps>;

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
declare const TreeChart: React__default.FC<TreeMapChartProps>;

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

type RowId = string;
type Column<T> = {
    header: React__default.ReactNode;
    className?: string;
    cell?: (row: T) => React__default.ReactNode;
    accessorKey?: keyof T;
    align?: "start" | "center" | "end";
    width?: string | number;
};
type ExpandableTableProps<T extends {
    id?: RowId;
    subRows?: T[];
}> = {
    data: T[];
    columns: Column<T>[];
    className?: string;
    pageSize?: number;
    getRowId?: (row: T, path: string) => RowId;
    getSubRows?: (row: T) => T[] | undefined;
    onRowClick?: (row: T) => void;
    defaultExpandedIds?: RowId[];
    renderProgress?: (value: number) => React__default.ReactNode;
    rowDetails?: (row: T) => React__default.ReactNode | React__default.ReactNode[];
    rowDetailsClassName?: string;
    toolbarSlot?: React__default.ReactNode;
    footerSlot?: React__default.ReactNode;
};
declare function ExpandableTable<T extends {
    id?: RowId;
    subRows?: T[];
}>(props: ExpandableTableProps<T>): react_jsx_runtime.JSX.Element;

type BadgeColor = "green" | "red" | "blue" | "yellow" | "purple";
type BadgeVariant = "soft" | "solid" | "outline";
type BadgeProps = React$1.HTMLAttributes<HTMLSpanElement> & {
    color?: BadgeColor;
    variant?: BadgeVariant;
};
declare function Badge({ color, variant, className, children, ...props }: BadgeProps): react_jsx_runtime.JSX.Element;

type LoaderMode = "normal" | "skeleton";
type LoaderProps = React$1.HTMLAttributes<HTMLDivElement> & {
    mode?: LoaderMode;
    text?: string;
    count?: number;
    skeletonHeight?: number;
    withAvatar?: boolean;
};
declare function Loader({ mode, text, count, skeletonHeight, withAvatar, className, ...props }: LoaderProps): react_jsx_runtime.JSX.Element;

type PageLoaderProps = React$1.HTMLAttributes<HTMLDivElement> & {
    /** کنترل نمایش */
    open?: boolean;
    /** متن داینامیک که از مصرف‌کننده گرفته می‌شود */
    text: string;
    /** بک‌دراپ */
    backdrop?: boolean;
    /** بلور */
    blur?: boolean;
    mode?: "loader" | "spinner";
};
declare function PageLoader({ open, text, backdrop, blur, className, mode, ...props }: PageLoaderProps): react_jsx_runtime.JSX.Element;

type NativeTypes = "text" | "email" | "password" | "number" | "tel" | "url" | "search";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    hint?: string;
    error?: string;
    success?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    enablePasswordToggle?: boolean;
    fullWidth?: boolean;
    type?: NativeTypes;
}
declare const Input: React$1.ForwardRefExoticComponent<InputProps & React$1.RefAttributes<HTMLInputElement>>;

type TablePaginationProps = {
    totalItems: number;
    pageSize: number;
    currentPage: number;
    onPageChange: (page: number) => void;
    className?: string;
    rtl?: boolean;
    compact?: boolean;
};
declare function Pagination({ totalItems, pageSize, currentPage, onPageChange, className, rtl, compact, }: TablePaginationProps): react_jsx_runtime.JSX.Element;

type ToastType = "success" | "danger" | "alert";
type ToastPosition = "top-left" | "top-right" | "top-center" | "bottom-left" | "bottom-right" | "bottom-center";
interface ToastOptions {
    type?: ToastType;
    duration?: number;
    position?: ToastPosition;
}

interface ToastContextType {
    toast: (message: string, options?: ToastOptions) => void;
}
declare function ToastProvider({ children }: {
    children: React__default.ReactNode;
}): react_jsx_runtime.JSX.Element;
declare function useToast(): ToastContextType;

type TooltipPlacement = "top" | "bottom" | "left" | "right";
interface TooltipProps {
    content: ReactNode;
    children: ReactNode;
    placement?: TooltipPlacement;
    className?: string;
    contentClassName?: string;
    offset?: number;
    disabled?: boolean;
}
declare function Tooltip({ content, children, placement, className, contentClassName, disabled, }: TooltipProps): react_jsx_runtime.JSX.Element;

interface StepperItem {
    title: string;
}
interface StepperProps {
    step: number;
    steps: StepperItem[];
    className?: string;
}
declare const Stepper: React__default.FC<StepperProps>;

export { Badge, type BadgeProps, Box, type BoxProps, Button, type ButtonProps, ButtonSelect, type ButtonSelectProps, CircleChart, type CircleChartProps, type Column, DatePicker, type DatePickerProps, type DatePickerValue, DoubleBarChart, type DoubleBarChartDataItem, DoubleLineChart, type DoubleLineChartDataItem, ExpandableTable, type ExpandableTableProps, HashText, type HashTextProps, Header, type HeaderProps, Input, type InputProps, Loader, type LoaderProps, Modal, type ModalProps, type NavItem, Navbar, type NavbarProps, PageLoader, Pagination, type RowId, SearchableSelect, type SearchableSelectProps, SingleBarChart, type SingleBarChartDataItem, SingleLineChart, type SingleLineChartDataItem, Stepper, type StepperProps, type TablePaginationProps, Tabs, TabsContent, TabsList, type TabsProps, TabsTrigger, ThemeProvider, type ToastOptions, type ToastPosition, ToastProvider, type ToastType, Tooltip, type TooltipProps, TreeChart, type TreeChartDataItem, useTheme, useToast };

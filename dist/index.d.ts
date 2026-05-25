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

export { Button, type ButtonProps, Header, type HeaderProps, ThemeProvider, useTheme };

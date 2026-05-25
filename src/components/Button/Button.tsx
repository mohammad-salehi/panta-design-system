'use client';
import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'warning';
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

const variantClasses = {
  primary: `
    bg-gradient-to-r from-blue-grad-start to-blue-grad-end
    dark:from-blue-grad-start dark:to-blue-grad-end
    text-white border-none
  `,
  danger: `
    bg-gradient-to-r from-red-grad-start to-red-grad-end
    dark:from-red-700 dark:to-red-900
    text-white border-none
  `,
  warning: `
    bg-gradient-to-r from-yellow-grad-start to-yellow-grad-end
    dark:from-yellow-700 dark:to-yellow-900
    text-slate-900 dark:text-white border-none
  `,
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...rest }, ref) => {
    // حذف w-full از اینجا
    const baseStyle = `
      inline-flex items-center justify-center
      py-2 px-3 text-sm font-medium rounded-xl
      transition-all duration-200
      focus:outline-none 
      shadow-md
      cursor-pointer
      hover:opacity-90
      disabled:opacity-50 disabled:cursor-not-allowed
      border-transparent
    `;
    const variantClass = variantClasses[variant];
    const sizeClass = sizeClasses[size];

    return (
      <button
        ref={ref}
        className={`${baseStyle} ${variantClass} ${sizeClass} ${className || ''}`}
        {...rest}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
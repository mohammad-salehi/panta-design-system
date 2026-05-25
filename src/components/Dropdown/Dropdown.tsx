'use client';

import React from 'react';
import './Dropdown.css';  // ایمپورت مستقیم CSS

export interface DropdownProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Dropdown = React.forwardRef<HTMLButtonElement, DropdownProps>(
  ({ variant = 'primary', size = 'md', className, children, ...rest }, ref) => {
    const variantClass = `pds-button--${variant}`;
    const sizeClass = `pds-button--${size}`;
    return (
      <button
        ref={ref}
        className={`pds-button ${variantClass} ${sizeClass} ${className || ''}`}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Dropdown.displayName = 'Button';
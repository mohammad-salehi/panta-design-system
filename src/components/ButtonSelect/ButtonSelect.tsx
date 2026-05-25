'use client';

import React from 'react';
import './ButtonSelect.css';  // ایمپورت مستقیم CSS

export interface ButtonSelectProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const ButtonSelect = React.forwardRef<HTMLButtonElement, ButtonSelectProps>(
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

ButtonSelect.displayName = 'Button';
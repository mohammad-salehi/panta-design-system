'use client';

import React from 'react';
import './Box.css';  // ایمپورت مستقیم CSS

export interface BoxProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Box = React.forwardRef<HTMLButtonElement, BoxProps>(
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

Box.displayName = 'Button';
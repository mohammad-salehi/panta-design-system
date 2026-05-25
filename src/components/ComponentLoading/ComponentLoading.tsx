'use client';

import React from 'react';
import './ComponentLoading.css';  // ایمپورت مستقیم CSS

export interface ComponentLoadingProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const ComponentLoading = React.forwardRef<HTMLButtonElement, ComponentLoadingProps>(
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

ComponentLoading.displayName = 'Button';
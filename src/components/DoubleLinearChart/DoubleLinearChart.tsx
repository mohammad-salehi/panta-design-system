'use client';

import React from 'react';
import './DoubleLinearChart.css';  // ایمپورت مستقیم CSS

export interface DoubleLinearChartProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const DoubleLinearChart = React.forwardRef<HTMLButtonElement, DoubleLinearChartProps>(
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

DoubleLinearChart.displayName = 'Button';
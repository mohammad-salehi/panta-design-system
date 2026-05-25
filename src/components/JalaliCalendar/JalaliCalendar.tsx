'use client';

import React from 'react';
import './JalaliCalendar.css';  // ایمپورت مستقیم CSS

export interface JalaliCalendarProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const JalaliCalendar = React.forwardRef<HTMLButtonElement, JalaliCalendarProps>(
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

JalaliCalendar.displayName = 'Button';
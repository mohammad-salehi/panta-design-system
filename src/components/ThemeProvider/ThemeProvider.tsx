'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import React from 'react';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextThemesProvider attribute="data-theme" defaultTheme="light" enableSystem>
      {children}
    </NextThemesProvider>
  );
};
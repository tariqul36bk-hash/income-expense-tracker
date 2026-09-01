'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { I18nextProvider } from 'react-i18next';
import { Toaster } from 'react-hot-toast';
import i18n from '@/config/i18n';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <I18nextProvider i18n={i18n}>
        {children}
        <Toaster position="top-right" />
      </I18nextProvider>
    </ThemeProvider>
  );
}

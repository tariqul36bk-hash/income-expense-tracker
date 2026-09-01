import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Providers } from '@/app/providers';
import '@/styles/globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-sans',
  preload: true,
});

export const metadata: Metadata = {
  title: 'Income & Expense Tracker',
  description: 'Track your income and expenses with ease',
  icons: {
    icon: '💰',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.variable}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

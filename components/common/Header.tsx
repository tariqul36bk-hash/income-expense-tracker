'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Button from '@/components/ui/Button';
import { Menu } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            💰 IET
          </Link>

          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/dashboard" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50">
                {t('dashboard.title')}
              </Link>
              <Link href="/income" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50">
                {t('income.title')}
              </Link>
              <Link href="/expenses" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50">
                {t('expense.title')}
              </Link>
              <Link href="/settings" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50">
                {t('settings.title')}
              </Link>
            </nav>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {isOpen && (
          <nav className="md:hidden mt-4 space-y-2">
            <Link href="/dashboard" className="block p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded">
              {t('dashboard.title')}
            </Link>
            <Link href="/income" className="block p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded">
              {t('income.title')}
            </Link>
            <Link href="/expenses" className="block p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded">
              {t('expense.title')}
            </Link>
            <Link href="/settings" className="block p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded">
              {t('settings.title')}
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}

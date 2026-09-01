'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { authService } from '@/lib/supabase/auth';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import { validateEmail } from '@/lib/utils';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Invalid email address');
      return;
    }

    setLoading(true);
    try {
      const result = await authService.forgotPassword(email);

      if (result.success) {
        setSent(true);
        toast.success('Reset link sent to your email!');
      } else {
        setError(result.error || 'Failed to send reset link');
        toast.error(result.error || 'Failed to send reset link');
      }
    } catch (err) {
      setError('An error occurred');
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">💰 IET</h1>
          <p className="text-slate-600 dark:text-slate-400">{t('auth.forgotPassword')}</p>
        </div>

        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                {t('auth.email')}
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
              />
              {error && <p className="text-danger-600 text-sm mt-1">{error}</p>}
            </div>

            <Button type="submit" variant="primary" className="w-full" isLoading={loading}>
              {t('auth.sendResetLink')}
            </Button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <p className="text-slate-600 dark:text-slate-400">Check your email for password reset instructions.</p>
            <Button variant="secondary" className="w-full" onClick={() => setSent(false)}>
              Send Again
            </Button>
          </div>
        )}

        <div className="mt-4 text-center">
          <Link href="/auth/login" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            {t('auth.backToLogin')}
          </Link>
        </div>
      </Card>
    </div>
  );
}

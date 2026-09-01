'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { authService } from '@/lib/supabase/auth';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import { validateEmail } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const result = await authService.login(formData);

      if (result.success) {
        toast.success('Login successful!');
        setTimeout(() => router.push('/dashboard'), 1000);
      } else {
        toast.error(result.error || 'Login failed');
      }
    } catch (error) {
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
          <p className="text-slate-600 dark:text-slate-400">{t('auth.login')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              {t('auth.email')}
            </label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
            />
            {errors.email && <p className="text-danger-600 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              {t('auth.password')}
            </label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
            {errors.password && <p className="text-danger-600 text-sm mt-1">{errors.password}</p>}
          </div>

          <div className="flex items-center justify-between">
            <Link href="/auth/forgot-password" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              {t('auth.forgotPassword')}
            </Link>
          </div>

          <Button type="submit" variant="primary" className="w-full" isLoading={loading}>
            {t('auth.login')}
          </Button>
        </form>

        <div className="mt-4 text-center text-slate-600 dark:text-slate-400">
          {t('auth.noAccount')}{' '}
          <Link href="/auth/signup" className="text-primary-600 hover:text-primary-700 font-medium">
            {t('auth.signupNow')}
          </Link>
        </div>
      </Card>
    </div>
  );
}

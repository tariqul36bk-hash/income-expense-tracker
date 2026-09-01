'use client';

import { useAuth } from '@/hooks/useAuth';
import { useSettings } from '@/hooks/useSettings';
import { useTranslation } from 'react-i18next';
import Card from '@/components/ui/Card';
import { formatCurrency } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const mockStats = {
  totalIncome: 5000,
  totalExpense: 2500,
  currentBalance: 2500,
  incomeByCategory: [
    { name: 'Salary', value: 4000 },
    { name: 'Freelance', value: 1000 },
  ],
  expenseByCategory: [
    { name: 'Food', value: 800 },
    { name: 'Transport', value: 500 },
    { name: 'Entertainment', value: 1200 },
  ],
  monthlyTrend: [
    { month: 'Jan', income: 4000, expense: 2400 },
    { month: 'Feb', income: 4500, expense: 2500 },
    { month: 'Mar', income: 5000, expense: 2500 },
  ],
};

const COLORS = ['#0ea5e9', '#3b82f6', '#06b6d4', '#0284c7', '#075985'];

export default function DashboardPage() {
  const { user } = useAuth();
  const { settings } = useSettings();
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50">{t('dashboard.welcome')}, {user?.full_name}!</h1>
        <p className="text-slate-600 dark:text-slate-400">{new Date().toLocaleDateString()}</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">{t('dashboard.totalIncome')}</h3>
          <p className="text-3xl font-bold text-success-600">{formatCurrency(mockStats.totalIncome, settings.currency)}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">{t('dashboard.totalExpense')}</h3>
          <p className="text-3xl font-bold text-danger-600">{formatCurrency(mockStats.totalExpense, settings.currency)}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">{t('dashboard.currentBalance')}</h3>
          <p className="text-3xl font-bold text-primary-600">{formatCurrency(mockStats.currentBalance, settings.currency)}</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">{t('dashboard.monthlyOverview')}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockStats.monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#22c55e" />
              <Bar dataKey="expense" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">{t('dashboard.incomeByCategory')}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mockStats.incomeByCategory}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {mockStats.incomeByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}

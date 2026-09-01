// Database Types
export type User = {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  currency: 'USD' | 'BDT' | 'EUR' | 'GBP' | 'INR';
  language: 'en' | 'bn';
  dark_mode: boolean;
  created_at: string;
  updated_at: string;
};

export type Category = {
  id: string;
  user_id: string;
  name: string;
  icon: string;
  color: string;
  type: 'income' | 'expense';
  created_at: string;
  updated_at: string;
};

export type Income = {
  id: string;
  user_id: string;
  category_id: string;
  amount: number;
  note: string | null;
  date: string;
  created_at: string;
  updated_at: string;
  category?: Category;
};

export type Expense = {
  id: string;
  user_id: string;
  category_id: string;
  amount: number;
  note: string | null;
  date: string;
  created_at: string;
  updated_at: string;
  category?: Category;
};

export type Transaction = Income | Expense;

// API Response Types
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

export type PaginatedResponse<T> = {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  pageSize: number;
};

// Form Types
export type LoginFormData = {
  email: string;
  password: string;
};

export type SignupFormData = {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
};

export type ForgotPasswordFormData = {
  email: string;
};

export type ResetPasswordFormData = {
  password: string;
  confirmPassword: string;
};

export type CreateIncomeFormData = {
  amount: number;
  category_id: string;
  date: string;
  note?: string;
};

export type CreateExpenseFormData = {
  amount: number;
  category_id: string;
  date: string;
  note?: string;
};

export type CreateCategoryFormData = {
  name: string;
  icon: string;
  color: string;
  type: 'income' | 'expense';
};

// Settings Types
export type UserSettings = {
  currency: 'USD' | 'BDT' | 'EUR' | 'GBP' | 'INR';
  language: 'en' | 'bn';
  dark_mode: boolean;
};

// Statistics Types
export type DashboardStats = {
  totalIncome: number;
  totalExpense: number;
  currentBalance: number;
  incomeByCategory: Array<{
    category: string;
    amount: number;
    percentage: number;
  }>;
  expenseByCategory: Array<{
    category: string;
    amount: number;
    percentage: number;
  }>;
  monthlyTrend: Array<{
    month: string;
    income: number;
    expense: number;
  }>;
};

export type MonthlyStats = {
  month: string;
  income: number;
  expense: number;
  balance: number;
};

// Filter Types
export type TransactionFilter = {
  startDate?: string;
  endDate?: string;
  categoryId?: string;
  type?: 'income' | 'expense';
  searchText?: string;
  sortBy?: 'date' | 'amount';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
};

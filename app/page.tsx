export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
          💰 Income & Expense Tracker
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">Manage your finances effortlessly</p>
        <div className="flex gap-4 justify-center">
          <a
            href="/auth/login"
            className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            Login
          </a>
          <a
            href="/auth/signup"
            className="px-6 py-3 bg-slate-200 text-slate-900 dark:bg-slate-700 dark:text-slate-50 rounded-lg font-medium hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}

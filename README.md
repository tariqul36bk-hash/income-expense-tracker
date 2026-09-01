# Income & Expense Tracker

A production-ready Income & Expense Tracker web application built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **Supabase**.

## 🚀 Features

- ✅ User authentication (sign up, login, password reset)
- ✅ Dashboard with financial overview
- ✅ Track income and expenses
- ✅ Categorize transactions
- ✅ Visual charts and statistics
- ✅ Dark mode support
- ✅ Multi-language support (English & Bengali)
- ✅ Responsive design
- ✅ Secure database with Row-Level Security
- ✅ Fast and optimized performance

## 📋 Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Supabase account and project

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd income-expense-tracker
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Update with your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Database Setup

Run the SQL migrations in your Supabase project:

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT auth.uid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  currency TEXT DEFAULT 'USD',
  language TEXT DEFAULT 'en',
  dark_mode BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  icon TEXT,
  color TEXT,
  type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Income table
CREATE TABLE income (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  amount DECIMAL(12, 2) NOT NULL,
  note TEXT,
  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Expenses table
CREATE TABLE expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  amount DECIMAL(12, 2) NOT NULL,
  note TEXT,
  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE income ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can read own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Categories are accessible by owner" ON categories FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Income is accessible by owner" ON income FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Expenses are accessible by owner" ON expenses FOR ALL USING (auth.uid() = user_id);
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
income-expense-tracker/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Protected dashboard routes
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── providers.tsx      # App providers
├── components/            # React components
│   ├── auth/              # Auth components
│   ├── dashboard/         # Dashboard components
│   ├── common/            # Common components
│   └── ui/                # UI components
├── lib/                   # Utility functions
│   ├── supabase/          # Supabase client & services
│   └── utils.ts           # Helper functions
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
├── config/                # Configuration files
├── i18n/                  # Internationalization
├── styles/                # Global styles
└── public/                # Static files
```

## 🔐 Security

- Environment variables are never exposed to the client (except `NEXT_PUBLIC_*` prefixed ones)
- Supabase Row-Level Security (RLS) policies enforce data access control
- Password validation ensures strong passwords
- Email validation for account creation

## 🌐 Internationalization

The app supports English and Bengali languages. Translations are stored in:
- `i18n/en.json` - English translations
- `i18n/bn.json` - Bengali translations

## 🎨 Customization

- Colors can be customized in `tailwind.config.ts`
- Add more languages by adding translation files in `i18n/` directory
- Modify default categories in `config/constants.ts`

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🚀 Deployment

### Deploy on Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Create a new project and connect your GitHub repository
4. Add environment variables in Vercel dashboard
5. Deploy!

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For support, please create an issue in the GitHub repository.

---

**Made with ❤️ by Tariqul**

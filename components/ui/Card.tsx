'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, elevated, ...props }, ref) => {
  const baseStyles = elevated
    ? 'bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800'
    : 'bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow';

  return <div ref={ref} className={cn(baseStyles, className)} {...props} />;
});

Card.displayName = 'Card';

export default Card;

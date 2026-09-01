'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        'w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg',
        'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50',
        'placeholder-slate-500 dark:placeholder-slate-400',
        'focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:border-transparent',
        'transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;

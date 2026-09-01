'use client';

export default function Loading() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="space-y-4">
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-8 bg-slate-200 dark:bg-slate-700 rounded-lg animate-shimmer" />
          ))}
        </div>
      </div>
    </div>
  );
}

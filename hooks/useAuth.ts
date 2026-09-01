'use client';

import { useEffect, useState } from 'react';
import { authService } from '@/lib/supabase/auth';
import { databaseService } from '@/lib/supabase/database';
import type { User } from '@/types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { success, user: authUser } = await authService.getCurrentUser();
      if (success && authUser) {
        const { success: dbSuccess, data: userData } = await databaseService.getUser(authUser.id);
        if (dbSuccess) {
          setUser(userData);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Auth check failed');
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, checkAuth };
}

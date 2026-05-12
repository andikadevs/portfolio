import { createClient } from '@supabase/supabase-js';
import 'server-only';

/**
 * Supabase client for server-side operations.
 * Uses environment variables that should NOT be prefixed with NEXT_PUBLIC_
 * for maximum security, although it falls back to them if needed.
 */
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabaseServer = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});

// Re-export types for convenience
export type { Article, SiteAnalytics } from '@/types';

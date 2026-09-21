import { createClient } from '@supabase/supabase-js';

const supabaseUrl: string = 
  (import.meta.env.VITE_SUPABASE_URL as string) || 
  ((import.meta.env as any).NEXT_PUBLIC_SUPABASE_URL as string) || 
  'https://placeholder.supabase.co';

const supabaseAnonKey: string = 
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || 
  ((import.meta.env as any).NEXT_PUBLIC_SUPABASE_ANON_KEY as string) || 
  'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  },
});

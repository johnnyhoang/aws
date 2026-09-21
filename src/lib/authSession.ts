import { supabase } from './supabaseClient';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
}

/**
 * Get current authenticated user from Supabase session
 */
export async function getCurrentAuthUser(): Promise<AuthUser | null> {
  if (typeof window === 'undefined') return null;

  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user?.email) {
      const user = session.user;
      const email = user.email.toLowerCase().trim();
      const name = 
        user.user_metadata?.full_name || 
        user.user_metadata?.name || 
        email.split('@')[0];
      const avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture;

      localStorage.setItem('aws_session_email', email);

      return {
        id: user.id,
        email,
        name,
        avatarUrl,
      };
    }
  } catch (err) {
    console.warn('Supabase auth session lookup failed:', err);
  }

  return null;
}

/**
 * Sign in using Google OAuth via Supabase
 */
export async function signInWithGoogle(): Promise<{ error: Error | null }> {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });
    return { error };
  } catch (err: any) {
    return { error: err };
  }
}

/**
 * Sign out user
 */
export async function signOutUser(): Promise<void> {
  try {
    await supabase.auth.signOut();
  } catch (err) {
    console.warn('Sign out error:', err);
  } finally {
    localStorage.removeItem('aws_session_email');
  }
}

/**
 * Subscribe to Supabase auth changes
 */
export function subscribeToAuth(onUserChange: (user: AuthUser | null) => void): () => void {
  if (typeof window === 'undefined') return () => {};

  const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
    if (session?.user?.email) {
      const user = session.user;
      const email = user.email.toLowerCase().trim();
      const name = 
        user.user_metadata?.full_name || 
        user.user_metadata?.name || 
        email.split('@')[0];
      const avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture;

      localStorage.setItem('aws_session_email', email);

      onUserChange({
        id: user.id,
        email,
        name,
        avatarUrl,
      });
    } else if (event === 'SIGNED_OUT') {
      localStorage.removeItem('aws_session_email');
      onUserChange(null);
    }
  });

  return () => {
    subscription.unsubscribe();
  };
}

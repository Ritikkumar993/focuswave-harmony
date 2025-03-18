
import { createClient } from '@supabase/supabase-js';

// Use the values from the automatically generated client
const supabaseUrl = "https://oegheuxfmotihccxxszj.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9lZ2hldXhmbW90aWhjY3h4c3pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyMzI5ODYsImV4cCI6MjA1NzgwODk4Nn0.XPFZ-mtMggYK2lsynZ0errzJzyFG0R_g6DXTU1MAo5Q";

// We no longer need placeholder values since we have real values
export const isUsingPlaceholders = false;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Google sign in method
export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin + '/auth', // Redirect to the auth page instead of profile
    },
  });
  
  return { data, error };
};

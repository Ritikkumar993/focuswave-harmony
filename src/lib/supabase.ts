
import { createClient } from '@supabase/supabase-js';

// Default to placeholder values when environment variables are missing
// This allows the app to load without crashing in development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Check if we're using real environment variables or placeholders
export const isUsingPlaceholders = !import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY;

if (isUsingPlaceholders) {
  console.warn('Missing Supabase environment variables. Using placeholder values. Authentication will not work properly.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

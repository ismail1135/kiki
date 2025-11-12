import { createClient } from '@supabase/supabase-js';

console.log('URL:', process.env.EXPO_PUBLIC_SUPABASE_URL);
console.log('KEY:', process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY);

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL as string,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string
);


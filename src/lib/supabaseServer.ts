import { createClient, SupabaseClient } from '@supabase/supabase-js';

let cachedServerClient: SupabaseClient | null = null;

export function getSupabaseServerClient(): SupabaseClient | null {
  if (cachedServerClient) return cachedServerClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

  if (!url || !serviceKey) {
    return null;
  }

  try {
    cachedServerClient = createClient(url, serviceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
    return cachedServerClient;
  } catch (err) {
    console.error('[SupabaseServer] Failed to initialize service role client:', err);
    return null;
  }
}

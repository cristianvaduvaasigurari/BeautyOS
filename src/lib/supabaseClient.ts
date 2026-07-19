import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

// Issue warning on browser console if running in offline mockup mode
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  if (typeof window !== "undefined") {
    console.warn("BeautyOS Alert: Missing Supabase credentials. Operating system will run in offline-first caching mode.");
  }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

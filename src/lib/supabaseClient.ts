import { createClient, SupabaseClient } from "@supabase/supabase-js";

const getUrl = () => process.env.NEXT_PUBLIC_SUPABASE_URL;
const getKey = () => process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const isValidUrl = (url?: string): boolean => {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
};

let cachedClient: SupabaseClient | null = null;

const getClient = (): SupabaseClient | null => {
  // If we are on server-side Next.js build step, avoid instantiating to prevent prerender crash
  if (typeof window === "undefined" && !getUrl()) {
    return null;
  }

  if (cachedClient) return cachedClient;

  const url = getUrl();
  const key = getKey();

  if (!url || !key || !isValidUrl(url)) {
    return null;
  }

  try {
    cachedClient = createClient(url, key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
    return cachedClient;
  } catch (e) {
    if (typeof window !== "undefined") {
      console.error("BeautyOS: Error instantiating Supabase client", e);
    }
    return null;
  }
};

// Safe fallback mockup mock matching the Supabase API signature to prevent build/runtime crashes
const createMockSupabase = () => {
  const mockAuth = {
    signUp: async () => ({
      data: { user: null, session: null },
      error: { message: "Supabase authentication client not configured" },
    }),
    signInWithPassword: async () => ({
      data: { user: null, session: null },
      error: { message: "Supabase authentication client not configured" },
    }),
    signOut: async () => ({ error: null }),
    getSession: async () => ({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({
      data: {
        subscription: {
          unsubscribe: () => {},
        },
      },
    }),
  };

  const mockFrom = () => {
    const chain = {
      insert: async () => ({ data: null, error: null }),
      update: () => chain,
      delete: () => chain,
      eq: async () => ({ data: null, error: null }),
    };
    return chain;
  };

  return {
    auth: mockAuth,
    from: mockFrom,
    storage: {
      from: () => ({
        upload: async () => ({ data: null, error: null }),
        createSignedUrl: async () => ({ data: null, error: null }),
      }),
    },
  } as unknown as SupabaseClient;
};

// Export proxy that delegates calls to client if ready, or mock fallback otherwise
export const supabase = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    const client = getClient() || createMockSupabase();
    const val = Reflect.get(client, prop);
    return typeof val === "function" ? val.bind(client) : val;
  },
});

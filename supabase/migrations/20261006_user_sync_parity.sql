-- AiX Health — User Cross-Device Synchronization Schema
-- File: supabase/migrations/20261006_user_sync_parity.sql

-- Add preferences and onboarding details to users_profile for seamless desktop <-> mobile syncing
ALTER TABLE public.users_profile 
    ADD COLUMN IF NOT EXISTS skin_type VARCHAR(64),
    ADD COLUMN IF NOT EXISTS sensitivity VARCHAR(64),
    ADD COLUMN IF NOT EXISTS concerns TEXT[],
    ADD COLUMN IF NOT EXISTS goals TEXT[],
    ADD COLUMN IF NOT EXISTS preferences JSONB DEFAULT '{}'::jsonb;

-- Create user_cabinet table for product sync if not present
CREATE TABLE IF NOT EXISTS public.user_cabinet (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    product_id VARCHAR(128) NOT NULL,
    opened_at DATE,
    expires_at DATE,
    status VARCHAR(32) DEFAULT 'Active',
    rating INT DEFAULT 5,
    routine_placement TEXT[],
    fit_score INT DEFAULT 85,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_cabinet_user_id ON public.user_cabinet(user_id);
ALTER TABLE public.user_cabinet ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'user_cabinet' AND policyname = 'Users access own cabinet'
    ) THEN
        CREATE POLICY "Users access own cabinet" ON public.user_cabinet FOR ALL USING (auth.uid() = user_id);
    END IF;
END $$;

-- AiX Health Enterprise Supabase Migration Schema
-- File: supabase/migrations/20260805_healthos_schema.sql

CREATE TABLE IF NOT EXISTS public.users_profile (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE,
    gender VARCHAR(32),
    age INT,
    height_cm NUMERIC(5,2),
    weight_kg NUMERIC(5,2),
    activity_level VARCHAR(64),
    primary_goal VARCHAR(128),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.health_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    date DATE NOT NULL,
    weight_kg NUMERIC(5,2),
    sleep_hours NUMERIC(4,2),
    hydration_ml INT,
    calories_consumed INT,
    protein_grams INT,
    mood_score INT,
    energy_score INT,
    stress_score INT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.daily_checkins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    date DATE NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.protocol_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    protocol_id VARCHAR(128) NOT NULL,
    day_number INT DEFAULT 1,
    completion_percentage NUMERIC(5,2) DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(128) NOT NULL,
    ingredients TEXT[],
    benefits TEXT[],
    science_score INT DEFAULT 95,
    goal_tags TEXT[],
    dosage VARCHAR(128),
    timing VARCHAR(128),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.ai_conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    messages JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE,
    stripe_customer_id VARCHAR(255),
    stripe_subscription_id VARCHAR(255),
    plan_tier VARCHAR(64) NOT NULL,
    status VARCHAR(64) NOT NULL,
    current_period_end TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    stripe_payment_id VARCHAR(255),
    amount INT NOT NULL,
    currency VARCHAR(10) DEFAULT 'eur',
    status VARCHAR(64) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(128) NOT NULL,
    last_name VARCHAR(128) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(64),
    goal VARCHAR(128),
    message TEXT,
    source VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_users_profile_user_id ON public.users_profile(user_id);
CREATE INDEX IF NOT EXISTS idx_health_metrics_user_id_date ON public.health_metrics(user_id, date);
CREATE INDEX IF NOT EXISTS idx_daily_checkins_user_id_date ON public.daily_checkins(user_id, date);
CREATE INDEX IF NOT EXISTS idx_protocol_progress_user_id ON public.protocol_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_conversations_user_id ON public.ai_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON public.payments(user_id);

-- ROW LEVEL SECURITY
ALTER TABLE public.users_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.protocol_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users access own profile" ON public.users_profile FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users access own metrics" ON public.health_metrics FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users access own checkins" ON public.daily_checkins FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users access own protocol progress" ON public.protocol_progress FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users access own AI conversations" ON public.ai_conversations FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users access own subscription" ON public.subscriptions FOR ALL USING (auth.uid() = user_id);

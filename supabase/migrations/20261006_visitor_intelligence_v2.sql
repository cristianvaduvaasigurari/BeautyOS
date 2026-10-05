-- AiX Health — Visitor Intelligence v2 Schema Migration
-- File: supabase/migrations/20261006_visitor_intelligence_v2.sql

-- 1. TABLE: visitors
CREATE TABLE IF NOT EXISTS public.visitors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    visitor_id UUID UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    first_source TEXT,
    first_medium TEXT,
    first_campaign TEXT,
    first_referrer TEXT,
    first_landing_path TEXT,

    last_source TEXT,
    last_medium TEXT,
    last_campaign TEXT,
    last_referrer TEXT,
    last_landing_path TEXT,

    first_country TEXT,
    first_region TEXT,
    first_city TEXT,
    last_country TEXT,
    last_region TEXT,
    last_city TEXT,

    first_device_type TEXT,
    last_device_type TEXT,
    first_browser TEXT,
    last_browser TEXT,
    first_os TEXT,
    last_os TEXT,

    session_count INTEGER DEFAULT 0,
    total_page_views INTEGER DEFAULT 0,
    total_events INTEGER DEFAULT 0,

    is_returning BOOLEAN DEFAULT FALSE
);

-- 2. TABLE: sessions
CREATE TABLE IF NOT EXISTS public.sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID UNIQUE NOT NULL,
    visitor_id UUID NOT NULL REFERENCES public.visitors(visitor_id) ON DELETE CASCADE,

    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_activity_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ended_at TIMESTAMPTZ,

    landing_path TEXT,
    exit_path TEXT,

    referrer TEXT,
    source TEXT,
    medium TEXT,
    campaign TEXT,
    term TEXT,
    content TEXT,

    country TEXT,
    region TEXT,
    city TEXT,
    timezone TEXT,

    device_type TEXT,
    browser TEXT,
    browser_version TEXT,
    os TEXT,
    os_version TEXT,

    language TEXT,
    viewport_width INTEGER,
    viewport_height INTEGER,

    page_views INTEGER DEFAULT 0,
    events INTEGER DEFAULT 0,
    cta_clicks INTEGER DEFAULT 0,
    outbound_clicks INTEGER DEFAULT 0,
    form_starts INTEGER DEFAULT 0,
    form_submissions INTEGER DEFAULT 0,

    engagement_seconds INTEGER DEFAULT 0,
    max_scroll_depth INTEGER DEFAULT 0
);

-- 3. TABLE: page_views
CREATE TABLE IF NOT EXISTS public.page_views (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    visitor_id UUID NOT NULL,
    session_id UUID NOT NULL,

    path TEXT NOT NULL,
    title TEXT,

    entered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    exited_at TIMESTAMPTZ,
    duration_seconds INTEGER,

    scroll_depth INTEGER DEFAULT 0,

    referrer TEXT,
    source TEXT,
    medium TEXT,
    campaign TEXT
);

-- 4. TABLE: events
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    visitor_id UUID NOT NULL,
    session_id UUID NOT NULL,

    event_name TEXT NOT NULL,
    event_category TEXT,

    path TEXT,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    metadata JSONB
);

-- 5. TABLE: visitor_interests
CREATE TABLE IF NOT EXISTS public.visitor_interests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    visitor_id UUID NOT NULL,

    interest TEXT NOT NULL,
    score INTEGER NOT NULL DEFAULT 0,

    first_detected_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_detected_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    evidence_count INTEGER DEFAULT 0,
    UNIQUE(visitor_id, interest)
);

-- 6. TABLE: conversions
CREATE TABLE IF NOT EXISTS public.conversions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    visitor_id UUID NOT NULL,
    session_id UUID,

    conversion_type TEXT NOT NULL,
    conversion_value TEXT,

    path TEXT,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    source TEXT,
    medium TEXT,
    campaign TEXT
);

-- 7. TABLE: security_events
CREATE TABLE IF NOT EXISTS public.security_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    visitor_id UUID,
    session_id UUID,

    event_type TEXT NOT NULL,
    severity TEXT NOT NULL,

    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    path TEXT,
    ip_hash TEXT,
    user_agent TEXT,

    metadata JSONB
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_visitors_visitor_id ON public.visitors(visitor_id);
CREATE INDEX IF NOT EXISTS idx_visitors_last_seen ON public.visitors(last_seen_at);
CREATE INDEX IF NOT EXISTS idx_visitors_source ON public.visitors(first_source, last_source);

CREATE INDEX IF NOT EXISTS idx_sessions_session_id ON public.sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_sessions_visitor_id ON public.sessions(visitor_id);
CREATE INDEX IF NOT EXISTS idx_sessions_started_at ON public.sessions(started_at);
CREATE INDEX IF NOT EXISTS idx_sessions_source_medium ON public.sessions(source, medium, campaign);
CREATE INDEX IF NOT EXISTS idx_sessions_geo ON public.sessions(country, city);

CREATE INDEX IF NOT EXISTS idx_page_views_session ON public.page_views(session_id);
CREATE INDEX IF NOT EXISTS idx_page_views_visitor ON public.page_views(visitor_id);
CREATE INDEX IF NOT EXISTS idx_page_views_path ON public.page_views(path);
CREATE INDEX IF NOT EXISTS idx_page_views_entered ON public.page_views(entered_at);

CREATE INDEX IF NOT EXISTS idx_events_session ON public.events(session_id);
CREATE INDEX IF NOT EXISTS idx_events_visitor ON public.events(visitor_id);
CREATE INDEX IF NOT EXISTS idx_events_name ON public.events(event_name);
CREATE INDEX IF NOT EXISTS idx_events_timestamp ON public.events(timestamp);

CREATE INDEX IF NOT EXISTS idx_visitor_interests_visitor ON public.visitor_interests(visitor_id);
CREATE INDEX IF NOT EXISTS idx_conversions_visitor ON public.conversions(visitor_id);
CREATE INDEX IF NOT EXISTS idx_conversions_type ON public.conversions(conversion_type);
CREATE INDEX IF NOT EXISTS idx_security_events_type_time ON public.security_events(event_type, timestamp);

-- ROW LEVEL SECURITY
ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visitor_interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.security_events ENABLE ROW LEVEL SECURITY;

-- POLICIES: Full access to service_role, public/anonymous direct access DENIED
CREATE POLICY "Service role access on visitors" ON public.visitors FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role access on sessions" ON public.sessions FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role access on page_views" ON public.page_views FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role access on events" ON public.events FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role access on visitor_interests" ON public.visitor_interests FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role access on conversions" ON public.conversions FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role access on security_events" ON public.security_events FOR ALL USING (auth.role() = 'service_role');

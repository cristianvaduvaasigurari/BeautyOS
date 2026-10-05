import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getSupabaseServerClient } from '@/lib/supabaseServer';
import {
  VisitorEventName,
  ContentInterest,
  ConversionType,
} from '@/lib/analytics/visitorTypes';
import { normalizeTrafficSource, parseDeviceFromUserAgent } from '@/lib/analytics/attribution';
import { categorizePathInterest, calculateEventIntentPoints, getIntentLevel } from '@/lib/analytics/intelligenceEngine';
import {
  buildNewVisitorMessage,
  buildReturningVisitorMessage,
  buildHighIntentMessage,
  buildConversionMessage,
  buildSecurityEventMessage,
  sendRawTelegramHtml,
} from '@/lib/telegram/visitorIntelligenceFormatter';

// In-memory rate limiting & deduplication cache (bounded at 5,000 entries max)
interface RateLimitRecord {
  count: number;
  expiresAt: number;
}
const ipRateLimits = new Map<string, RateLimitRecord>();

// Visitor known state cache to track returning visitors in memory
const knownVisitors = new Map<string, number>();

// Session alert state cache (to prevent duplicate Telegram notifications for same session)
interface SessionAlertState {
  newVisitorSent: boolean;
  returningVisitorSent: boolean;
  highIntentSent: boolean;
  score: number;
  actions: string[];
  pageViewsCount: number;
  journey: string[];
  interests: Record<ContentInterest, number>;
  createdAt: number;
}
const sessionAlerts = new Map<string, SessionAlertState>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = ipRateLimits.get(ip);
  if (!record || now > record.expiresAt) {
    ipRateLimits.set(ip, { count: 1, expiresAt: now + 60000 });
    // Garbage collect if map grows too large
    if (ipRateLimits.size > 5000) {
      for (const [k, v] of ipRateLimits.entries()) {
        if (now > v.expiresAt) ipRateLimits.delete(k);
      }
    }
    return false;
  }
  if (record.count >= 60) {
    return true; // Limit: 60 events per IP per minute
  }
  record.count += 1;
  return false;
}

function getOrCreateSessionState(sessionId: string): SessionAlertState {
  const now = Date.now();
  let state = sessionAlerts.get(sessionId);
  if (!state) {
    state = {
      newVisitorSent: false,
      returningVisitorSent: false,
      highIntentSent: false,
      score: 0,
      actions: [],
      pageViewsCount: 0,
      journey: [],
      interests: {
        AI_EDUCATION: 0,
        PROTOCOLS: 0,
        SUPPLEMENTS: 0,
        NUTRITION: 0,
        FITNESS: 0,
        LONGEVITY: 0,
        SKIN_HEALTH: 0,
        HAIR_SCALP: 0,
      },
      createdAt: now,
    };
    sessionAlerts.set(sessionId, state);
    if (sessionAlerts.size > 5000) {
      for (const [k, v] of sessionAlerts.entries()) {
        if (now - v.createdAt > 3600000) sessionAlerts.delete(k); // 1 hour TTL
      }
    }
  }
  return state;
}

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const ALLOWED_EVENTS: Set<VisitorEventName> = new Set([
  'PAGE_VIEW',
  'PAGE_EXIT',
  'SCROLL',
  'CTA_CLICK',
  'OUTBOUND_CLICK',
  'SEARCH',
  'SECTION_VIEW',
  'AI_COACH_OPENED',
  'PROTOCOL_VIEWED',
  'SUPPLEMENT_VIEWED',
  'NUTRITION_VIEWED',
  'FITNESS_VIEWED',
  'ONBOARDING_STARTED',
  'ONBOARDING_STEP_COMPLETED',
  'ONBOARDING_COMPLETED',
  'FORM_STARTED',
  'FORM_SUBMITTED',
  'ACCOUNT_CREATED',
  'CONTACT_REQUEST',
  'CTA_CONVERSION',
  'RATE_LIMIT_TRIGGERED',
  'SUSPICIOUS_REQUEST',
  'AUTH_FAILURE',
  'INVALID_METHOD',
  'INVALID_JSON',
]);

const sanitizeString = (val: unknown, maxLen = 255): string => {
  if (typeof val !== 'string') return '';
  return val.trim().slice(0, maxLen);
};

function hashIp(rawIp: string): string {
  try {
    return crypto.createHash('sha256').update(rawIp + 'aix_salt_v2').digest('hex').slice(0, 16);
  } catch {
    return 'anon_ip';
  }
}

export async function POST(request: Request) {
  try {
    const rawIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';
    const isOverLimit = checkRateLimit(rawIp);

    if (isOverLimit) {
      return NextResponse.json(
        { error: 'Too many requests. Throttled.' },
        { status: 429 }
      );
    }

    let rawBody: Record<string, unknown>;
    try {
      rawBody = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }

    if (!rawBody || typeof rawBody !== 'object') {
      return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
    }

    const visitorId = sanitizeString(rawBody.visitor_id, 36);
    const sessionId = sanitizeString(rawBody.session_id, 36);
    const eventName = sanitizeString(rawBody.event_name, 50) as VisitorEventName;
    const path = sanitizeString(rawBody.path, 255) || '/';
    const title = rawBody.title ? sanitizeString(rawBody.title, 200) : undefined;
    const referrer = rawBody.referrer ? sanitizeString(rawBody.referrer, 500) : undefined;
    const utmSource = rawBody.utm_source ? sanitizeString(rawBody.utm_source, 100) : undefined;
    const utmMedium = rawBody.utm_medium ? sanitizeString(rawBody.utm_medium, 100) : undefined;
    const utmCampaign = rawBody.utm_campaign ? sanitizeString(rawBody.utm_campaign, 100) : undefined;
    const utmTerm = rawBody.utm_term ? sanitizeString(rawBody.utm_term, 100) : undefined;
    const utmContent = rawBody.utm_content ? sanitizeString(rawBody.utm_content, 100) : undefined;

    // Validate UUIDs
    if (!visitorId || !UUID_REGEX.test(visitorId)) {
      return NextResponse.json({ error: 'Invalid visitor_id UUID' }, { status: 400 });
    }
    if (!sessionId || !UUID_REGEX.test(sessionId)) {
      return NextResponse.json({ error: 'Invalid session_id UUID' }, { status: 400 });
    }

    // Validate event name
    if (!eventName || !ALLOWED_EVENTS.has(eventName)) {
      return NextResponse.json({ error: 'Unsupported or invalid event_name' }, { status: 400 });
    }

    // Geo resolution from trusted headers
    const country = request.headers.get('x-vercel-ip-country') || request.headers.get('cf-ipcountry') || 'Unknown Country';
    const region = request.headers.get('x-vercel-ip-country-region') || undefined;
    const city = request.headers.get('x-vercel-ip-city') || undefined;
    const timezone = request.headers.get('x-vercel-ip-timezone') || 'UTC';

    // Device parsing
    const userAgent = request.headers.get('user-agent') || '';
    const parsedDevice = parseDeviceFromUserAgent(userAgent);
    const clientDevice = rawBody.device && typeof rawBody.device === 'object'
      ? {
          deviceType: (rawBody.device as Record<string, unknown>).deviceType === 'Mobile' ? ('Mobile' as const) : (rawBody.device as Record<string, unknown>).deviceType === 'Tablet' ? ('Tablet' as const) : ('Desktop' as const),
          browser: sanitizeString((rawBody.device as Record<string, unknown>).browser, 50) || parsedDevice.browser,
          browserVersion: sanitizeString((rawBody.device as Record<string, unknown>).browserVersion, 20) || parsedDevice.browserVersion,
          os: sanitizeString((rawBody.device as Record<string, unknown>).os, 50) || parsedDevice.os,
          osVersion: sanitizeString((rawBody.device as Record<string, unknown>).osVersion, 20),
          language: sanitizeString((rawBody.device as Record<string, unknown>).language, 20) || parsedDevice.language,
          viewportWidth: typeof (rawBody.device as Record<string, unknown>).viewportWidth === 'number' ? (rawBody.device as Record<string, unknown>).viewportWidth as number : parsedDevice.viewportWidth,
          viewportHeight: typeof (rawBody.device as Record<string, unknown>).viewportHeight === 'number' ? (rawBody.device as Record<string, unknown>).viewportHeight as number : parsedDevice.viewportHeight,
          timezone: sanitizeString((rawBody.device as Record<string, unknown>).timezone, 50) || timezone,
        }
      : { ...parsedDevice, timezone };

    // Attribution
    const attribution = normalizeTrafficSource(referrer, utmSource, utmMedium, utmCampaign, utmTerm, utmContent);

    const scrollDepth = typeof rawBody.scroll_depth === 'number' ? Math.min(100, Math.max(0, Math.round(rawBody.scroll_depth))) : undefined;
    const durationSeconds = typeof rawBody.duration_seconds === 'number' ? Math.max(0, Math.round(rawBody.duration_seconds)) : undefined;

    // Metadata sanitization
    let metadata: Record<string, unknown> | undefined = undefined;
    if (rawBody.metadata && typeof rawBody.metadata === 'object') {
      metadata = Object.fromEntries(
        Object.entries(rawBody.metadata as Record<string, unknown>)
          .filter(([k]) => k !== '__proto__' && k !== 'constructor' && k !== 'prototype')
          .slice(0, 20)
          .map(([k, v]) => [
            sanitizeString(k, 50),
            typeof v === 'object' ? JSON.stringify(v).slice(0, 500) : sanitizeString(String(v), 500),
          ])
      );
    }

    // Returning visitor tracking
    const previousVisitorSessionCount = knownVisitors.get(visitorId) || 0;
    const isReturningVisitor = previousVisitorSessionCount > 0;
    if (previousVisitorSessionCount === 0) {
      knownVisitors.set(visitorId, 1);
    }

    // Session state for alert triggers
    const sessionState = getOrCreateSessionState(sessionId);
    if (!sessionState.journey.includes(path)) {
      sessionState.journey.push(path);
      if (sessionState.journey.length > 8) {
        sessionState.journey = sessionState.journey.slice(-8);
      }
    }

    if (eventName === 'PAGE_VIEW') {
      sessionState.pageViewsCount += 1;
    }

    // Content interests classification
    const matchedInterests = categorizePathInterest(path);
    for (const interest of matchedInterests) {
      sessionState.interests[interest] = (sessionState.interests[interest] || 0) + 1;
    }

    // Intent scoring calculation
    const points = calculateEventIntentPoints(eventName, path, scrollDepth, isReturningVisitor);
    sessionState.score += points;
    const intentLevel = getIntentLevel(sessionState.score);

    // Track human-readable action description for alerts
    if (eventName === 'AI_COACH_OPENED') sessionState.actions.push('AI Coach opened');
    else if (eventName === 'PROTOCOL_VIEWED') sessionState.actions.push('Protocol viewed');
    else if (eventName === 'SUPPLEMENT_VIEWED') sessionState.actions.push('Supplement viewed');
    else if (eventName === 'NUTRITION_VIEWED') sessionState.actions.push('Nutrition viewed');
    else if (eventName === 'FITNESS_VIEWED') sessionState.actions.push('Fitness viewed');
    else if (eventName === 'CTA_CLICK') sessionState.actions.push(`CTA clicked (${metadata?.cta_label || 'Action'})`);
    else if (eventName === 'ONBOARDING_STARTED') sessionState.actions.push('Onboarding started');
    else if (eventName === 'ONBOARDING_COMPLETED') sessionState.actions.push('Onboarding completed');

    // Async DB update via Supabase server client
    const supabase = getSupabaseServerClient();
    if (supabase) {
      try {
        const nowIso = new Date().toISOString();
        
        // 1. Visitors Upsert
        await supabase.from('visitors').upsert(
          {
            visitor_id: visitorId,
            last_seen_at: nowIso,
            last_source: attribution.source,
            last_medium: attribution.medium,
            last_campaign: attribution.campaign,
            last_referrer: attribution.referrer,
            last_landing_path: path,
            last_country: country,
            last_region: region,
            last_city: city,
            last_device_type: clientDevice.deviceType,
            last_browser: clientDevice.browser,
            last_os: clientDevice.os,
            is_returning: isReturningVisitor,
          },
          { onConflict: 'visitor_id' }
        );

        // 2. Sessions Upsert
        await supabase.from('sessions').upsert(
          {
            session_id: sessionId,
            visitor_id: visitorId,
            last_activity_at: nowIso,
            landing_path: sessionState.journey[0] || path,
            exit_path: path,
            referrer: attribution.referrer,
            source: attribution.source,
            medium: attribution.medium,
            campaign: attribution.campaign,
            term: attribution.term,
            content: attribution.content,
            country,
            region,
            city,
            timezone: clientDevice.timezone,
            device_type: clientDevice.deviceType,
            browser: clientDevice.browser,
            browser_version: clientDevice.browserVersion,
            os: clientDevice.os,
            language: clientDevice.language,
            viewport_width: clientDevice.viewportWidth,
            viewport_height: clientDevice.viewportHeight,
            max_scroll_depth: scrollDepth || 0,
            engagement_seconds: durationSeconds || Math.max(10, sessionState.pageViewsCount * 45),
          },
          { onConflict: 'session_id' }
        );

        // 3. Page Views
        if (eventName === 'PAGE_VIEW') {
          await supabase.from('page_views').insert({
            visitor_id: visitorId,
            session_id: sessionId,
            path,
            title,
            entered_at: nowIso,
            scroll_depth: scrollDepth || 0,
            duration_seconds: durationSeconds,
            referrer: attribution.referrer,
            source: attribution.source,
            medium: attribution.medium,
            campaign: attribution.campaign,
          });
        }

        // 4. Events
        await supabase.from('events').insert({
          visitor_id: visitorId,
          session_id: sessionId,
          event_name: eventName,
          event_category: matchedInterests[0] || 'GENERAL',
          path,
          timestamp: nowIso,
          metadata: metadata || {},
        });

        // 5. Conversions
        if (
          eventName === 'FORM_SUBMITTED' ||
          eventName === 'ONBOARDING_COMPLETED' ||
          eventName === 'ACCOUNT_CREATED' ||
          eventName === 'CONTACT_REQUEST' ||
          eventName === 'CTA_CONVERSION'
        ) {
          const conversionTypeVal = (rawBody.conversion_type as ConversionType) || (eventName as ConversionType);
          await supabase.from('conversions').insert({
            visitor_id: visitorId,
            session_id: sessionId,
            conversion_type: conversionTypeVal,
            conversion_value: rawBody.conversion_value ? String(rawBody.conversion_value) : undefined,
            path,
            timestamp: nowIso,
            source: attribution.source,
            medium: attribution.medium,
            campaign: attribution.campaign,
          });
        }

        // 6. Visitor Interests
        for (const interest of matchedInterests) {
          await supabase.from('visitor_interests').upsert(
            {
              visitor_id: visitorId,
              interest,
              score: sessionState.interests[interest] * 10,
              last_detected_at: nowIso,
            },
            { onConflict: 'visitor_id,interest' }
          );
        }
      } catch (dbErr) {
        console.error('[Visitor Intelligence DB] Non-blocking error:', dbErr);
      }
    }

    // Telegram Notification Milestone Triggers
    const timestampFormatted = new Date().toLocaleString('en-GB', {
      timeZone: 'Europe/Bucharest',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }) + ' EEST';

    // 1. RETURNING_VISITOR (if returning on initial page view of session)
    if (isReturningVisitor && !sessionState.returningVisitorSent && eventName === 'PAGE_VIEW' && sessionState.pageViewsCount === 1) {
      sessionState.returningVisitorSent = true;
      const topInterests = Object.entries(sessionState.interests)
        .filter(([, v]) => v > 0)
        .map(([k]) => k.replace('_', ' '));

      const msg = buildReturningVisitorMessage({
        visitorId,
        sessionCount: previousVisitorSessionCount + 1,
        city,
        country,
        device: clientDevice,
        source: attribution.source,
        landingPath: path,
        pageViewsCount: sessionState.pageViewsCount,
        engagementSeconds: Math.max(15, sessionState.pageViewsCount * 45),
        actions: sessionState.actions.slice(-3),
        interests: topInterests.length > 0 ? topInterests : ['Health & Protocols'],
        intentShift: 'HIGHER THAN PREVIOUS SESSION',
      });
      await sendRawTelegramHtml(msg);
    }
    // 2. NEW_VISITOR (only if new visitor on initial page view)
    else if (!isReturningVisitor && !sessionState.newVisitorSent && eventName === 'PAGE_VIEW' && sessionState.pageViewsCount === 1) {
      sessionState.newVisitorSent = true;
      const msg = buildNewVisitorMessage({
        visitorId,
        sessionId,
        timestamp: timestampFormatted,
        country,
        region,
        city,
        timezone,
        device: clientDevice,
        attribution,
        landingPath: path,
        currentPath: path,
      });
      await sendRawTelegramHtml(msg);
    }

    // 3. HIGH_INTENT (triggered once when score reaches >= 50 or >= 75)
    if (!sessionState.highIntentSent && sessionState.score >= 50) {
      sessionState.highIntentSent = true;
      const totalInterests = Object.values(sessionState.interests).reduce((a, b) => a + b, 0) || 1;
      const interestPercentages: Record<string, number> = {};
      for (const [k, v] of Object.entries(sessionState.interests)) {
        if (v > 0) {
          interestPercentages[k.replace('_', ' ')] = Math.round((v / totalInterests) * 100);
        }
      }

      const msg = buildHighIntentMessage({
        visitorId,
        sessionId,
        city,
        country,
        device: clientDevice,
        source: `${attribution.source} ${attribution.medium}`,
        isReturning: isReturningVisitor,
        pageViewsCount: sessionState.pageViewsCount,
        engagementSeconds: Math.max(15, sessionState.pageViewsCount * 45),
        actions: sessionState.actions.slice(-4),
        interestPercentages,
        intentScore: Math.min(100, sessionState.score),
        intentLevel,
        reason: 'Multiple high-engagement educational actions.',
      });
      await sendRawTelegramHtml(msg);
    }

    // 4. CONVERSION
    if (
      eventName === 'FORM_SUBMITTED' ||
      eventName === 'ONBOARDING_COMPLETED' ||
      eventName === 'CONTACT_REQUEST'
    ) {
      const conversionTypeVal = (rawBody.conversion_type as ConversionType) || (eventName as ConversionType);
      const msg = buildConversionMessage({
        visitorId,
        sessionId,
        conversionType: conversionTypeVal,
        source: `${attribution.source} ${attribution.medium}`,
        landingPath: sessionState.journey[0] || path,
        journey: sessionState.journey,
        engagementSeconds: Math.max(30, sessionState.pageViewsCount * 50),
        pageViewsCount: sessionState.pageViewsCount,
        intentLevel: 'VERY_HIGH',
      });
      await sendRawTelegramHtml(msg);
    }

    // 5. SECURITY_EVENT
    if (eventName === 'RATE_LIMIT_TRIGGERED' || eventName === 'SUSPICIOUS_REQUEST' || eventName === 'AUTH_FAILURE') {
      const msg = buildSecurityEventMessage({
        severity: 'MEDIUM',
        eventType: eventName,
        endpoint: path,
        visitorId,
        ipHash: hashIp(rawIp),
        country,
        timestamp: timestampFormatted,
        action: 'Event logged / mitigated',
        status: 'MITIGATED',
      });
      await sendRawTelegramHtml(msg);
    }

    return NextResponse.json({ success: true, status: 'processed' }, { status: 200 });
  } catch (err) {
    console.error('[Visitor Intelligence API] Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}

export async function PATCH() {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}

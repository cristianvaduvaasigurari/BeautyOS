import { NextResponse } from 'next/server';
import { sendTelegramNotification } from '@/lib/telegram/notify';
import { TelegramEventType } from '@/lib/telegram/types';
import { EVENT_PRIORITY_MAP, HIGH_INTENT_ROUTES } from '@/lib/analytics/priorities';

// Server-side bounded cooldown cache key -> timestamp (bounded at 5,000 entries max)
const serverEventCooldowns = new Map<string, number>();

function getCooldown(key: string, now: number): number {
  const lastSent = serverEventCooldowns.get(key) || 0;
  // Periodic cleanup if map grows too large
  if (serverEventCooldowns.size > 5000) {
    for (const [k, timestamp] of serverEventCooldowns.entries()) {
      if (now - timestamp > 120000) {
        serverEventCooldowns.delete(k);
      }
    }
  }
  return lastSent;
}

const sanitizeString = (val: unknown, maxLen = 500): string => {
  if (typeof val !== 'string') return '';
  return val.trim().slice(0, maxLen);
};

export async function POST(request: Request) {
  try {
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }

    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
    }

    const event = sanitizeString(body.event, 100);
    const sourceRoute = sanitizeString(body.sourceRoute, 255);
    const category = body.category ? sanitizeString(body.category, 100) : undefined;
    const pageTitle = body.pageTitle ? sanitizeString(body.pageTitle, 200) : undefined;
    const anonymousSessionId = body.anonymousSessionId ? sanitizeString(body.anonymousSessionId, 100) : undefined;
    const isNewSession = Boolean(body.isNewSession);
    const previousPage = body.previousPage ? sanitizeString(body.previousPage, 255) : undefined;
    const referrerSource = body.referrerSource ? sanitizeString(body.referrerSource, 255) : undefined;
    const sessionDuration = body.sessionDuration ? sanitizeString(body.sessionDuration, 50) : undefined;
    const timestamp = body.timestamp ? sanitizeString(body.timestamp, 50) : undefined;

    // Sanitize journey steps array
    const journey = Array.isArray(body.journey)
      ? body.journey.slice(-10).map((step) => sanitizeString(step, 100))
      : undefined;

    // Sanitize metadata dictionary
    const metadata = body.metadata && typeof body.metadata === 'object'
      ? Object.fromEntries(
          Object.entries(body.metadata as Record<string, unknown>)
            .slice(0, 20)
            .map(([k, v]) => [sanitizeString(k, 50), typeof v === 'object' ? JSON.stringify(v).slice(0, 500) : sanitizeString(v, 500)])
        )
      : undefined;

    if (!event || !sourceRoute) {
      return NextResponse.json({ error: 'Missing required fields (event, sourceRoute)' }, { status: 400 });
    }

    const priority = EVENT_PRIORITY_MAP[event as TelegramEventType] || 'LOW';
    const isHighIntentRoute = HIGH_INTENT_ROUTES.some(route => sourceRoute.startsWith(route));

    // Throttling logic
    const eventKey = `${anonymousSessionId || 'anon'}:${event}:${sourceRoute}`;
    const now = Date.now();
    const lastSent = getCooldown(eventKey, now);

    let cooldownPeriod = 60000; // 60s default for LOW priority
    if (priority === 'MEDIUM') cooldownPeriod = 15000; // 15s
    if (priority === 'HIGH') cooldownPeriod = 5000; // 5s

    // HIGH priority events must NEVER be silently dropped unless submitted multiple times in < 5s
    if (priority !== 'HIGH' && (now - lastSent < cooldownPeriod) && !isNewSession) {
      return NextResponse.json({ success: true, status: 'throttled' }, { status: 200 });
    }

    serverEventCooldowns.set(eventKey, now);

    // Determine event type to send if new session vs page view
    let finalEvent = event as TelegramEventType;
    if (isNewSession && event === 'VISITOR_PAGE_VIEW') {
      finalEvent = 'VISITOR_SESSION_STARTED';
    }

    // Trigger Telegram notification asynchronously without blocking response
    await sendTelegramNotification({
      event: finalEvent,
      timestamp: timestamp || new Date().toISOString(),
      sourceRoute,
      category: category || (isHighIntentRoute ? 'HIGH INTENT ROUTE' : undefined),
      pageTitle,
      submittedFields: metadata,
      anonymousSessionId,
      journey,
      previousPage,
      referrerSource,
      sessionDuration,
    });

    return NextResponse.json({ success: true, status: 'recorded' }, { status: 200 });
  } catch (error) {
    console.error('[Telemetry API Route] Error:', error);
    // Failure MUST NOT break page functionality
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


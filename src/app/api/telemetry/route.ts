import { NextResponse } from 'next/server';
import { sendTelegramNotification } from '@/lib/telegram/notify';
import { TelegramEventType } from '@/lib/telegram/types';
import { EVENT_PRIORITY_MAP, HIGH_INTENT_ROUTES } from '@/lib/analytics/priorities';

// Server-side cooldown cache key -> timestamp
const serverEventCooldowns: Record<string, number> = {};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      event,
      sourceRoute,
      category,
      pageTitle,
      metadata,
      anonymousSessionId,
      isNewSession,
      journey,
      previousPage,
      referrerSource,
      sessionDuration,
      timestamp
    } = body;

    if (!event || !sourceRoute) {
      return NextResponse.json({ error: 'Missing required fields (event, sourceRoute)' }, { status: 400 });
    }

    const MAX_LENGTH = 2000;
    if (JSON.stringify(body).length > MAX_LENGTH * 4) {
      return NextResponse.json({ error: 'Payload size limit exceeded' }, { status: 413 });
    }

    const priority = EVENT_PRIORITY_MAP[event as TelegramEventType] || 'LOW';
    const isHighIntentRoute = HIGH_INTENT_ROUTES.some(route => sourceRoute.startsWith(route));

    // Throttling logic
    const eventKey = `${anonymousSessionId || 'anon'}:${event}:${sourceRoute}`;
    const now = Date.now();
    const lastSent = serverEventCooldowns[eventKey] || 0;

    let cooldownPeriod = 60000; // 60s default for LOW priority
    if (priority === 'MEDIUM') cooldownPeriod = 15000; // 15s
    if (priority === 'HIGH') cooldownPeriod = 5000; // 5s

    // HIGH priority events must NEVER be silently dropped unless submitted multiple times in < 5s
    if (priority !== 'HIGH' && (now - lastSent < cooldownPeriod) && !isNewSession) {
      return NextResponse.json({ success: true, status: 'throttled' }, { status: 200 });
    }

    serverEventCooldowns[eventKey] = now;

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

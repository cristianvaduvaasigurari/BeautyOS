import { NextResponse } from 'next/server';
import { sendTelegramNotification } from '@/lib/telegram/notify';
import { TelegramEventType } from '@/lib/telegram/types';

// In-memory server-side session anti-spam cache
const serverEventCooldowns: Record<string, number> = {};
const HIGH_INTENT_EVENTS: TelegramEventType[] = [
  'LEAD_SUBMISSION',
  'FORM_SUBMISSION',
  'CONTACT_REQUEST',
  'ELIGIBILITY_COMPLETED',
  'AI_HIGH_INTENT',
  'ECOSYSTEM_CLICK',
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { event, sourceRoute, category, metadata, anonymousSessionId, timestamp } = body;

    if (!event || !sourceRoute) {
      return NextResponse.json({ error: 'Missing required fields (event, sourceRoute)' }, { status: 400 });
    }

    const MAX_LENGTH = 1000;
    if (JSON.stringify(body).length > MAX_LENGTH * 4) {
      return NextResponse.json({ error: 'Payload size limit exceeded' }, { status: 413 });
    }

    const eventKey = `${anonymousSessionId || 'anon'}:${event}:${sourceRoute}`;
    const now = Date.now();
    const lastSent = serverEventCooldowns[eventKey] || 0;

    // Server-side throttling: 1 minute for page views, 10 seconds for high-intent actions
    const cooldownPeriod = HIGH_INTENT_EVENTS.includes(event) ? 10000 : 60000;

    if (now - lastSent < cooldownPeriod) {
      return NextResponse.json({ success: true, status: 'throttled' }, { status: 200 });
    }
    serverEventCooldowns[eventKey] = now;

    // Dispatch Telegram notification (only notify for high intent or throttled page views)
    if (HIGH_INTENT_EVENTS.includes(event)) {
      await sendTelegramNotification({
        event: event as TelegramEventType,
        timestamp: timestamp || new Date().toISOString(),
        sourceRoute,
        category,
        submittedFields: metadata,
        anonymousSessionId,
      });
    }

    return NextResponse.json({ success: true, status: 'recorded' }, { status: 200 });
  } catch (error) {
    console.error('[Telemetry API Route] Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

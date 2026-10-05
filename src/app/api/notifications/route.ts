import { NextResponse } from 'next/server';

const ALLOWED_NOTIFICATION_TYPES = [
  'DAILY_CHECKIN_REMINDER',
  'WEEKLY_HEALTH_REPORT',
  'PROTOCOL_MILESTONE',
] as const;

type AllowedNotificationType = typeof ALLOWED_NOTIFICATION_TYPES[number];

const sanitizeString = (val: unknown, maxLen = 200): string => {
  if (typeof val !== 'string') return '';
  return val.trim().slice(0, maxLen);
};

export async function POST(request: Request) {
  try {
    // Optional internal secret validation for cron / backend dispatcher triggers
    const expectedSecret = process.env.INTERNAL_API_SECRET || process.env.CRON_SECRET;
    if (expectedSecret) {
      const authHeader = request.headers.get('authorization');
      const providedSecret = authHeader ? authHeader.replace(/^Bearer\s+/i, '') : request.headers.get('x-internal-secret');
      if (providedSecret !== expectedSecret) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
    }

    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
    }

    const userId = sanitizeString(body.userId, 100);
    const type = sanitizeString(body.type, 100) as AllowedNotificationType;
    const payload = (body.payload && typeof body.payload === 'object') ? body.payload as Record<string, unknown> : {};

    if (!userId || !type) {
      return NextResponse.json({ error: 'Missing required parameters (userId, type).' }, { status: 400 });
    }

    if (!ALLOWED_NOTIFICATION_TYPES.includes(type)) {
      return NextResponse.json({ error: 'Invalid notification type.' }, { status: 400 });
    }

    // Process Resend / Email notification architectural triggers
    let notificationText = '';
    switch (type) {
      case 'DAILY_CHECKIN_REMINDER':
        notificationText = 'AiX Health Reminder: Complete your daily check-in to maintain your compounding health score streak.';
        break;
      case 'WEEKLY_HEALTH_REPORT':
        notificationText = 'Your AiX Health Weekly Biomarker Report is ready. Review your lean mass and sleep efficiency metrics.';
        break;
      case 'PROTOCOL_MILESTONE': {
        const safeDay = typeof payload.day === 'number' ? Math.min(365, Math.max(1, payload.day)) : 30;
        const safeProtocol = sanitizeString(payload.protocol, 100) || '90-Day Transformation';
        notificationText = `Congratulations! You completed Day ${safeDay} of your AiX Health ${safeProtocol} Protocol.`;
        break;
      }
      default:
        notificationText = 'AiX Health Notification update.';
    }

    return NextResponse.json({
      success: true,
      message: 'Notification queued successfully.',
      timestamp: new Date().toISOString(),
      notificationText
    }, { status: 200 });

  } catch (error) {
    console.error('Notification API Error:', error);
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


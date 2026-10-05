import { NextResponse } from 'next/server';
import { sendTelegramNotification } from '@/lib/telegram/notify';
import { getSupabaseServerClient } from '@/lib/supabaseServer';
import { buildSecurityEventMessage, sendRawTelegramHtml } from '@/lib/telegram/visitorIntelligenceFormatter';

// Simple in-memory rate limiter for lead submissions: 5 requests per IP per minute
const contactRateLimits = new Map<string, { count: number; expiresAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = contactRateLimits.get(ip);
  if (!record || now > record.expiresAt) {
    contactRateLimits.set(ip, { count: 1, expiresAt: now + 60000 });
    // Garbage collect expired entries if map grows
    if (contactRateLimits.size > 2000) {
      for (const [key, val] of contactRateLimits.entries()) {
        if (now > val.expiresAt) contactRateLimits.delete(key);
      }
    }
    return false;
  }
  if (record.count >= 5) {
    return true;
  }
  record.count += 1;
  return false;
}

const sanitizeString = (val: unknown, maxLen = 500): string => {
  if (typeof val !== 'string') return '';
  return val.trim().slice(0, maxLen);
};

export async function POST(request: Request) {
  try {
    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown-ip';
    if (isRateLimited(clientIp)) {
      const secMsg = buildSecurityEventMessage({
        severity: 'MEDIUM',
        eventType: 'RATE_LIMIT_TRIGGERED',
        endpoint: '/api/contact',
        ipHash: clientIp.slice(0, 8) + '...',
        timestamp: new Date().toISOString(),
        action: 'Contact request throttled',
        status: 'MITIGATED',
      });
      sendRawTelegramHtml(secMsg).catch(() => {});

      return NextResponse.json(
        { error: 'Too many requests. Please wait a minute before submitting again.' },
        { status: 429 }
      );
    }

    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
    }

    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid body.' }, { status: 400 });
    }

    const firstName = sanitizeString(body.firstName, 100);
    const lastName = sanitizeString(body.lastName, 100);
    const email = sanitizeString(body.email, 255);
    const phone = sanitizeString(body.phone, 50);
    const country = sanitizeString(body.country, 100);
    const age = sanitizeString(body.age, 20);
    const gender = sanitizeString(body.gender, 50);
    const goal = sanitizeString(body.goal, 150);
    const skinType = sanitizeString(body.skinType, 50);
    const concern = sanitizeString(body.concern, 200);
    const currentRoutine = sanitizeString(body.currentRoutine, 500);
    const productsUsed = sanitizeString(body.productsUsed, 500);
    const supplementsUsed = sanitizeString(body.supplementsUsed, 500);
    const message = sanitizeString(body.message, 2000);
    const source = sanitizeString(body.source, 150);
    const device = sanitizeString(body.device, 100);

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields (firstName, lastName, email, message).' },
        { status: 400 }
      );
    }

    // Basic email sanity check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address format.' }, { status: 400 });
    }

    // Safely persist lead in Supabase database
    const supabase = getSupabaseServerClient();
    if (supabase) {
      try {
        await supabase.from('leads').insert({
          first_name: firstName,
          last_name: lastName,
          email,
          phone: phone || null,
          goal: goal || null,
          message,
          source: source || '/contact',
        });
      } catch (dbErr) {
        console.error('[Contact API] Non-blocking DB insert error:', dbErr);
      }
    }

    // Attempt Telegram notification safely via central notification service
    try {
      await sendTelegramNotification({
        event: 'LEAD_SUBMISSION',
        timestamp: new Date().toISOString(),
        sourceRoute: source || '/contact',
        submittedFields: {
          name: `${firstName} ${lastName}`,
          email,
          phone: phone || 'N/A',
          country: country || 'N/A',
          age: age || 'N/A',
          gender: gender || 'N/A',
          goal: goal || 'N/A',
          skinType: skinType || 'N/A',
          concern: concern || 'N/A',
          currentRoutine: currentRoutine || 'N/A',
          productsUsed: productsUsed || 'N/A',
          supplementsUsed: supplementsUsed || 'N/A',
          message,
          device: device || 'Unknown',
        },
      });
    } catch (telegramErr) {
      // Telegram notification failure MUST NOT cause primary user action to fail
      console.error('[Contact API] Non-blocking Telegram error:', telegramErr);
    }

    return NextResponse.json({ success: true, message: 'Lead captured successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
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

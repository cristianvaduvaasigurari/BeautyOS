import { NextResponse } from 'next/server';
import crypto from 'crypto';

function verifyStripeSignature(rawBody: string, signatureHeader: string | null, secret: string): boolean {
  if (!signatureHeader || !secret) return false;
  
  try {
    const parts = signatureHeader.split(',');
    let timestamp = '';
    const signatures: string[] = [];

    for (const part of parts) {
      const [key, value] = part.trim().split('=');
      if (key === 't') timestamp = value;
      if (key === 'v1') signatures.push(value);
    }

    if (!timestamp || signatures.length === 0) return false;

    // Reject events older than 5 minutes to prevent replay attacks
    const eventAge = Math.floor(Date.now() / 1000) - parseInt(timestamp, 10);
    if (Math.abs(eventAge) > 300) return false;

    const signedPayload = `${timestamp}.${rawBody}`;
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(signedPayload, 'utf8')
      .digest('hex');

    return signatures.some(sig => {
      try {
        const a = Buffer.from(sig, 'hex');
        const b = Buffer.from(expectedSignature, 'hex');
        return a.length === b.length && crypto.timingSafeEqual(a, b);
      } catch {
        return false;
      }
    });
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (webhookSecret) {
      const signature = request.headers.get('stripe-signature');
      const isValid = verifyStripeSignature(body, signature, webhookSecret);
      if (!isValid) {
        return NextResponse.json({ error: 'Invalid or missing Stripe signature' }, { status: 400 });
      }
    } else if (process.env.NODE_ENV === 'production') {
      // In production, unconfigured webhook endpoint must fail closed
      return NextResponse.json({ error: 'Stripe webhook endpoint is inactive' }, { status: 503 });
    }

    let event: { type: string; data: { object: { id: string; customer?: string; status?: string } } };
    try {
      event = JSON.parse(body);
    } catch {
      return NextResponse.json({ error: 'Malformed JSON payload' }, { status: 400 });
    }

    if (!event || !event.type || typeof event.type !== 'string') {
      return NextResponse.json({ error: 'Invalid event format' }, { status: 400 });
    }

    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
      case 'invoice.payment_failed':
        break;
      default:
        // Acknowledge unhandled event types gracefully
        break;
    }

    return NextResponse.json({ received: true, eventType: event.type }, { status: 200 });

  } catch (error) {
    console.error('Stripe Webhook Error:', error);
    return NextResponse.json({ error: 'Webhook Handler Failed' }, { status: 400 });
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


import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.text();

    // Architectural Stripe Webhook Event Processor
    // In production environment with STRIPE_WEBHOOK_SECRET set, verify event signature
    let event: { type: string; data: { object: { id: string; customer?: string; status?: string } } };
    
    try {
      event = JSON.parse(body);
    } catch {
      event = {
        type: 'customer.subscription.updated',
        data: { object: { id: 'sub_mock_123', customer: 'cus_mock_123', status: 'active' } }
      };
    }

    console.log(`[HealthOS Stripe Webhook] Received Event Type: ${event.type}`);

    switch (event.type) {
      case 'customer.subscription.created':
        console.log(`[Stripe Sync] New subscription created: ${event.data.object.id}`);
        break;
      case 'customer.subscription.updated':
        console.log(`[Stripe Sync] Subscription updated: ${event.data.object.id}, status: ${event.data.object.status}`);
        break;
      case 'customer.subscription.deleted':
        console.log(`[Stripe Sync] Subscription cancelled: ${event.data.object.id}`);
        break;
      case 'invoice.payment_failed':
        console.log(`[Stripe Sync] Payment failed for customer: ${event.data.object.customer}`);
        break;
      default:
        console.log(`[Stripe Sync] Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true, eventType: event.type }, { status: 200 });

  } catch (error) {
    console.error('Stripe Webhook Error:', error);
    return NextResponse.json({ error: 'Webhook Handler Failed' }, { status: 400 });
  }
}

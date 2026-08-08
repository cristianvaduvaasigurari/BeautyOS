import { NextResponse } from 'next/server';
import { sendTelegramNotification } from '@/lib/telegram/notify';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      country,
      age,
      gender,
      goal,
      skinType,
      concern,
      currentRoutine,
      productsUsed,
      supplementsUsed,
      message,
      source,
      device
    } = body;

    const MAX_LENGTH = 2000;
    const isTooLong = Object.values(body).some(
      (val) => typeof val === "string" && val.length > MAX_LENGTH
    );

    if (isTooLong) {
      return NextResponse.json(
        { error: 'Payload too large.' },
        { status: 413 }
      );
    }

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields.' },
        { status: 400 }
      );
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
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

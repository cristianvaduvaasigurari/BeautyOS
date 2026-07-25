import { NextResponse } from 'next/server';

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

    // Basic security: enforce max lengths to prevent payload abuse
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

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields.' },
        { status: 400 }
      );
    }

    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    // Build the Telegram message text
    const text = `
━━━━━━━━━━━━━━
🆕 <b>NEW BEAUTYOS LEAD</b>
━━━━━━━━━━━━━━
<b>Name:</b> ${firstName} ${lastName}
<b>Email:</b> ${email}
<b>Phone:</b> ${phone || 'N/A'}
<b>Country:</b> ${country || 'N/A'}
<b>Age:</b> ${age || 'N/A'}
<b>Gender:</b> ${gender || 'N/A'}
<b>Goal:</b> ${goal || 'N/A'}
<b>Skin Type:</b> ${skinType || 'N/A'}
<b>Concern:</b> ${concern || 'N/A'}
<b>Current Routine:</b> ${currentRoutine || 'N/A'}
<b>Products Used:</b> ${productsUsed || 'N/A'}
<b>Supplements Used:</b> ${supplementsUsed || 'N/A'}

<b>Message:</b>
${message}

<b>Referral Source:</b> ${source || 'Direct'}
<b>Device:</b> ${device || 'Unknown'}
<b>Date:</b> ${new Date().toUTCString()}
━━━━━━━━━━━━━━
`;

    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      const response = await fetch(telegramUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: text,
          parse_mode: 'HTML',
        }),
      });

      if (!response.ok) {
        console.error('Telegram API error:', await response.text());
        throw new Error('Failed to send message to Telegram.');
      }
    } else {
      // Fallback: If no token is provided, we just log it successfully to simulate success in dev mode
      console.warn('No Telegram Bot Token provided. Lead saved to local logs only.', text);
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

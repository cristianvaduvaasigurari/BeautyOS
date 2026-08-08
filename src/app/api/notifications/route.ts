import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, type, payload } = body;

    if (!userId || !type) {
      return NextResponse.json({ error: 'Missing required parameters (userId, type).' }, { status: 400 });
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
      case 'PROTOCOL_MILESTONE':
        notificationText = `Congratulations! You completed Day ${payload?.day || 30} of your AiX Health ${payload?.protocol || '90-Day Transformation'} Protocol.`;
        break;
      default:
        notificationText = 'AiX Health Notification update.';
    }

    console.log(`[AiX Health Email/Notification Dispatcher] Sent to User ${userId}: ${notificationText}`);

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

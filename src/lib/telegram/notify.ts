import { TelegramNotificationPayload } from './types';

/**
 * Server-side Telegram Notification Service
 * Sends structured events to Telegram bot.
 * NEVER exposes secrets to client-side.
 */
export async function sendTelegramNotification(
  payload: TelegramNotificationPayload
): Promise<boolean> {
  try {
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.warn('[Telegram Notify] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID missing in environment variables.');
      return false;
    }

    let icon = '🔔';
    switch (payload.event) {
      case 'LEAD_SUBMISSION':
      case 'FORM_SUBMISSION':
      case 'CONTACT_REQUEST':
        icon = '🆕';
        break;
      case 'ELIGIBILITY_COMPLETED':
        icon = '✅';
        break;
      case 'AI_HIGH_INTENT':
        icon = '⚡';
        break;
      case 'ECOSYSTEM_CLICK':
        icon = '🌐';
        break;
      case 'VISITOR_PAGE_VIEW':
        icon = '👁️';
        break;
      case 'VISITOR_SEARCH':
        icon = '🔍';
        break;
      default:
        icon = '📊';
    }

    let fieldsText = '';
    if (payload.submittedFields && Object.keys(payload.submittedFields).length > 0) {
      fieldsText = '\n<b>Details:</b>\n' + Object.entries(payload.submittedFields)
        .map(([k, v]) => `• <b>${k}:</b> ${typeof v === 'object' ? JSON.stringify(v) : String(v)}`)
        .join('\n');
    }

    const text = `
━━━━━━━━━━━━━━
${icon} <b>AiX HEALTH EVENT: ${payload.event}</b>
━━━━━━━━━━━━━━
<b>Source Route:</b> <code>${payload.sourceRoute}</code>
${payload.category ? `<b>Category:</b> ${payload.category}\n` : ''}<b>Session:</b> <code>${payload.anonymousSessionId || 'N/A'}</code>
<b>Timestamp:</b> ${payload.timestamp}${fieldsText}
━━━━━━━━━━━━━━
`;

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
      console.error('[Telegram Notify] API error:', await response.text());
      return false;
    }

    return true;
  } catch (error) {
    console.error('[Telegram Notify] Exception:', error);
    return false;
  }
}

import { TelegramNotificationPayload } from './types';

/**
 * Server-side Telegram Notification Service
 * Formats and dispatches visitor intelligence and high-intent alerts to Telegram.
 * NEVER exposes secrets to client-side code.
 */
export async function sendTelegramNotification(
  payload: TelegramNotificationPayload
): Promise<boolean> {
  try {
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.warn('[Telegram Notify] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID missing in server env.');
      return false;
    }

    let headerTitle = 'AiX Health EVENT';
    let icon = '📊';

    switch (payload.event) {
      case 'VISITOR_SESSION_STARTED':
        headerTitle = 'AiX Health — NEW VISITOR';
        icon = '🟢';
        break;
      case 'VISITOR_PAGE_VIEW':
        headerTitle = 'AiX Health — VISITOR NAVIGATION';
        icon = '👁️';
        break;
      case 'AI_HIGH_INTENT':
        headerTitle = 'AiX Health — HIGH INTENT';
        icon = '⚡';
        break;
      case 'ECOSYSTEM_CLICK':
        headerTitle = 'AiX Health — ECOSYSTEM CLICK';
        icon = '🌐';
        break;
      case 'CONTACT_REQUEST':
      case 'LEAD_SUBMISSION':
      case 'FORM_SUBMISSION':
        headerTitle = 'AiX Health — LEAD / FORM SUBMISSION';
        icon = '🔥';
        break;
      case 'ELIGIBILITY_COMPLETED':
        headerTitle = 'AiX Health — ELIGIBILITY COMPLETED';
        icon = '✅';
        break;
      case 'VISITOR_PRODUCT_VIEW':
      case 'VISITOR_PROGRAM_VIEW':
        headerTitle = 'AiX Health — HIGH-VALUE PRODUCT / PROGRAM VIEW';
        icon = '💊';
        break;
      case 'VISITOR_SEARCH':
        headerTitle = 'AiX Health — VISITOR SEARCH';
        icon = '🔍';
        break;
      default:
        headerTitle = `AiX Health — ${payload.event}`;
        icon = '📌';
    }

    let fieldsText = '';
    if (payload.submittedFields && Object.keys(payload.submittedFields).length > 0) {
      fieldsText = '\n<b>Details:</b>\n' + Object.entries(payload.submittedFields)
        .map(([k, v]) => `• <b>${k}:</b> ${typeof v === 'object' ? JSON.stringify(v) : String(v)}`)
        .join('\n');
    }

    let journeyText = '';
    if (payload.journey && payload.journey.length > 0) {
      journeyText = `\n<b>Recent Journey:</b>\n` + payload.journey.map((step, idx) => `${idx + 1}. <code>${step}</code>`).join('\n');
    }

    const text = `
━━━━━━━━━━━━━━━━━━
${icon} <b>${headerTitle}</b>
━━━━━━━━━━━━━━━━━━

<b>Visitor:</b> <code>${payload.anonymousSessionId || 'visitor_anon'}</code>
${payload.pageTitle ? `<b>Page:</b> ${payload.pageTitle}\n` : ''}<b>Route:</b> <code>${payload.sourceRoute}</code>
${payload.previousPage ? `<b>Previous Page:</b> <code>${payload.previousPage}</code>\n` : ''}${payload.category ? `<b>Category:</b> ${payload.category}\n` : ''}${payload.sessionDuration ? `<b>Session Duration:</b> ${payload.sessionDuration}\n` : ''}${payload.referrerSource ? `<b>Source:</b> ${payload.referrerSource}\n` : ''}<b>Event:</b> <code>${payload.event}</code>
<b>Time:</b> ${payload.timestamp}${fieldsText}${journeyText}

━━━━━━━━━━━━━━━━━━
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

import { TelegramNotificationPayload } from './types';

/**
 * Escapes special HTML characters to prevent Telegram HTML parsing failures and HTML injection.
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

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
        .map(([k, v]) => {
          const safeKey = escapeHtml(String(k));
          const safeVal = escapeHtml(typeof v === 'object' ? JSON.stringify(v) : String(v));
          return `• <b>${safeKey}:</b> ${safeVal}`;
        })
        .join('\n');
    }

    let journeyText = '';
    if (payload.journey && payload.journey.length > 0) {
      journeyText = `\n<b>Recent Journey:</b>\n` + payload.journey.map((step, idx) => `${idx + 1}. <code>${escapeHtml(String(step))}</code>`).join('\n');
    }

    const safeVisitor = escapeHtml(String(payload.anonymousSessionId || 'visitor_anon'));
    const safePageTitle = payload.pageTitle ? escapeHtml(String(payload.pageTitle)) : '';
    const safeRoute = escapeHtml(String(payload.sourceRoute));
    const safePreviousPage = payload.previousPage ? escapeHtml(String(payload.previousPage)) : '';
    const safeCategory = payload.category ? escapeHtml(String(payload.category)) : '';
    const safeSessionDuration = payload.sessionDuration ? escapeHtml(String(payload.sessionDuration)) : '';
    const safeReferrerSource = payload.referrerSource ? escapeHtml(String(payload.referrerSource)) : '';
    const safeEvent = escapeHtml(String(payload.event));
    const safeTimestamp = escapeHtml(String(payload.timestamp));

    const text = `
━━━━━━━━━━━━━━━━━━
${icon} <b>${headerTitle}</b>
━━━━━━━━━━━━━━━━━━

<b>Visitor:</b> <code>${safeVisitor}</code>
${safePageTitle ? `<b>Page:</b> ${safePageTitle}\n` : ''}<b>Route:</b> <code>${safeRoute}</code>
${safePreviousPage ? `<b>Previous Page:</b> <code>${safePreviousPage}</code>\n` : ''}${safeCategory ? `<b>Category:</b> ${safeCategory}\n` : ''}${safeSessionDuration ? `<b>Session Duration:</b> ${safeSessionDuration}\n` : ''}${safeReferrerSource ? `<b>Source:</b> ${safeReferrerSource}\n` : ''}<b>Event:</b> <code>${safeEvent}</code>
<b>Time:</b> ${safeTimestamp}${fieldsText}${journeyText}

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

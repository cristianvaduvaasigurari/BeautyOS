import { TrafficAttribution, ClientDeviceContext, ConversionType, IntentScoreLevel } from '../analytics/visitorTypes';

export function escapeHtml(str: string): string {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function formatShortId(id: string, prefix: 'V' | 'S'): string {
  if (!id) return `${prefix}-UNKNOWN`;
  const clean = id.replace(/-/g, '').toUpperCase();
  return `${prefix}-${clean.slice(0, 8)}`;
}

export function formatLocation(country?: string, region?: string, city?: string, timezone?: string): string {
  const parts: string[] = [];
  if (country) parts.push(country);
  if (region && region !== city) parts.push(region);
  if (city) parts.push(city);
  if (timezone) parts.push(timezone);

  return parts.length > 0 ? parts.join('\n') : 'Unknown';
}

export interface NewVisitorAlertParams {
  visitorId: string;
  sessionId: string;
  timestamp: string;
  country?: string;
  region?: string;
  city?: string;
  timezone?: string;
  device?: ClientDeviceContext;
  attribution: TrafficAttribution;
  landingPath: string;
  currentPath: string;
}

export function buildNewVisitorMessage(params: NewVisitorAlertParams): string {
  const vId = escapeHtml(formatShortId(params.visitorId, 'V'));
  const sId = escapeHtml(formatShortId(params.sessionId, 'S'));
  const time = escapeHtml(params.timestamp);
  const location = escapeHtml(formatLocation(params.country, params.region, params.city, params.timezone));
  const devType = escapeHtml(params.device?.deviceType || 'Desktop');
  const os = escapeHtml(params.device?.os || 'Unknown OS');
  const browser = escapeHtml(params.device?.browser || 'Unknown Browser');
  const viewport = `${params.device?.viewportWidth || 1440} × ${params.device?.viewportHeight || 900}`;
  const lang = escapeHtml(params.device?.language || 'en-US');
  const src = escapeHtml(params.attribution.source || 'Direct');
  const med = escapeHtml(params.attribution.medium || 'Direct');
  const camp = escapeHtml(params.attribution.campaign || '—');
  const ref = escapeHtml(params.attribution.referrer || 'Direct');
  const landing = escapeHtml(params.landingPath || '/');
  const current = escapeHtml(params.currentPath || landing);

  return `🔔 <b>AIX HEALTH — NEW VISITOR</b>

━━━━━━━━━━━━━━━━━━━━

👤 <b>VISITOR</b>

Visitor ID: <code>${vId}</code>
Session: <code>${sId}</code>
Status: 🟢 NEW

🕐 <b>FIRST SEEN</b>
${time}

📍 <b>LOCATION</b>

${location}

<i>Location is IP-based and approximate.</i>

💻 <b>DEVICE</b>

${devType}
${os}
${browser}
Viewport: ${viewport}
Language: ${lang}

🌐 <b>ACQUISITION</b>

Source: ${src}
Medium: ${med}
Campaign: ${camp}
Referrer: ${ref}

📄 <b>LANDING PAGE</b>

<code>${landing}</code>

👀 <b>CURRENT PAGE</b>

<code>${current}</code>

━━━━━━━━━━━━━━━━━━━━

EVENT
<b>NEW_VISITOR</b>`;
}

export interface ReturningVisitorAlertParams {
  visitorId: string;
  sessionCount: number;
  city?: string;
  country?: string;
  device?: ClientDeviceContext;
  source: string;
  landingPath: string;
  pageViewsCount: number;
  engagementSeconds: number;
  actions: string[];
  interests: string[];
  intentShift: string;
}

export function buildReturningVisitorMessage(params: ReturningVisitorAlertParams): string {
  const vId = escapeHtml(formatShortId(params.visitorId, 'V'));
  const sessCount = Math.max(1, params.sessionCount);
  const loc = escapeHtml([params.city, params.country].filter(Boolean).join(', ') || 'Unknown Location');
  const dev = escapeHtml(`${params.device?.deviceType || 'Desktop'} · ${params.device?.os || 'OS'} · ${params.device?.browser || 'Browser'}`);
  const traffic = escapeHtml(`${params.source} → ${params.landingPath}`);

  const mins = Math.floor(params.engagementSeconds / 60);
  const secs = params.engagementSeconds % 60;
  const durationText = `${mins}m ${secs}s engagement`;

  const behaviorLines = [
    `• ${params.pageViewsCount} pages viewed`,
    `• ${durationText}`,
    ...params.actions.map(a => `• ${escapeHtml(a)}`),
  ].join('\n');

  const interestText = params.interests.length > 0
    ? params.interests.map(i => `${escapeHtml(i)} ↑`).join('\n')
    : 'General Content ↑';

  return `🔄 <b>AIX HEALTH — RETURNING VISITOR</b>

Visitor: <code>${vId}</code>
Previous sessions: ${sessCount - 1}

📍 ${loc}
💻 ${dev}

<b>TRAFFIC</b>
${traffic}

<b>BEHAVIOR</b>

${behaviorLines}

<b>INTEREST SHIFT</b>

${interestText}

<b>INTENT</b>

🟠 ${escapeHtml(params.intentShift || 'HIGHER THAN PREVIOUS SESSION')}

EVENT
<b>RETURNING_VISITOR</b>`;
}

export interface HighIntentAlertParams {
  visitorId: string;
  sessionId: string;
  city?: string;
  country?: string;
  device?: ClientDeviceContext;
  source: string;
  isReturning: boolean;
  pageViewsCount: number;
  engagementSeconds: number;
  actions: string[];
  interestPercentages: Record<string, number>;
  intentScore: number;
  intentLevel: IntentScoreLevel;
  reason: string;
}

export function buildHighIntentMessage(params: HighIntentAlertParams): string {
  const vId = escapeHtml(formatShortId(params.visitorId, 'V'));
  const sId = escapeHtml(formatShortId(params.sessionId, 'S'));
  const loc = escapeHtml([params.city, params.country].filter(Boolean).join(', ') || 'Unknown');
  const dev = escapeHtml(`${params.device?.deviceType || 'Desktop'} · ${params.device?.os || 'OS'} · ${params.device?.browser || 'Browser'}`);
  const src = escapeHtml(params.source);

  const mins = Math.floor(params.engagementSeconds / 60);
  const secs = params.engagementSeconds % 60;
  const durationText = `${mins}m ${secs}s session`;

  const behaviorItems = [
    params.isReturning ? '• Returning visitor' : '• New high-velocity visitor',
    `• ${params.pageViewsCount} pages viewed`,
    `• ${durationText}`,
    ...params.actions.map(a => `• ${escapeHtml(a)}`),
  ].join('\n');

  const interestLines = Object.entries(params.interestPercentages)
    .map(([k, v]) => `${escapeHtml(k)}: ${v}%`)
    .join('\n') || 'AI / Education: 85%';

  const icon = params.intentScore >= 75 ? '🔴' : '🟠';

  return `🔥 <b>AIX HEALTH — HIGH INTENT SIGNAL</b>

Visitor: <code>${vId}</code>
Session: <code>${sId}</code>

📍 ${loc}
💻 ${dev}

<b>SOURCE</b>
${src}

<b>BEHAVIOR</b>

${behaviorItems}

<b>INTEREST</b>

${interestLines}

<b>INTENT</b>
${icon} <b>${params.intentLevel} — ${params.intentScore}/100</b>

<b>REASON</b>

${escapeHtml(params.reason || 'Multiple high-engagement educational actions.')}

EVENT
<b>HIGH_INTENT</b>`;
}

export interface ConversionAlertParams {
  visitorId: string;
  sessionId: string;
  conversionType: ConversionType;
  source: string;
  landingPath: string;
  journey: string[];
  engagementSeconds: number;
  pageViewsCount: number;
  intentLevel: IntentScoreLevel;
}

export function buildConversionMessage(params: ConversionAlertParams): string {
  const vId = escapeHtml(formatShortId(params.visitorId, 'V'));
  const sId = escapeHtml(formatShortId(params.sessionId, 'S'));
  const convType = escapeHtml(params.conversionType);
  const src = escapeHtml(params.source);
  const landing = escapeHtml(params.landingPath);

  const mins = Math.floor(params.engagementSeconds / 60);
  const secs = params.engagementSeconds % 60;
  const durationText = `${mins}m ${secs}s`;

  const journeyLines = params.journey.length > 0
    ? params.journey.map(step => `→ ${escapeHtml(step)}`).join('\n')
    : `→ ${landing}\n→ Contact`;

  return `💰 <b>AIX HEALTH — CONVERSION</b>

Visitor: <code>${vId}</code>
Session: <code>${sId}</code>

<b>CONVERSION</b>
${convType}

<b>SOURCE</b>
${src}

<b>LANDING</b>
<code>${landing}</code>

<b>JOURNEY</b>

${src}
${journeyLines}

<b>SESSION</b>
${durationText}

<b>PAGES</b>
${params.pageViewsCount}

<b>INTENT</b>
<b>${params.intentLevel}</b>

EVENT
<b>CONVERSION</b>`;
}

export interface SecurityEventAlertParams {
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  eventType: string;
  endpoint: string;
  visitorId?: string;
  ipHash: string;
  country?: string;
  timestamp: string;
  action: string;
  status: string;
}

export function buildSecurityEventMessage(params: SecurityEventAlertParams): string {
  const vId = escapeHtml(formatShortId(params.visitorId || 'UNKNOWN', 'V'));
  const sevIcon = params.severity === 'CRITICAL' || params.severity === 'HIGH' ? '🔴' : '🟠';
  const sev = escapeHtml(params.severity);
  const ev = escapeHtml(params.eventType);
  const ep = escapeHtml(params.endpoint);
  const ip = escapeHtml(params.ipHash);
  const country = escapeHtml(params.country || 'Unknown');
  const time = escapeHtml(params.timestamp);
  const act = escapeHtml(params.action);
  const st = escapeHtml(params.status);

  return `🛡 <b>AIX HEALTH — SECURITY EVENT</b>

Severity: ${sevIcon} <b>${sev}</b>

<b>Event:</b>
${ev}

<b>Endpoint:</b>
<code>${ep}</code>

<b>Visitor:</b>
<code>${vId}</code>

<b>IP:</b>
<code>[${ip}]</code>

<b>Country:</b>
${country}

<b>Time:</b>
${time}

<b>Action:</b>
${act}

<b>Status:</b>
${st}`;
}

export async function sendRawTelegramHtml(html: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return false;
  }

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: html,
        parse_mode: 'HTML',
      }),
    });

    if (!res.ok) {
      console.error('[Telegram VisitorIntelligence] API error:', await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error('[Telegram VisitorIntelligence] Failed to send notification:', err);
    return false;
  }
}

import {
  VisitorEventName,
  ConversionType,
  ClientDeviceContext,
} from './visitorTypes';

function generateUUID(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getOrCreateVisitorId(): string {
  if (typeof window === 'undefined') return generateUUID();

  try {
    let vid = localStorage.getItem('aix_v2_visitor_id');
    if (!vid || vid.length < 32) {
      vid = generateUUID();
      localStorage.setItem('aix_v2_visitor_id', vid);
    }
    return vid;
  } catch {
    return generateUUID();
  }
}

const SESSION_INACTIVITY_MS = 30 * 60 * 1000; // 30 minutes

export function getOrCreateSession(): { sessionId: string; isNewSession: boolean; startTime: number } {
  if (typeof window === 'undefined') {
    return { sessionId: generateUUID(), isNewSession: true, startTime: Date.now() };
  }

  try {
    const now = Date.now();
    const storedSid = sessionStorage.getItem('aix_v2_session_id');
    const storedStart = sessionStorage.getItem('aix_v2_session_start');
    const storedLastActive = sessionStorage.getItem('aix_v2_last_active');

    const lastActive = storedLastActive ? parseInt(storedLastActive, 10) : 0;
    const isExpired = !storedSid || (now - lastActive > SESSION_INACTIVITY_MS);

    if (isExpired) {
      const newSid = generateUUID();
      sessionStorage.setItem('aix_v2_session_id', newSid);
      sessionStorage.setItem('aix_v2_session_start', String(now));
      sessionStorage.setItem('aix_v2_last_active', String(now));
      return { sessionId: newSid, isNewSession: true, startTime: now };
    }

    sessionStorage.setItem('aix_v2_last_active', String(now));
    return {
      sessionId: storedSid,
      isNewSession: false,
      startTime: storedStart ? parseInt(storedStart, 10) : now,
    };
  } catch {
    return { sessionId: generateUUID(), isNewSession: true, startTime: Date.now() };
  }
}

export function getClientDeviceContext(): ClientDeviceContext {
  if (typeof window === 'undefined') {
    return {
      deviceType: 'Desktop',
      browser: 'Server',
      os: 'Unknown',
      language: 'en',
      viewportWidth: 1440,
      viewportHeight: 900,
      timezone: 'UTC',
    };
  }

  const width = window.innerWidth || 1440;
  const height = window.innerHeight || 900;
  let deviceType: 'Desktop' | 'Mobile' | 'Tablet' = 'Desktop';
  if (width < 768) {
    deviceType = 'Mobile';
  } else if (width <= 1024) {
    deviceType = 'Tablet';
  }

  return {
    deviceType,
    browser: 'Browser',
    os: 'OS',
    language: navigator.language || 'en-US',
    viewportWidth: width,
    viewportHeight: height,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
  };
}

export function getUtmParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const utms: Record<string, string> = {};
    const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    for (const k of keys) {
      const val = urlParams.get(k);
      if (val) utms[k] = val.slice(0, 100);
    }
    return utms;
  } catch {
    return {};
  }
}

export function sendVisitorEvent(
  eventName: VisitorEventName,
  options?: {
    path?: string;
    title?: string;
    scrollDepth?: number;
    durationSeconds?: number;
    conversionType?: ConversionType;
    conversionValue?: string;
    metadata?: Record<string, unknown>;
  }
): void {
  if (typeof window === 'undefined') return;

  try {
    const visitor_id = getOrCreateVisitorId();
    const { sessionId: session_id } = getOrCreateSession();
    const path = options?.path || window.location.pathname || '/';
    const title = options?.title || document.title || 'AiX Health';
    const referrer = document.referrer || undefined;
    const utms = getUtmParams();
    const device = getClientDeviceContext();

    const payload = {
      visitor_id,
      session_id,
      event_name: eventName,
      path,
      title,
      referrer,
      ...utms,
      device,
      scroll_depth: options?.scrollDepth,
      duration_seconds: options?.durationSeconds,
      conversion_type: options?.conversionType,
      conversion_value: options?.conversionValue,
      metadata: options?.metadata,
      timestamp: new Date().toISOString(),
    };

    const payloadStr = JSON.stringify(payload);

    // Prefer navigator.sendBeacon for reliable, non-blocking fire-and-forget
    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([payloadStr], { type: 'application/json' });
      const sent = navigator.sendBeacon('/api/visitor-intelligence', blob);
      if (sent) return;
    }

    // Fallback to fetch with keepalive
    fetch('/api/visitor-intelligence', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payloadStr,
      keepalive: true,
    }).catch(() => {
      // Fail silently
    });
  } catch {
    // Fail silently in all edge cases
  }
}

export function trackCtaClick(ctaId: string, ctaLabel: string, path?: string, metadata?: Record<string, unknown>): void {
  sendVisitorEvent('CTA_CLICK', {
    path: path || (typeof window !== 'undefined' ? window.location.pathname : '/'),
    metadata: {
      cta_id: ctaId,
      cta_label: ctaLabel,
      ...metadata,
    },
  });
}

export function trackConversion(conversionType: ConversionType, conversionValue?: string, metadata?: Record<string, unknown>): void {
  sendVisitorEvent('FORM_SUBMITTED', {
    conversionType,
    conversionValue,
    metadata,
  });
}

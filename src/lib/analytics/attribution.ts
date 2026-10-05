import { TrafficAttribution, ClientDeviceContext } from './visitorTypes';

export function normalizeTrafficSource(
  referrerRaw?: string,
  utmSource?: string,
  utmMedium?: string,
  utmCampaign?: string,
  utmTerm?: string,
  utmContent?: string
): TrafficAttribution {
  // If UTM parameters exist, prioritize them
  if (utmSource) {
    const src = utmSource.trim();
    let med = utmMedium ? utmMedium.trim() : 'referral';
    const medLower = med.toLowerCase();

    if (['cpc', 'ppc', 'paid', 'paidsocial', 'display'].includes(medLower)) {
      med = 'Paid';
    } else if (['social', 'organic_social', 'community'].includes(medLower)) {
      med = 'Social';
    } else if (['email', 'newsletter'].includes(medLower)) {
      med = 'Email';
    }

    return {
      source: src,
      medium: med,
      campaign: utmCampaign?.trim() || undefined,
      term: utmTerm?.trim() || undefined,
      content: utmContent?.trim() || undefined,
      referrer: referrerRaw?.slice(0, 500),
    };
  }

  // If no UTM, inspect Referrer
  if (!referrerRaw || referrerRaw.trim() === '') {
    return {
      source: 'Direct',
      medium: 'Direct',
    };
  }

  try {
    const url = new URL(referrerRaw);
    const host = url.hostname.toLowerCase();

    // Search engines
    if (host.includes('google.')) return { source: 'Google', medium: 'Organic Search', referrer: referrerRaw.slice(0, 500) };
    if (host.includes('bing.')) return { source: 'Bing', medium: 'Organic Search', referrer: referrerRaw.slice(0, 500) };
    if (host.includes('duckduckgo.')) return { source: 'DuckDuckGo', medium: 'Organic Search', referrer: referrerRaw.slice(0, 500) };
    if (host.includes('yahoo.')) return { source: 'Yahoo', medium: 'Organic Search', referrer: referrerRaw.slice(0, 500) };
    if (host.includes('ecosia.')) return { source: 'Ecosia', medium: 'Organic Search', referrer: referrerRaw.slice(0, 500) };

    // Social
    if (host.includes('instagram.')) return { source: 'Instagram', medium: 'Social', referrer: referrerRaw.slice(0, 500) };
    if (host.includes('facebook.') || host.includes('fb.')) return { source: 'Facebook', medium: 'Social', referrer: referrerRaw.slice(0, 500) };
    if (host.includes('t.me') || host.includes('telegram.')) return { source: 'Telegram', medium: 'Social', referrer: referrerRaw.slice(0, 500) };
    if (host.includes('twitter.') || host.includes('x.com') || host.includes('t.co')) return { source: 'X / Twitter', medium: 'Social', referrer: referrerRaw.slice(0, 500) };
    if (host.includes('linkedin.')) return { source: 'LinkedIn', medium: 'Social', referrer: referrerRaw.slice(0, 500) };
    if (host.includes('youtube.')) return { source: 'YouTube', medium: 'Social', referrer: referrerRaw.slice(0, 500) };
    if (host.includes('tiktok.')) return { source: 'TikTok', medium: 'Social', referrer: referrerRaw.slice(0, 500) };
    if (host.includes('reddit.')) return { source: 'Reddit', medium: 'Social', referrer: referrerRaw.slice(0, 500) };
    if (host.includes('pinterest.')) return { source: 'Pinterest', medium: 'Social', referrer: referrerRaw.slice(0, 500) };

    // Self / Ecosystem referral
    if (host.includes('cristianvaduva.com') || host.includes('beautyos')) {
      return { source: 'AiX Ecosystem', medium: 'Internal Referral', referrer: referrerRaw.slice(0, 500) };
    }

    return {
      source: host,
      medium: 'Referral',
      referrer: referrerRaw.slice(0, 500),
    };
  } catch {
    return {
      source: 'Direct',
      medium: 'Direct',
    };
  }
}

export function parseDeviceFromUserAgent(uaString?: string): ClientDeviceContext {
  const ua = (uaString || '').toLowerCase();

  let deviceType: 'Desktop' | 'Mobile' | 'Tablet' = 'Desktop';
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    deviceType = 'Tablet';
  } else if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(ua)) {
    deviceType = 'Mobile';
  }

  let browser = 'Unknown Browser';
  let browserVersion = '';
  if (ua.includes('edg/')) {
    browser = 'Edge';
    browserVersion = ua.split('edg/')[1]?.split(' ')[0] || '';
  } else if (ua.includes('chrome/') && !ua.includes('chromium/')) {
    browser = 'Chrome';
    browserVersion = ua.split('chrome/')[1]?.split(' ')[0] || '';
  } else if (ua.includes('safari/') && !ua.includes('chrome/')) {
    browser = 'Safari';
    browserVersion = ua.split('version/')[1]?.split(' ')[0] || '';
  } else if (ua.includes('firefox/')) {
    browser = 'Firefox';
    browserVersion = ua.split('firefox/')[1]?.split(' ')[0] || '';
  }

  let os = 'Unknown OS';
  if (ua.includes('macintosh') || ua.includes('mac os x')) {
    os = 'macOS';
  } else if (ua.includes('windows')) {
    os = 'Windows';
  } else if (ua.includes('iphone') || ua.includes('ipad') || ua.includes('ios')) {
    os = 'iOS';
  } else if (ua.includes('android')) {
    os = 'Android';
  } else if (ua.includes('linux')) {
    os = 'Linux';
  }

  return {
    deviceType,
    browser,
    browserVersion: browserVersion.slice(0, 20),
    os,
    language: 'en-US',
    viewportWidth: deviceType === 'Mobile' ? 390 : 1440,
    viewportHeight: deviceType === 'Mobile' ? 844 : 900,
    timezone: 'UTC',
  };
}

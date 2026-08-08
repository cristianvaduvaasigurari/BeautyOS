/**
 * Client-Side Telemetry & Visitor Intelligence Helper
 * Anonymous session management, journey tracking, traffic source detection & anti-spam throttling.
 */

import { TelegramEventType } from "../telegram/types";

export function getOrCreateAnonymousSession(): {
  sessionId: string;
  isNewSession: boolean;
  startTime: number;
} {
  if (typeof window === "undefined") {
    return { sessionId: "visitor_server", isNewSession: false, startTime: Date.now() };
  }

  try {
    let sessionData = sessionStorage.getItem("aix_visitor_session_data");
    let isNewSession = false;

    if (!sessionData) {
      const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
      const sessionId = `visitor_${rand}`;
      const startTime = Date.now();
      sessionData = JSON.stringify({ sessionId, startTime });
      sessionStorage.setItem("aix_visitor_session_data", sessionData);
      isNewSession = true;
    }

    const parsed = JSON.parse(sessionData);
    return {
      sessionId: parsed.sessionId || "visitor_anon",
      isNewSession,
      startTime: parsed.startTime || Date.now(),
    };
  } catch {
    return { sessionId: "visitor_anon", isNewSession: false, startTime: Date.now() };
  }
}

export function updateAndGetJourney(currentRoute: string): { journey: string[]; previousPage: string } {
  if (typeof window === "undefined") return { journey: [currentRoute], previousPage: "" };

  try {
    let journey: string[] = JSON.parse(sessionStorage.getItem("aix_visitor_journey") || "[]");
    const previousPage = journey.length > 0 ? journey[journey.length - 1] : "";

    // Append current route if different from last
    if (journey[journey.length - 1] !== currentRoute) {
      journey.push(currentRoute);
      if (journey.length > 5) {
        journey = journey.slice(-5); // Keep last 5 pages
      }
      sessionStorage.setItem("aix_visitor_journey", JSON.stringify(journey));
    }

    return { journey, previousPage };
  } catch {
    return { journey: [currentRoute], previousPage: "" };
  }
}

export function detectTrafficSource(): string {
  if (typeof window === "undefined") return "DIRECT";

  try {
    const referrer = document.referrer;
    if (!referrer) return "DIRECT";

    const url = new URL(referrer);
    const host = url.hostname.toLowerCase();

    if (host.includes("google")) return "GOOGLE";
    if (host.includes("instagram")) return "INSTAGRAM";
    if (host.includes("facebook")) return "FACEBOOK";
    if (host.includes("linkedin")) return "LINKEDIN";
    if (host.includes("t.me") || host.includes("telegram")) return "TELEGRAM";
    if (host.includes("twitter") || host.includes("x.com")) return "TWITTER";

    return host.toUpperCase();
  } catch {
    return "DIRECT";
  }
}

export function formatSessionDuration(startTime: number): string {
  const elapsedSec = Math.floor((Date.now() - startTime) / 1000);
  const minutes = Math.floor(elapsedSec / 60);
  const seconds = elapsedSec % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export interface TelemetryEventPayload {
  event: TelegramEventType;
  sourceRoute: string;
  category?: string;
  pageTitle?: string;
  metadata?: Record<string, unknown>;
}

// Client-side throttling cache
const lastEventCache: Record<string, number> = {};
const COOLDOWN_PAGE_VIEW_MS = 60000; // 60 seconds for same page view
const COOLDOWN_MEDIUM_MS = 15000; // 15 seconds for medium-intent events

export async function sendTelemetryEvent(payload: TelemetryEventPayload): Promise<void> {
  if (typeof window === "undefined") return;

  const { sessionId, isNewSession, startTime } = getOrCreateAnonymousSession();
  const { journey, previousPage } = updateAndGetJourney(payload.sourceRoute);
  const referrerSource = detectTrafficSource();
  const sessionDuration = formatSessionDuration(startTime);

  const eventKey = `${payload.event}:${payload.sourceRoute}`;
  const now = Date.now();

  // Throttling rules on client side
  if (payload.event === "VISITOR_PAGE_VIEW" && !isNewSession) {
    const lastSent = lastEventCache[eventKey] || 0;
    if (now - lastSent < COOLDOWN_PAGE_VIEW_MS) {
      return; // Cooldown active for exact same page refresh
    }
    lastEventCache[eventKey] = now;
  } else if (payload.event === "ECOSYSTEM_CLICK" || payload.event === "VISITOR_PRODUCT_VIEW") {
    const lastSent = lastEventCache[eventKey] || 0;
    if (now - lastSent < COOLDOWN_MEDIUM_MS) {
      return;
    }
    lastEventCache[eventKey] = now;
  }

  try {
    await fetch("/api/telemetry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload,
        anonymousSessionId: sessionId,
        isNewSession,
        journey,
        previousPage,
        referrerSource,
        sessionDuration,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (err) {
    // Telemetry errors MUST be silent and never disrupt user interface
    console.debug("[Telemetry] Failed to dispatch event:", err);
  }
}

/**
 * Client-Side Telemetry & Visitor Intelligence Helper
 * Handles anonymous session persistence, anti-spam throttling, page tracking & ecosystem click tracking.
 */

export function getOrCreateAnonymousSessionId(): string {
  if (typeof window === "undefined") return "visitor_server";
  try {
    let session = localStorage.getItem("aix_visitor_session");
    if (!session) {
      const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
      session = `visitor_${rand}`;
      localStorage.setItem("aix_visitor_session", session);
    }
    return session;
  } catch {
    return "visitor_anon";
  }
}

interface TelemetryEventPayload {
  event:
    | "VISITOR_PAGE_VIEW"
    | "VISITOR_SEARCH"
    | "VISITOR_PROGRAM_VIEW"
    | "ECOSYSTEM_CLICK"
    | "AI_HIGH_INTENT"
    | "RESOURCE_DOWNLOAD"
    | "ELIGIBILITY_COMPLETED";
  sourceRoute: string;
  category?: string;
  metadata?: Record<string, unknown>;
}

// In-memory throttling cache to prevent duplicate notifications
const lastEventCache: Record<string, number> = {};
const COOLDOWN_MS = 60000; // 60 seconds per unique route/event key

export async function sendTelemetryEvent(payload: TelemetryEventPayload): Promise<void> {
  if (typeof window === "undefined") return;

  const eventKey = `${payload.event}:${payload.sourceRoute}:${payload.category || ""}`;
  const now = Date.now();

  // Throttle ordinary page views heavily to avoid Telegram spam
  if (payload.event === "VISITOR_PAGE_VIEW") {
    const lastSent = lastEventCache[eventKey] || 0;
    if (now - lastSent < COOLDOWN_MS) {
      return; // Cooldown active, skip duplicate tracking call
    }
    lastEventCache[eventKey] = now;
  }

  const anonymousSessionId = getOrCreateAnonymousSessionId();

  try {
    await fetch("/api/telemetry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload,
        anonymousSessionId,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (err) {
    // Telemetry errors MUST be silent and never disrupt user interface
    console.debug("[Telemetry] Failed to dispatch event:", err);
  }
}

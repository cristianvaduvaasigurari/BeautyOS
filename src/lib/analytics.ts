/**
 * BeautyOS Lightweight Beta Analytics Logger
 * Respects user privacy. No personally identifiable information (PII) is captured.
 */

export type BetaEventName =
  | "onboarding_completed"
  | "product_added"
  | "routine_completed"
  | "checkin_completed"
  | "photo_added"
  | "weekly_review_opened";

export interface BetaAnalyticsLog {
  id: string;
  eventName: BetaEventName;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export const trackBetaEvent = (eventName: BetaEventName, metadata?: Record<string, unknown>) => {
  const timestamp = new Date().toISOString();
  const eventId = `evt_${Math.floor(Math.random() * 1000000)}`;

  const logEntry: BetaAnalyticsLog = {
    id: eventId,
    eventName,
    timestamp,
    metadata,
  };

  // 1. Console auditing for beta debuggers
  if (typeof window !== "undefined") {
    console.groupCollapsed(`[BeautyOS Beta Analytics] Event: ${eventName}`);
    console.log("Timestamp:", timestamp);
    if (metadata) console.log("Metadata:", metadata);
    console.groupEnd();

    // 2. Persistent storage log for beta testers export
    try {
      const existingLogs = JSON.parse(localStorage.getItem("beta_analytics_logs") || "[]");
      existingLogs.push(logEntry);
      
      // Limit to last 200 logs to prevent LocalStorage bloat
      if (existingLogs.length > 200) {
        existingLogs.shift();
      }
      localStorage.setItem("beta_analytics_logs", JSON.stringify(existingLogs));
    } catch (e) {
      console.error("Failed to append beta analytics log:", e);
    }
  }
};

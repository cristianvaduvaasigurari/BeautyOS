/**
 * AiX Health Lightweight Analytics Logger
 * Respects user privacy. No personally identifiable information (PII) is captured.
 */

export type BetaEventName =
  | "onboarding_completed"
  | "product_added"
  | "routine_completed"
  | "checkin_completed"
  | "photo_added"
  | "weekly_review_opened"
  | "skin_checkin_logged"
  | "product_added_to_cabinet"
  | "product_deleted_from_cabinet";

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

  if (typeof window !== "undefined") {
    try {
      const existingLogs = JSON.parse(localStorage.getItem("beta_analytics_logs") || "[]");
      existingLogs.push(logEntry);
      
      if (existingLogs.length > 200) {
        existingLogs.shift();
      }
      localStorage.setItem("beta_analytics_logs", JSON.stringify(existingLogs));
    } catch {
      // Silently fail in production
    }
  }
};
